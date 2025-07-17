import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import { IQuizService } from './types/quiz.contract';
import {
    QuizAccessedToSelect,
    QuizCreateInput,
    QuizWhere,
} from './types/quiz.domain';
import { ForbiddenError } from '@errors';
import { UserRepository } from '@modules/User';
import { InputJsonValue } from '#types';
import { QUIZ_COPY_SELECT } from './constants/quiz.constants';

const _manageFavouriteConnection = (
    userId: string,
    quizId: string,
    action: 'connect' | 'disconnect',
) => {
    return QuizRepository.update(
        { id: quizId },
        {
            favouritedBy: {
                [action]: {
                    id: userId,
                },
            },
        },
    );
};
const _manageAccessConnection = (
    userId: string,
    quizId: string,
    action: 'connect' | 'disconnect',
) => {
    return QuizRepository.update(
        { id: quizId },
        {
            accessedTo: {
                [action]: {
                    userId,
                },
            },
        },
    );
};
export const QuizService: IQuizService = {
    getAllTeacher: async function ({
        select,
        limit,
        offset,
        filters,
        where,
        userId,
    }) {
        const dynamicSelect = {
            ...select,
        };
        const prismaWhere: QuizWhere = { ...where };
        if (filters) {
            const { tags, languages, subject } = filters;
            if (tags) {
                prismaWhere.tags = { some: { name: { in: tags } } };
            }
            if (languages) {
                prismaWhere.languages = { some: { name: { in: languages } } };
            }
            if (subject) {
                prismaWhere.subject = { name: subject };
            }
        }
        if (select) {
            if (select.createdBy) {
                dynamicSelect.createdBy = {
                    select: { user: { select: { avatar: true } } },
                };
            }
            if (select.favouritedByIds) {
                dynamicSelect._count = {
                    select: {
                        favouritedBy: {
                            where: {
                                id: userId,
                            },
                        },
                    },
                };
            }
        }

        const quizzes = await QuizRepository.getAllWithSelect<
            typeof dynamicSelect
        >(
            !isObjectEmpty(dynamicSelect) ? dynamicSelect : undefined,
            limit,
            offset,
            prismaWhere,
        );
        if (select && select.favouritedByIds) {
            const enrichedQuizzes = quizzes.map((quiz) => {
                const { _count, ...restOfQuiz } = quiz;
                const isFavourite = _count.favouritedBy > 0;
                return {
                    ...restOfQuiz,
                    isFavourite,
                };
            });
            return enrichedQuizzes;
        }
        return quizzes;
    },
    getById: async function (id, select) {
        return await QuizRepository.get<typeof select>(
            { id },
            !isObjectEmpty(select) ? select : undefined,
        );
    },
    create: async function (data) {
        const prismaData: QuizCreateInput = { ...data };
        if (data.tagsIds && 'length' in data.tagsIds) {
            const connectTags = data.tagsIds.map((tagId) => ({ id: tagId }));
            prismaData.tags = { connect: connectTags };
            prismaData.tagsIds = undefined;
        }
        if (data.languagesIds && 'length' in data.languagesIds) {
            const connectLanguages = data.languagesIds.map((languageId) => ({
                id: languageId,
            }));
            prismaData.languages = { connect: connectLanguages };
            prismaData.languagesIds = undefined;
        }
        console.log(prismaData);
        return await QuizRepository.create(prismaData);
    },
    delete: async function (id) {
        return await QuizRepository.delete({ id });
    },
    updateFavourite: async function (userId, quizId) {
        return await _manageFavouriteConnection(userId, quizId, 'connect');
    },
    deleteFavourite: async function (userId, quizId) {
        return await _manageFavouriteConnection(userId, quizId, 'disconnect');
    },
    getAccessesToQuiz: async function (userId, quizId) {
        const accesses = await QuizRepository.get<QuizAccessedToSelect>(
            { id: quizId },
            {
                accessedTo: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
                createdById: true,
            },
        );
        if (userId != accesses.createdById) {
            throw new ForbiddenError(
                'You cannot get access of a quiz that you did not create',
            );
        }
        return accesses;
    },
    updateAccess: async function (ownerId, quizId, username) {
        const quiz = await QuizRepository.get<{
            createdBy: { select: { userId: true } };
        }>(
            { id: quizId },
            {
                createdBy: { select: { userId: true } },
            },
        );
        if (quiz.createdBy.userId !== ownerId) {
            throw new ForbiddenError(
                'You cannot get access of a quiz that you did not create',
            );
        }
        const userToGiveAccess = await UserRepository.get(
            { username },
            { id: true },
        );
        return await _manageAccessConnection(
            userToGiveAccess.id,
            quizId,
            'connect',
        );
    },
    deleteAccess: async function (userId, quizId, userToGiveAccessId) {
        const quiz = await QuizRepository.get<{ createdById: true }>(
            {
                id: quizId,
                accessedTo: { some: { userId: userToGiveAccessId } },
            },
            { createdById: true },
        );
        if (quiz.createdById != userId) {
            throw new ForbiddenError(
                'You cannot get access of a quiz that you did not create',
            );
        }
        return await _manageAccessConnection(
            userToGiveAccessId,
            quizId,
            'disconnect',
        );
    },
    copyQuiz: async function (userId, quizId) {
        const { teacherProfile } = await UserRepository.get(
            { id: userId },
            { teacherProfile: { select: { id: true } } },
        );
        if (!teacherProfile) {
            throw new ForbiddenError(
                'You cannot copy quiz without TeacherProfile',
            );
        }
        const quizToCopy = await QuizRepository.get<typeof QUIZ_COPY_SELECT>(
            { id: quizId },
            QUIZ_COPY_SELECT,
        );
        const questionsToCopy = quizToCopy.questions
            .filter((q) => {
                if (q.data) return true;
            })
            .map((q) => ({ type: q.type, data: q.data as InputJsonValue }));
        const dataToCreateQuiz: QuizCreateInput = {
            status: 'DRAFT',
            title: `Copied ${quizToCopy.title}`,
            subjectId: quizToCopy.subjectId,
            tagsIds: quizToCopy.tagsIds,
            languagesIds: quizToCopy.languagesIds,
            shuffleAnswers: quizToCopy.shuffleAnswers,
            shuffleQuestions: quizToCopy.shuffleQuestions,
            visibility: quizToCopy.visibility,
            coverImage: quizToCopy.coverImage,
            questions:
                questionsToCopy.length > 0
                    ? { createMany: { data: questionsToCopy } }
                    : undefined,
            createdById: teacherProfile.id,
        };
        return await this.create(dataToCreateQuiz);
    },
};

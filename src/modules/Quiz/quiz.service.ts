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
        }
        if (data.languagesIds && 'length' in data.languagesIds) {
            const connectTags = data.languagesIds.map((languageId) => ({
                id: languageId,
            }));
            prismaData.tags = { connect: connectTags };
        }

        return await QuizRepository.create(data);
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
        console.log(quiz, ownerId);
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

};

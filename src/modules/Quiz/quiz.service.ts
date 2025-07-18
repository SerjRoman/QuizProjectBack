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
import { QUIZ_COPY_SELECT } from './constants/quiz.constants';
import { QuizBuilder } from './quiz.builder';
import { PaginationData } from '#types';

export const QuizService: IQuizService = {
    getAllTeacher: async function ({
        select,
        filters,
        where,
        userId,
        pagination,
    }) {
        let dynamicSelect = {
            ...select,
        };
        const prismaWhere: QuizWhere = QuizBuilder.buildWhereFromFilters(
            where,
            filters,
        );
        if (select.createdBy) {
            dynamicSelect = QuizBuilder.buildSelectWithCreatedBy(dynamicSelect);
        }
        if (select.favouritedByIds) {
            dynamicSelect = QuizBuilder.buildSelectWithFavourite(
                dynamicSelect,
                userId,
            );
        }
        let quizzes = [];
        let meta: PaginationData | undefined;
        if (pagination) {
            [quizzes, meta] = await QuizRepository.getAllWithPagination<
                typeof dynamicSelect
            >(
                pagination,
                !isObjectEmpty(dynamicSelect) ? dynamicSelect : undefined,
                prismaWhere,
            );
        } else {
            quizzes = await QuizRepository.getAllWithSelect<
                typeof dynamicSelect
            >(
                !isObjectEmpty(dynamicSelect) ? dynamicSelect : undefined,
                prismaWhere,
            );
        }

        if (select.favouritedByIds) {
            quizzes = QuizBuilder.enrichQuizzesWithFavouriteStatus(quizzes);
        }
        return { data: quizzes, meta };
    },
    getById: async function (id, select) {
        return await QuizRepository.get<typeof select>(
            { id },
            !isObjectEmpty(select) ? select : undefined,
        );
    },
    create: async function (data) {
        let prismaData: QuizCreateInput = { ...data };
        prismaData = QuizBuilder.buildCreateDataWithTags(data, prismaData);
        prismaData = QuizBuilder.buildCreateDataWithLanguages(data, prismaData);

        return await QuizRepository.create(prismaData);
    },
    delete: async function (id) {
        return await QuizRepository.delete({ id });
    },
    updateFavourite: async function (userId, quizId) {
        return await QuizBuilder.manageFavouriteConnection(
            userId,
            quizId,
            'connect',
        );
    },
    deleteFavourite: async function (userId, quizId) {
        return await QuizBuilder.manageFavouriteConnection(
            userId,
            quizId,
            'disconnect',
        );
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
        return await QuizBuilder.manageAccessConnection(
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
        return await QuizBuilder.manageAccessConnection(
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
        const dataToCreateQuiz: QuizCreateInput = QuizBuilder.buildQuizCopyData(
            quizToCopy,
            teacherProfile.id,
        );
        return await this.create(dataToCreateQuiz);
    },
};

import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import { IQuizService } from './types';
import { QuizOrderBy, QuizUncheckedCreateInput, QuizWhere } from './types';
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
        sort,
    }) {
        let dynamicSelect = {
            ...select,
        };
        let orderBy: QuizOrderBy | undefined;
        const prismaWhere: QuizWhere = QuizBuilder.buildWhereFromFilters(
            where,
            filters,
        );
        if (sort) {
            orderBy = QuizBuilder.buildOrderByFromSort(sort);
        }
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
                orderBy,
            );
        } else {
            quizzes = await QuizRepository.getAllWithSelect<
                typeof dynamicSelect
            >(
                !isObjectEmpty(dynamicSelect) ? dynamicSelect : undefined,
                prismaWhere,
                orderBy,
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
        let prismaData: QuizUncheckedCreateInput = { ...data };
        prismaData = QuizBuilder.buildCreateDataWithTags(data, prismaData);
        prismaData = QuizBuilder.buildCreateDataWithLanguages(data, prismaData);
        prismaData.accesses = {
            create: {
                profile: {
                    connect: {
                        id: data.createdById,
                    },
                },
                accessType: 'OWNER',
            },
        };
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
    // !FIX - use teacherId instead of userId
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
        const dataToCreateQuiz: QuizUncheckedCreateInput =
            QuizBuilder.buildQuizCopyData(quizToCopy, teacherProfile.id);
        return await this.create(dataToCreateQuiz);
    },
};

import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import { QuizServiceContract } from './types';
import { QuizOrderBy, QuizUncheckedCreateInput, QuizWhere } from './types';
import { ForbiddenError, NotFoundError } from '@errors';
import { UserRepository } from '@modules/User';
import { QUIZ_COPY_SELECT } from './constants/quiz.constants';
import { QuizBuilder } from './quiz.builder';
import { PaginationData } from '#types';

export const QuizService: QuizServiceContract = {
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
        if (select.favouritedBy) {
            dynamicSelect = QuizBuilder.buildSelectWithFavourite(
                dynamicSelect,
                userId,
            );
        }
        let quizzes = [];
        let meta: PaginationData | undefined;
        if (pagination) {
            [quizzes, meta] = await QuizRepository.getAll<typeof dynamicSelect>(
                {
                    select: !isObjectEmpty(dynamicSelect)
                        ? dynamicSelect
                        : undefined,
                    where: prismaWhere,
                    orderBy,
                    pagination,
                },
            );
        } else {
            quizzes = await QuizRepository.getAll<typeof dynamicSelect>({
                select: !isObjectEmpty(dynamicSelect)
                    ? dynamicSelect
                    : undefined,
                where: prismaWhere,
            });
        }

        if (select.favouritedBy) {
            quizzes = QuizBuilder.enrichQuizzesWithFavouriteStatus(quizzes);
        }
        if (pagination && meta) {
            return { data: quizzes, meta };
        } else {
            return { data: quizzes };
        }
    },
    getById: async function ({ id, select }) {
        return await QuizRepository.get({
            where: { id },
            select: !isObjectEmpty(select) ? select : undefined,
        });
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
    async delete({ id, teacherId }) {
        const quiz = await QuizRepository.get({
            where: { id },
            select: { ownedById: true },
        });
        if (quiz.ownedById !== teacherId) {
            throw new ForbiddenError('You can only delete your own quizzes.');
        }
        return QuizRepository.delete({ id });
    },
    updateFavourite: async function ({ userId, quizId }) {
        return await QuizBuilder.manageFavouriteConnection(
            userId,
            quizId,
            'connect',
        );
    },
    deleteFavourite: async function ({ userId, quizId }) {
        return await QuizBuilder.manageFavouriteConnection(
            userId,
            quizId,
            'disconnect',
        );
    },
    async copyQuiz({ userId, quizId }) {
        const { teacherProfile } = await UserRepository.get({
            where: { id: userId },
            select: { teacherProfile: { select: { id: true } } },
        });

        if (!teacherProfile) {
            throw new ForbiddenError(
                'Cannot copy quiz without a TeacherProfile.',
            );
        }

        const quizToCopy = await QuizRepository.get({
            where: { id: quizId },
            select: QUIZ_COPY_SELECT,
        });

        if (!quizToCopy) {
            throw new NotFoundError('Quiz to copy not found.');
        }

        const dataForNewQuiz = QuizBuilder.buildQuizCopyData(
            quizToCopy,
            teacherProfile.id,
        );

        return this.create(dataForNewQuiz);
    },
};

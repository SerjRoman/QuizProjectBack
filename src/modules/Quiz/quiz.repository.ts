import { PrismaKnownError } from '#types';
import { ConflictError, NotFoundError, PrismaErrors } from '@errors';
import { PrismaClient } from '@prisma';
import { IQuizRepository } from './types/quiz.contract';

export const QuizRepository: IQuizRepository = {
    get: async function (where, select) {
        try {
            return await PrismaClient.quiz.findUniqueOrThrow({
                where,
                select,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('Quiz');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    } as IQuizRepository['get'],
    create: async function (data) {
        try {
            return await PrismaClient.quiz.create({
                data,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.CONFLICT:
                        throw new ConflictError();
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
    delete: async function (where) {
        try {
            return await PrismaClient.quiz.delete({
                where,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('Quiz');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
    getAllWithSelect: async function (select, where, orderBy) {
        try {
            return await PrismaClient.quiz.findMany({
                where,
                select,
                orderBy,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('Quiz');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    } as IQuizRepository['getAllWithSelect'],
    getAllWithPagination: async function (pagination, select, where, orderBy) {
        try {
            const result = await PrismaClient.quiz
                .paginate({
                    select,
                    where,
                    orderBy,
                })
                .withPages({
                    page: pagination.page,
                    limit: pagination.perPage,
                });
            return [result[0], result[1]];
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('Quiz');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    } as IQuizRepository['getAllWithPagination'],
    update: async function (where, data) {
        try {
            return await PrismaClient.quiz.update({
                where,
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('Quiz');
                    case PrismaErrors.CONFLICT:
                        throw new ConflictError();
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
};

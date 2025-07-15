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
    },
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
    getAllWithSelect: async function (select, limit, offset, where) {
        try {
            return await PrismaClient.quiz.findMany({
                skip: offset,
                take: limit,
                where,
                select,
                orderBy: {
                    createdAt: 'desc',
                },
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

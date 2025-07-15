import { PrismaKnownError } from '#types';
import { ConflictError, NotFoundError, PrismaErrors } from '@errors';
import type { IQuizRepository, QuizSelect } from './quiz.types';
import { PrismaClient } from '@prisma';

export const QuizRepository: IQuizRepository = {
    getById: async function <S extends QuizSelect>(id: string, select?: S) {
        try {
            return await PrismaClient.quiz.findUniqueOrThrow({
                where: { id: id },
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
    getAll: async function (include, omit, limit, offset, where) {
        try {
            return await PrismaClient.quiz.findMany({
                include,
                omit,
                skip: offset,
                take: limit,
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
    delete: async function (id) {
        try {
            return await PrismaClient.quiz.delete({
                where: { id },
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
};

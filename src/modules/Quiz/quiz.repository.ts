import { PrismaKnownError } from '#types/prisma';
import {
    ConflictError,
    NotFoundError,
    PrismaErrors,
} from '@src/errors/app-errors';
import client from '../../prisma/client';
import type { IQuizRepository } from './quiz.types';

export const QuizRepository: IQuizRepository = {
    getById: async function (id, include, omit) {
        try {
            const quiz = await client.quiz.findUniqueOrThrow({
                where: { id: id },
                include: include,
                omit: omit,
            });
            return quiz;
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
            return await client.quiz.findMany({
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
            return await client.quiz.create({
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
            return await client.quiz.delete({
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
            return await client.quiz.findMany({
                skip: offset,
                take: limit,
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
};

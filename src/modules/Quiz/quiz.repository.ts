import { PrismaKnownError } from '#types/prisma';
import { NotFoundError, PrismaErrors } from '@src/errors/app-errors';
import client from '../../prisma/client';
import type { QuizRepository as QRType } from './quiz.types';

export const QuizRepository: QRType = {
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
    getAll: async function (include, omit) {
        try {
            return await client.quiz.findMany({
                include,
                omit,
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
                        throw new NotFoundError('Quiz');
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
                    case PrismaErrors.CONFLICT:
                        throw new NotFoundError('Quiz');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
};

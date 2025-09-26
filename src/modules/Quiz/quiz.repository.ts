import { PaginationParams } from '#types';
import {
    QuizFindManyArgs,
    QuizFindUniqueArgs,
    QuizRepositoryContract,
} from './types';
import { ConflictError, NotFoundError, PrismaErrors } from '@errors';
import { PrismaClient } from '@prisma';
import { handlePrismaError } from '@utils';

export const QuizRepository: QuizRepositoryContract = {
    async create(data) {
        return handlePrismaError(PrismaClient.quiz.create({ data }), {
            [PrismaErrors.CONFLICT]: new ConflictError(),
        });
    },

    async delete(where) {
        return handlePrismaError(PrismaClient.quiz.delete({ where }), {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('Quiz'),
        });
    },

    async update(where, data) {
        return handlePrismaError(
            PrismaClient.quiz.update({
                where,
                data: {
                    ...data,
                    updatedAt: new Date(),
                },
            }),
            {
                [PrismaErrors.NOT_FOUND]: new NotFoundError('Quiz'),
                [PrismaErrors.CONFLICT]: new ConflictError(),
            },
        );
    },

    get: async function (params: QuizFindUniqueArgs) {
        return handlePrismaError(PrismaClient.quiz.findUniqueOrThrow(params), {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('Quiz'),
        });
    } as QuizRepositoryContract['get'],

    getAll: async function (
        params: QuizFindManyArgs & { pagination: PaginationParams },
    ) {
        const {
            pagination: { perPage, page },
            ...prismaArgs
        } = params || {};
        if (page && perPage) {
            const result = await PrismaClient.quiz
                .paginate(prismaArgs)
                .withPages({
                    page: page,
                    limit: perPage,
                });

            return result;
        }

        return PrismaClient.quiz.findMany(prismaArgs);
    } as QuizRepositoryContract['getAll'],
};

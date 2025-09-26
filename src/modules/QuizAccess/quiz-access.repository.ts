import { PrismaClient } from '@prisma';
import {
    QuizAccessFindManyArgs,
    QuizAccessFindUniqueOrThrowArgs,
    QuizAccessRepositoryContract,
} from './types';
import { ConflictError, NotFoundError, PrismaErrors } from '@errors';
import { handlePrismaError } from '@utils';

export const QuizAccessRepository: QuizAccessRepositoryContract = {
    async create(data) {
        return handlePrismaError(PrismaClient.quizAccess.create({ data }), {
            [PrismaErrors.CONFLICT]: new ConflictError(),
        });
    },
    async delete(where) {
        return handlePrismaError(PrismaClient.quizAccess.delete({ where }), {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('QuizAccess'),
        });
    },
    async update(where, data) {
        return handlePrismaError(
            PrismaClient.quizAccess.update({ where, data }),
            {
                [PrismaErrors.NOT_FOUND]: new NotFoundError('QuizAccess'),
                [PrismaErrors.CONFLICT]: new ConflictError(),
            },
        );
    },
    getAll: function (params: QuizAccessFindManyArgs) {
        return PrismaClient.quizAccess.findMany(params);
    } as QuizAccessRepositoryContract['getAll'],
    get: async function (params: QuizAccessFindUniqueOrThrowArgs) {
        return handlePrismaError(
            PrismaClient.quizAccess.findUniqueOrThrow(params),
            {
                [PrismaErrors.NOT_FOUND]: new NotFoundError('QuizAccess'),
            },
        );
    } as QuizAccessRepositoryContract['get'],
    
};

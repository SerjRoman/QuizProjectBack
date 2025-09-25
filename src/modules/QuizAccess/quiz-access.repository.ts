import { PrismaClient } from '@prisma';
import {
    QuizAccessInclude,
    QuizAccessRepositoryContract,
    QuizAccessSelect,
    QuizAccessUniqueWhere,
    QuizAccessWhere,
} from './types';
import { PrismaKnownError } from '#types';
import { ConflictError, NotFoundError, PrismaErrors } from '@errors';

export const QuizAccessRepository: QuizAccessRepositoryContract = {
    async create(data) {
        try {
            return await PrismaClient.quizAccess.create({
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
    delete(where) {
        try {
            return PrismaClient.quizAccess.delete({ where });
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
    update(where, data) {
        try {
            return PrismaClient.quizAccess.update({ where, data });
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
    getAll: async function (
        params:
            | QuizAccessWhere
            | {
                  where: QuizAccessWhere;
                  select?: QuizAccessSelect;
                  include?: QuizAccessInclude;
              },
    ) {
        let where: QuizAccessWhere;
        let select: QuizAccessSelect | undefined;
        let include: QuizAccessInclude | undefined;

        if ('where' in params) {
            where = params.where;
            select = params.select;
            include = params.include;
        } else {
            where = params;
        }

        return await PrismaClient.quizAccess.findMany({
            where,
            select,
            include,
        });
    } as QuizAccessRepositoryContract['getAll'],
    get: async function (
        params:
            | QuizAccessUniqueWhere
            | {
                  where: QuizAccessUniqueWhere;
                  select?: QuizAccessSelect;
                  include?: QuizAccessInclude;
              },
    ) {
        let where: QuizAccessUniqueWhere;
        let select: QuizAccessSelect | undefined;
        let include: QuizAccessInclude | undefined;

        if ('where' in params) {
            where = params.where;
            select = params.select;
            include = params.include;
        } else {
            where = params;
        }

        try {
            return await PrismaClient.quizAccess.findUniqueOrThrow({
                where,
                select,
                include,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('QuizAccess');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    } as QuizAccessRepositoryContract['get'],
};

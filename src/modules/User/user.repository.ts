import { ConflictError, NotFoundError, PrismaErrors } from '@errors';
import { handlePrismaError } from '@utils';
import { PrismaClient } from '@prisma';
import { UserFindUniqueArgs, UserRepositoryContract } from './types';

export const UserRepository: UserRepositoryContract = {
    async create(data) {
        return handlePrismaError(PrismaClient.user.create({ data }), {
            [PrismaErrors.CONFLICT]: new ConflictError('User already exists'),
        });
    },

    async update(where, data) {
        const userPromise = PrismaClient.user.update({
            where,
            data,
        });
        return handlePrismaError(userPromise, {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('User'),
        });
    },

    async delete(where) {
        const userPromise = PrismaClient.user.delete({
            where,
        });
        return handlePrismaError(userPromise, {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('User'),
        });
    },

    get: async function (params: UserFindUniqueArgs) {
        const finalParams = { ...params };

        const userPromise = PrismaClient.user.findUniqueOrThrow(finalParams);

        return handlePrismaError(userPromise, {
            [PrismaErrors.NOT_FOUND]: new NotFoundError('User'),
        });
    } as UserRepositoryContract['get'],
};

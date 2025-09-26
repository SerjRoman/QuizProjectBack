import { handlePrismaError } from '@utils';
import { AuthRepositoryContract } from './types';
import { PrismaClient } from '@prisma';
import { NotFoundError, PrismaErrors } from '@errors';

export const AuthRepository: AuthRepositoryContract = {
    getUserWithPassword(where) {
        return handlePrismaError(
            PrismaClient.user.findUnique({
                where,
                omit: {
                    password: false,
                },
            }),
            { [PrismaErrors.NOT_FOUND]: new NotFoundError('User') },
        );
    },
};

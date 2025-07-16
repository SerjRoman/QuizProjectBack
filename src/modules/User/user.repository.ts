import { PrismaClient } from '@prisma';
import { PrismaKnownError } from '#types';
import { NotFoundError, PrismaErrors } from '@errors';
import { IUserRepository } from './types/user.contract';

export const UserRepository: IUserRepository = {
    get: async function (where, select) {
        try {
            if (select) {
                return await PrismaClient.user.findUniqueOrThrow({
                    where,
                    select,
                });
            }
            return await PrismaClient.user.findUniqueOrThrow({
                where,
                omit: { password: true },
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('User');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    } as IUserRepository['get'],
    create: async function (data) {
        try {
            return await PrismaClient.user.create({
                data,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.CONFLICT:
                        throw new NotFoundError('User');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
    update: async function (where, data) {
        try {
            return await PrismaClient.user.update({
                where,
                data,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('User');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
    delete: async function (where) {
        try {
            return await PrismaClient.user.delete({
                where,
            });
        } catch (error) {
            if (error instanceof PrismaKnownError) {
                switch (error.code) {
                    case PrismaErrors.NOT_FOUND:
                        throw new NotFoundError('User');
                    default:
                        throw error;
                }
            }
            throw error;
        }
    },
};

import { IUserRepository } from './user.types';
import { PrismaClient } from '@prisma';
import { PrismaKnownError } from '#types';
import { NotFoundError, PrismaErrors } from '@errors';

export const UserRepository: IUserRepository = {
    getById: async function (id, select) {
        try {
            const user = await PrismaClient.user.findUniqueOrThrow({
                where: { id: id },
                select,
            });
            return user;
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
    update: async function (id, data) {
        try {
            return await PrismaClient.user.update({
                where: { id: id },
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
    delete: async function (id) {
        try {
            return await PrismaClient.user.delete({
                where: { id: id },
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
    getByEmail: async function (email, include, omit) {
        try {
            const user = await PrismaClient.user.findUniqueOrThrow({
                where: { email: email },
                include: include,
                omit: omit,
            });
            return user;
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

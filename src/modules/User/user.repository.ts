import { NotFoundError, PrismaErrors } from '@src/errors/app-errors';
import client from '@src/prisma/client';
import { PrismaKnownError } from '@src/types/prisma';
import { IUserRepository } from './user.types';

export const UserRepository: IUserRepository = {
    getById: async function (id, include, omit) {
        try {
            const user = await client.user.findUniqueOrThrow({
                where: { id: id },
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
    create: async function (data) {
        try {
            return await client.user.create({
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
            return await client.user.update({
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
            return await client.user.delete({
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
            const user = await client.user.findUniqueOrThrow({
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

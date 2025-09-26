import { hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { UserServiceContract } from './types';
import { ConflictError } from '@errors';
import { isObjectEmpty } from '@utils';

export const UserService: UserServiceContract = {
    create: async function (data) {
        const existingUser = await UserRepository.get({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ConflictError('User already exists with this ID');
        }
        const hashedPassword = await hash(data.password, 10);
        data.password = hashedPassword;
        return await UserRepository.create(data);
    },

    getById: async function ({ id, select }) {
        return await UserRepository.get<typeof select>({
            where: { id },
            select: !isObjectEmpty(select) ? select : undefined,
        });
    },
    update: async function ({ id, data }) {
        return await UserRepository.update({ id }, data);
    },
    delete: async function (id) {
        return await UserRepository.delete(id);
    },
};

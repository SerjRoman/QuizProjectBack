import { hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { IUserService } from './user.types';
import { sign, verify } from 'jsonwebtoken';
import { env } from '@src/config';
import { StringValue } from 'ms';
import { ConflictError } from '@src/errors/app-errors';

export const UserService: IUserService = {
    repo: UserRepository,
    create: async function (data) {
        const existingUser = await this.repo.getByEmail(data.email, {}, {});
        if (existingUser) {
            throw new ConflictError('User already exists with this ID');
        }
        const hashedPassword = await this.hashPassword(data.password);
        data.password = hashedPassword;
        const user = await this.repo.create(data);
        const token = this.generateToken(user.id);
        const refreshToken = this.generateRefreshToken(user.id);
        return { token, refreshToken };
    },

    getById: async function (id, include = {}, omit = {}) {
        return await this.repo.getById(id, include, omit);
    },
    update: async function (id, data) {
        return await this.repo.update(id, data);
    },
    delete: async function (id) {
        return await this.repo.delete(id);
    },
    hashPassword: async function (password) {
        return await hash(password, 10);
    },
    generateToken: function (userId) {
        return sign({ userId }, env.SECRET_KEY, {
            expiresIn: env.JWT_EXPIRES_IN as StringValue,
        });
    },
    generateRefreshToken: function (userId) {
        return sign({ userId }, env.REFRESH_SECRET_KEY, {
            expiresIn: env.REFRESH_JWT_EXPIRES_IN as StringValue,
        });
    },
    refresh: function (refreshToken) {
        const userId = this.verifyRefreshToken(refreshToken);
        return this.generateToken(userId);
    },
    verifyRefreshToken: function (refreshToken) {
        try {
            const decoded = verify(refreshToken, env.REFRESH_SECRET_KEY);
            return (decoded as { userId: string }).userId;
        } catch (error) {
            console.error('Refresh token verification failed:', error);
            throw new ConflictError('Invalid refresh token');
        }
    },
};

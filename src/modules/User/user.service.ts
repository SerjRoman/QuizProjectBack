import { compare, hash } from 'bcryptjs';
import { UserRepository } from './user.repository';
import { IUserService } from './user.types';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { env } from '@src/config';
import { StringValue } from 'ms';
import { AuthenticationError, ConflictError, NotFoundError } from '@src/errors';

export const UserService: IUserService = {
    repo: UserRepository,
    register: async function (data) {
        try {
            await this.repo.getByEmail(data.email, {}, {});
            throw new ConflictError('User already exists with this ID');
        } catch (error) {
            if (!(error instanceof NotFoundError)) {
                throw error;
            }
            const hashedPassword = await this.hashPassword(data.password);
            data.password = hashedPassword;
            const user = await this.repo.create(data);
            const token = this.generateToken(user.id);
            const refreshToken = this.generateRefreshToken(user.id);
            return { token, refreshToken };
        }
    },
    login: async function (data) {
        const user = await this.repo.getByEmail<object, object>(
            data.email,
            {},
            {},
        );
        const isMatch = await this.comparePasswords(
            user.password,
            data.password,
        );
        if (!isMatch) {
            throw new AuthenticationError('Wrong credentials', 'credentials');
        }
        const token = this.generateToken(user.id);
        const refreshToken = this.generateRefreshToken(user.id);
        return { token, refreshToken };
    },
    create: async function (data) {
        const existingUser = await this.repo.getByEmail(data.email, {}, {});
        if (existingUser) {
            throw new ConflictError('User already exists with this ID');
        }
        const hashedPassword = await this.hashPassword(data.password);
        data.password = hashedPassword;
        return await this.repo.create(data);
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
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError('token expired', 'token_expired');
            }
            throw new AuthenticationError(
                'Invalid refresh token',
                'refresh_token_verification',
            );
        }
    },
    verifyToken: function (token) {
        try {
            const decoded = verify(token, env.SECRET_KEY);
            return (decoded as { userId: string }).userId;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError('token expired', 'token_expired');
            }
            throw new AuthenticationError(
                'Invalid token',
                'token_verification',
            );
        }
    },
    comparePasswords: async function (hashedPassword, password) {
        return await compare(password, hashedPassword);
    },
};

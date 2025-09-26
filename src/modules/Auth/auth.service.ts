import { AuthenticationError, ConflictError } from '@errors';
import { UserCreateInput } from '@modules/User/types';
import { AuthServiceContract } from './types';
import { UserRepository } from '@modules/User';
import { AuthRepository } from './auth.repository';
import {
    comparePasswords,
    generateRefreshToken,
    generateToken,
    hashPassword,
    verifyRefreshToken,
} from './utils';

export const AuthService: AuthServiceContract = {
    authRepo: AuthRepository,
    userRepo: UserRepository,
    async register(data) {
        const existingUser = await UserRepository.get({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new ConflictError('User with this email already exists');
        }

        const hashedPassword = await hashPassword(data.password);

        const prismaData: UserCreateInput = {
            ...data,
            password: hashedPassword,
            [data.role === 'TEACHER' ? 'teacherProfile' : 'studentProfile']: {
                create: {},
            },
        };
        const user = await UserRepository.create(prismaData);

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return { token, refreshToken };
    },

    async login({ email, password }) {
        const user = await this.authRepo.getUserWithPassword({ email });
        if (!user || !user.password) {
            throw new AuthenticationError('Invalid credentials');
        }

        const isMatch = await comparePasswords(user.password, password);
        if (!isMatch) {
            throw new AuthenticationError('Invalid credentials');
        }

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        return { token, refreshToken };
    },

    async refresh({ refreshToken }) {
        const userId = verifyRefreshToken(refreshToken);
        const token = generateToken(userId);
        return { token };
    },
    me({ userId }) {
        return this.userRepo.get({
            where: {
                id: userId,
            },
            select: {
                firstName: true,
                lastName: true,
                id: true,
                email: true,
                username: true,
                role: true,
                avatar: true,
                createdAt: true,
            },
        });
    },
};

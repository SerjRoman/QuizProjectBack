import { Request, Response, NextFunction } from 'express';
import {
    User,
    UserCreateInput,
    UserLoginPayload,
    UserSelect,
    UserUpdateInput,
    UserWhereUnique,
    UserWithArgs,
    UserWithoutPassword,
    UserWithSelect,
} from './user.domain';
import { InferType } from 'yup';
import { UserSchema } from '../user.schema';
import { AuthRequest, AuthResponse } from '#types';

export interface IUserController {
    create: (
        req: Request<
            object,
            User,
            InferType<typeof UserSchema.create>['body'],
            object
        >,
        res: Response<User>,
        next: NextFunction,
    ) => void;
    getById: (
        req: AuthRequest<
            { id: string },
            void,
            object,
            InferType<typeof UserSchema.getById>['query']
        >,
        res: Response<UserWithoutPassword | UserWithSelect | null>,
        next: NextFunction,
    ) => void;
    update: (
        req: AuthRequest<
            { id: string },
            UserUpdateInput,
            InferType<typeof UserSchema.update>['body'],
            object
        >,
        res: Response<User>,
        next: NextFunction,
    ) => void;
    delete: (
        req: AuthRequest<{ id: string }, void, object, object>,
        res: Response<User>,
        next: NextFunction,
    ) => void;
    me: (
        req: AuthRequest<
            object,
            UserWithArgs | null,
            object,
            InferType<typeof UserSchema.getById>['query']
        >,
        res: AuthResponse<UserWithSelect | Omit<User, 'password'> | null>,
        next: NextFunction,
    ) => void;
    refresh: (
        req: Request<
            object,
            { token: string },
            InferType<typeof UserSchema.refresh>['body'],
            object
        >,
        res: Response<{ token: string }>,
        next: NextFunction,
    ) => void;
    logout: (req: AuthRequest, res: AuthResponse, next: NextFunction) => void;
    register: (
        req: Request<
            object,
            { token: string; refreshToken: string },
            InferType<typeof UserSchema.create>['body'],
            object
        >,
        res: Response<{ token: string; refreshToken: string }>,
        next: NextFunction,
    ) => void;
    login: (
        req: Request<
            object,
            User,
            InferType<typeof UserSchema.login>['body'],
            object
        >,
        res: Response<{ token: string; refreshToken: string }>,
        next: NextFunction,
    ) => void;
}

export interface IUserService {
    repo: IUserRepository;
    create: (data: UserCreateInput) => Promise<User>;
    register: (
        data: UserCreateInput,
    ) => Promise<{ token: string; refreshToken: string }>;
    login: (
        data: UserLoginPayload,
    ) => Promise<{ token: string; refreshToken: string }>;
    getById: <S extends UserSelect>(
        id: string,
        select: UserSelect,
    ) => Promise<UserWithoutPassword | UserWithSelect<S>>;
    update: (id: string, data: UserUpdateInput) => Promise<User>;
    delete: (id: string) => Promise<User>;
    hashPassword: (password: string) => Promise<string>;
    comparePasswords: (
        hashedPassword: string,
        password: string,
    ) => Promise<boolean>;
    generateToken: (userId: string) => string;
    generateRefreshToken: (userId: string) => string;
    verifyRefreshToken: (refreshToken: string) => string;
    verifyToken: (token: string) => string;
    refresh: (refreshToken: string) => string;
}

export interface IUserRepository {
    create: (data: UserCreateInput) => Promise<User>;
    get: {
        (where: UserWhereUnique): Promise<UserWithoutPassword>;
        <S extends UserSelect>(
            where: UserWhereUnique,
            select?: S,
        ): Promise<UserWithSelect<S>>;
    };
    update: (where: UserWhereUnique, data: UserUpdateInput) => Promise<User>;
    delete: (where: UserWhereUnique) => Promise<User>;
}

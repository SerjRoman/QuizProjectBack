import { $Enums, Prisma, User as PrismaUser } from '#prisma/prisma/';
import { Request, Response, NextFunction } from 'express';
import { InferType } from 'yup';
import { UserSchema } from './user.schema';
import { AuthRequest, AuthResponse } from '@src/types/express';

export type User = PrismaUser;

export type UserWithArgs<
    I extends UserInclude = object,
    O extends UserOmit = object,
> = Prisma.UserGetPayload<{ include: I; omit: O }>;

export type UserRolesEnum = $Enums.Role
export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUncheckedUpdateInput;
export type UserInclude = Prisma.UserInclude;
export type UserOmit = Prisma.UserOmit;
export type UserLoginPayload = Pick<User, 'email' | 'password'>;

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
        res: Response<UserWithArgs | null>,
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
        res: AuthResponse<UserWithArgs | null>,
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
    getById: (
        id: string,
        include: UserInclude,
        omit: UserOmit,
    ) => Promise<User>;
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
    getById: <I extends UserInclude, O extends UserOmit>(
        id: string,
        include: I,
        omit: O,
    ) => Promise<UserWithArgs<I, O>>;
    update: (id: string, data: UserUpdateInput) => Promise<User>;
    delete: (id: string) => Promise<User>;
    getByEmail: <I extends UserInclude = object, O extends UserOmit = object>(
        email: string,
        include: I,
        omit: O,
    ) => Promise<UserWithArgs<I, O>>;
}

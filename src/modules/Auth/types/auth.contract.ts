import { User, UserWhereUnique, UserRepositoryContract } from '@modules/User';
import { RegisterDto, LoginDto, RefreshDto, MeDto } from './auth.dto';
import { AuthRequest, AuthResponse } from '#types';
import { InferType } from 'yup';
import { AuthSchema } from '../auth.schema';
import { AuthenticatedUserResponse } from './auth.domain';

export interface AuthControllerContract {
    me: (
        req: AuthRequest<object, AuthenticatedUserResponse | null>,
        res: AuthResponse<AuthenticatedUserResponse | null>,
    ) => void;
    refresh: (
        req: AuthRequest<
            object,
            { token: string },
            InferType<typeof AuthSchema.refresh>['body']
        >,
        res: AuthResponse<{ token: string }>,
    ) => void;
    logout: (req: AuthRequest, res: AuthResponse) => void;
    register: (
        req: AuthRequest<
            object,
            { token: string; refreshToken: string },
            InferType<typeof AuthSchema.register>['body']
        >,
        res: AuthResponse<{ token: string; refreshToken: string }>,
    ) => void;
    login: (
        req: AuthRequest<
            object,
            { token: string; refreshToken: string },
            InferType<typeof AuthSchema.login>['body']
        >,
        res: AuthResponse<{ token: string; refreshToken: string }>,
    ) => void;
}

export interface AuthServiceContract {
    authRepo: AuthRepositoryContract;
    userRepo: UserRepositoryContract;
    register: (
        dto: RegisterDto,
    ) => Promise<{ token: string; refreshToken: string }>;
    login: (dto: LoginDto) => Promise<{ token: string; refreshToken: string }>;
    refresh: (dto: RefreshDto) => Promise<{ token: string }>;
    me: (dto: MeDto) => Promise<AuthenticatedUserResponse>
}

export interface AuthRepositoryContract {
    getUserWithPassword: (where: UserWhereUnique) => Promise<User | null>;
}

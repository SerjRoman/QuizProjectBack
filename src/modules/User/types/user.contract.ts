import {
    UserCreateInput,
    UserInclude,
    UserSelect,
    UserUpdateInput,
    UserWhereUnique,
    UserWithInclude,
    UserWithoutPassword,
    UserWithSelect,
} from './user.domain';
import { InferType } from 'yup';
import { UserSchema } from '../user.schema';
import { AuthRequest, AuthResponse } from '#types';
import {
    GetUserByIdDto,
    CreateUserDto,
    UpdateUserDto,
    DeleteUserDto,
} from './user.dto';

export interface UserControllerContract {
    create: (
        req: AuthRequest<
            object,
            UserWithoutPassword,
            InferType<typeof UserSchema.create>['body'],
            object
        >,
        res: AuthResponse<UserWithoutPassword>,
    ) => void;
    getById: (
        req: AuthRequest<
            { id: string },
            void,
            object,
            InferType<typeof UserSchema.getById>['query']
        >,
        res: AuthResponse<UserWithoutPassword | UserWithSelect | null>,
    ) => void;
    update: (
        req: AuthRequest<
            { id: string },
            UserWithoutPassword,
            InferType<typeof UserSchema.update>['body'],
            object
        >,
        res: AuthResponse<UserWithoutPassword>,
    ) => void;
    delete: (
        req: AuthRequest<{ id: string }, UserWithoutPassword, object, object>,
        res: AuthResponse<UserWithoutPassword>,
    ) => void;
}

export interface UserServiceContract {
    getById: (
        dto: GetUserByIdDto,
    ) => Promise<UserWithoutPassword | UserWithSelect<UserSelect>>;
    create: (dto: CreateUserDto) => Promise<UserWithoutPassword>;
    update: (dto: UpdateUserDto) => Promise<UserWithoutPassword>;
    delete: (dto: DeleteUserDto) => Promise<UserWithoutPassword>;
}

export interface UserRepositoryContract {
    create: (data: UserCreateInput) => Promise<UserWithoutPassword>;
    update: (
        where: UserWhereUnique,
        data: UserUpdateInput,
    ) => Promise<UserWithoutPassword>;
    delete: (where: UserWhereUnique) => Promise<UserWithoutPassword>;

    get: {
        (params: { where: UserWhereUnique }): Promise<UserWithoutPassword>;
        <S extends UserSelect>(params: {
            where: UserWhereUnique;
            select?: S;
        }): Promise<UserWithSelect<S>>;
        <I extends UserInclude>(params: {
            where: UserWhereUnique;
            include?: I;
        }): Promise<UserWithInclude<I>>;
    };
}

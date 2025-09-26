import { UserCreateInput, UserSelect, UserUpdateInput } from './user.domain';

export type GetUserByIdDto = { id: string; select: UserSelect };
export type CreateUserDto = UserCreateInput;
export type UpdateUserDto = { id: string; data: UserUpdateInput };
export type DeleteUserDto = { id: string };

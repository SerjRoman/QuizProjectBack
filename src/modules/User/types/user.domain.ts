import { $Enums, Prisma, User as PrismaUser } from '#prisma-types';

export type User = PrismaUser;
export type UserWithoutPassword = Omit<User, 'password'>;

export type UserWithArgs<
    I extends UserInclude = object,
    O extends UserOmit = object,
> = Prisma.UserGetPayload<{ include: I; omit: O }>;

export type UserRolesEnum = $Enums.Role;

export type UserCreateInput = Prisma.UserUncheckedCreateInput;
export type UserUpdateInput = Prisma.UserUncheckedUpdateInput;

export type UserInclude = Prisma.UserInclude;
export type UserOmit = Prisma.UserOmit;

export type UserLoginPayload = Pick<User, 'email' | 'password'>;

export type UserSelectWithoutPassword = Omit<Prisma.UserSelect, 'password'>;
export type UserSelect = Prisma.UserSelect;

export type UserWithSelect<S extends UserSelect = object> =
    Prisma.UserGetPayload<{ select: S }>;

export type UserWhereUnique = Prisma.UserWhereUniqueInput;
export type UserWithInclude<I extends UserInclude = object> =
    Prisma.UserGetPayload<{ include: I }>;
export type UserFindUniqueArgs = Prisma.UserFindUniqueArgs;

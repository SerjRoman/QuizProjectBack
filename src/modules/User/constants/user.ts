import { KeysArray } from '#types';
import { UserRolesEnum, UserSelectWithoutPassword } from '../types/user.domain';

export const ROLES: UserRolesEnum[] = ['STUDENT', 'TEACHER'];
export const OMIT_FIELDS = [
    'id',
    'username',
    'email',
    'password',
    'role',
    'createdAt',
    'updatedAt',
    'firstName',
    'lastName',
    'avatar',
];

export const USER_SELECT: KeysArray<UserSelectWithoutPassword> = [
    'avatar',
    'createdAt',
    'id',
    'username',
    'email',
    'firstName',
    'lastName',
    'role',
    'avatar',
    'favouriteQuzzesIds',
    'createdAt',
    'updatedAt',
    'favourite',
    'teacherProfile',
    'studentProfile',
    'notifications',
    '_count',
];

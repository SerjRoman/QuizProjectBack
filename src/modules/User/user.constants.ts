import { KeysArray } from '#types';
import { UserRolesEnum, UserSelect } from './user.types';

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

export const USER_SELECT: KeysArray<UserSelect> = [
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

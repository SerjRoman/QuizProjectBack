import { UserRolesEnum } from './user.types';

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

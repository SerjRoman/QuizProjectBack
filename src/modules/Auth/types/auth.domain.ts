import { UserWithSelect } from '@modules/User';

export type AuthenticatedUserResponse = UserWithSelect<{
    id: true;
    email: true;
    role: true;
    username: true;
    firstName: true;
    lastName: true;
    createdAt: true;
}>;

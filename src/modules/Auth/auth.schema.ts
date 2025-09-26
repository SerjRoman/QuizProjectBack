import * as yup from 'yup';
import { ROLES } from './constants';

export const AuthSchema = {
    register: yup.object({
        body: yup.object({
            email: yup.string().email().required(),
            username: yup.string().min(3).max(20).required(),
            password: yup.string().min(6).max(50).required(),
            role: yup.string().oneOf(ROLES).required(),
            firstName: yup.string().required(),
            lastName: yup.string().required(),
        }),
    }),
    login: yup.object({
        body: yup.object({
            email: yup.string().required(),
            password: yup.string().required(),
        }),
    }),
    refresh: yup.object({
        body: yup.object({
            refreshToken: yup.string().required(),
        }),
    }),
};

import * as yup from 'yup';

export const UserSchema = {
    create: yup.object({
        body: yup.object({
            email: yup.string().email().required(),
            username: yup.string().min(3).max(20).required(),
            password: yup.string().min(6).max(50).required(),
            role: yup.string().oneOf(['Student', 'Teacher']).required(),
        }),
    }),
    update: yup.object({
        params: yup.object({
            id: yup.string().uuid().required(),
        }),
        body: yup.object({
            email: yup.string().email().optional(),
            username: yup.string().min(3).max(20).optional(),
            password: yup.string().min(6).max(50).optional(),
            role: yup.string().oneOf(['Student', 'Teacher']).optional(),
        }),
    }),
    delete: yup.object({
        params: yup.object({
            id: yup.string().uuid().required(),
        }),
    }),
    getById: yup.object({
        query: yup
            .object({
                include: yup
                    .array()
                    .of(
                        yup
                            .string()
                            .oneOf(['TeacherProfile', 'StudentProfile'])
                            .required(),
                    )
                    .optional(),
                omit: yup
                    .array()
                    .of(
                        yup
                            .string()
                            .oneOf([
                                'id',
                                'createdAt',
                                'username',
                                'email',
                                'role',
                                'password',
                            ])
                            .required(),
                    )
                    .optional(),
            })
            .optional(),
    }),
    refresh: yup.object({
        body: yup.object({
            refreshToken: yup.string().required(),
        }),
    }),
};

import * as yup from 'yup';

const commonQuizQuerySchema = yup.object({
    include: yup
        .array()
        .of(yup.string().oneOf(['questions']).required())
        .optional(),
    omit: yup
        .array()
        .of(yup.string().oneOf(['id', 'title', 'createdAt']).required())
        .optional(),
    limit: yup.string().optional(),
    offset: yup.string().optional(),
});

export const QuizSchema = {
    create: yup
        .object({
            body: yup.object({
                title: yup.string().required('Title is required'),
            }),
        })
        .required(),
    getAll: yup.object({
        query: commonQuizQuerySchema.optional(),
    }),
    getById: yup.object({
        query: commonQuizQuerySchema.optional(),
    }),
    delete: yup.object({
        params: yup.object({
            id: yup.string().required(),
        }),
    }),
};

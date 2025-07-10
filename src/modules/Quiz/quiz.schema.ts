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
    limit: yup.number().optional(),
    offset: yup.number().optional(),
});

export const QuizSchema = {
    create: yup
        .object({
            body: yup.object({
                title: yup.string().required('Title is required'),
                subjectId: yup.string().required('Subject ID is required'),
                coverImage: yup.string().optional(),
                tagsIds: yup.array().of(yup.string().required()).optional(),
                languageIds: yup.array().of(yup.string().required()).optional(),
                shuffleAnswers: yup.boolean().default(false),
                shuffleQuestions: yup.boolean().default(false),

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

import * as yup from 'yup';
import {
    QuizIncludeArray,
    QuizOmitArray,
    QuizSelectArray,
    QuizStatusArray,
} from './quiz.constants';

const commonQuizQuerySchema = yup.object({
    include: yup
        .array()
        .of(yup.string().oneOf(QuizIncludeArray).required())
        .optional(),
    omit: yup
        .array()
        .of(yup.string().oneOf(QuizOmitArray).required())
        .optional(),
    select: yup
        .array()
        .of(yup.string().oneOf(QuizSelectArray).required())
        .optional(),
    limit: yup.number().optional(),
    offset: yup.number().optional(),
});

const getAllFilters = yup.object({
    tags: yup.array().of(yup.string().required()).optional(),
    languages: yup.array().of(yup.string().required()).optional(),
    subject: yup.string().optional(),
    isPrivate: yup.boolean().optional(),
    status: yup.string().oneOf(QuizStatusArray).optional(),
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
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
    getById: yup.object({
        query: commonQuizQuerySchema.optional(),
    }),
    delete: yup.object({
        params: yup.object({
            id: yup.string().required(),
        }),
    }),
    teacherMy: yup.object({
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
    teacherMyCopied: yup.object({
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
    teacherMyCreated: yup.object({
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
    teacherMyFavourite: yup.object({
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
};

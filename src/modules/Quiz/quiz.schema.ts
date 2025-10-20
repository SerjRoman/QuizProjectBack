import * as yup from 'yup';
import {
    ORDER_OPTIONS,
    QUIZ_SELECT,
    QUIZ_STATUS,
    QUIZ_VISIBILITY,
    SORT_FIELD_OPTIONS,
} from './constants';

const commonQuizQuerySchema = yup.object({
    select: yup
        .array()
        .of(yup.string().oneOf(QUIZ_SELECT).required())
        .optional(),
    page: yup.number().optional(),
    perPage: yup.number().optional(),
});

const getAllFilters = yup.object({
    tags: yup.array().of(yup.string().required()).optional(),
    languages: yup.array().of(yup.string().required()).optional(),
    subject: yup.string().optional(),
    search: yup.string().optional(),
    sort: yup
        .object({
            field: yup.string().oneOf(SORT_FIELD_OPTIONS).default('createdAt'),
            order: yup.string().oneOf(ORDER_OPTIONS).default('desc'),
        })
        .optional(),
    visibility: yup
        .array()
        .of(yup.string().oneOf(QUIZ_VISIBILITY).required())
        .optional(),
    status: yup
        .array()
        .of(yup.string().oneOf(QUIZ_STATUS).required())
        .optional(),
});

export const QuizSchema = {
    create: yup
        .object({
            body: yup.object({
                title: yup
                    .string()
                    .min(3, 'TITLE_MIN_LENGTH')
                    .max(100, 'TITLE_MAX_LENGTH')
                    .required('TITLE_REQUIRED'),
                subjectId: yup
                    .string()
                    .length(24, 'SUBJECT_ID_FORMAT')
                    .required('SUBJECT_REQUIRED'),
                coverImage: yup.string().optional(),
                tagsIds: yup.array().of(yup.string().required()).optional(),
                languagesIds: yup
                    .array()
                    .of(yup.string().required())
                    .optional(),
                shuffleAnswers: yup.boolean().default(false),
                shuffleQuestions: yup.boolean().default(false),
                visibility: yup
                    .string()
                    .oneOf(QUIZ_VISIBILITY, 'VISIBILITY_VALUES'),
            }),
        })
        .required(),
    getAll: yup.object({
        query: getAllFilters
            .optional()
            .concat(commonQuizQuerySchema.optional()),
    }),
    getById: yup.object({
        query: yup
            .object({
                select: yup
                    .array()
                    .of(yup.string().oneOf(QUIZ_SELECT).required())
                    .optional(),
            })
            .optional(),
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
    }),
    delete: yup.object({
        params: yup.object({
            id: yup.string().required('ID_REQUIRED'),
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
    updateFavourite: yup.object({
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
    }),
    deleteFavourite: yup.object({
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
    }),

    patch: yup.object({
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
        body: yup.object({
            title: yup.string().optional(),
            shuffleQuestions: yup.boolean().optional(),
            status: yup.string().oneOf(QUIZ_STATUS).optional(),
            isPrivate: yup.boolean().optional(),
            shuffleAnswers: yup.boolean().optional(),
        }).required("BODY_REQUIRED"),
    }),
    copyQuiz: yup.object({
        body: yup.object({
            id: yup.string().length(24).required("ID_REQUIRED"),
        }).required("BODY_REQUIRED"),
    }),
    uploadImage: yup.object({
        body: yup.object({
            fileType: yup.string().required('ID_REQUIRED'),
        }),
    }),
};

import * as yup from 'yup';
import { QUIZ_ACCESS_TYPE } from './constants';

export const QuizAccessSchema = {
    getQuizAccessesByQuiz: yup.object({
        params: yup.object({
            quizId: yup.string().length(24).required(),
        }),
    }),
    createQuizAccess: yup.object({
        body: yup.object({
            quizId: yup.string().length(24).required(),
            teacherUsername: yup.string().required(),
            accessType: yup.string().oneOf(QUIZ_ACCESS_TYPE).required(),
        }),
    }),
    updateQuizAccess: yup.object({
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
        body: yup.object({
            accessType: yup.string().oneOf(QUIZ_ACCESS_TYPE).required(),
        }),
    }),
    deleteQuizAccess: yup.object({
        params: yup.object({
            id: yup.string().length(24).required(),
        }),
    }),
};

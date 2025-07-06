import { Question } from '@src/modules/Question/question.types';
import { Quiz, QuizWithInclude } from '../../quiz.types';
import { faker } from '@faker-js/faker';
import { createManyFakeQuestions } from '@src/modules/Question/__tests__/factories/question.factory';
export const createQuiz = (): Quiz => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    createdAt: faker.date.anytime(),
});

export const createManyQuizzes = (num: number) => {
    return Array.from({ length: num }, () => createQuiz());
};
export const createQuizWithQuestions = (
    numQuestions: number,
): QuizWithInclude<{ questions: true }> => {
    const quiz = createQuiz();
    const questions: Question[] = createManyFakeQuestions(numQuestions, {
        quizId: quiz.id,
    });
    return {
        ...quiz,
        questions,
    };
};

export const createManyQuizzesWithQuestions = (
    num: number,
    numQuestions: number,
) => Array.from({ length: num }, () => createQuizWithQuestions(numQuestions));

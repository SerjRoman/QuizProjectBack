import { Quiz } from '@prisma/client';
import client from '../../prisma/client';
import { Result } from '../../types/result';
import { failure, success } from '../../utils/result';

export const QuizRepository = {
    getById: async function (id: string): Promise<Result<Quiz, string>> {
        const quiz = await client.quiz.findUnique({
            where: { id: id },
            include: {
                questions: true
            }
        });
        if (!quiz) {
            return failure('Quiz not found');
        }
        return success(quiz);
    },
    getByIdWithQuestions: async function (id: string): Promise<Result<Quiz, string>> {

    }
};

import { QuizRepository } from './quiz.repository';
import type { IQuizService } from './quiz.types';

export const QuizService: IQuizService = {
    getAll: async (include, omit, limit, offset) => {
        return await QuizRepository.getAll<typeof include, typeof omit>(
            include,
            omit,
            limit,
            offset,
        );
    },
    getById: async function (id, include, omit) {
        return await QuizRepository.getById<typeof include, typeof omit>(
            id,
            include,
            omit,
        );
    },
    create: async function (data) {
        return await QuizRepository.create(data);
    },
    delete: async function (id) {
        return await QuizRepository.delete(id);
    },
};

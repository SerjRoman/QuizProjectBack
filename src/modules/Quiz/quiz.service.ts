import { QuizRepository } from './quiz.repository';
import type { QuizService as QSType } from './quiz.types';

export const QuizService: QSType = {
    getAll: async (include, omit) => {
        return await QuizRepository.getAll<typeof include, typeof omit>(
            include,
            omit,
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

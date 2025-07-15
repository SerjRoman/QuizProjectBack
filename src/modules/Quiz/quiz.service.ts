import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import { IQuizService } from './types/quiz.contract';
import { QuizWhere } from './types/quiz.domain';

export const QuizService: IQuizService = {
    getAllWithSelect: async function (select, limit, offset, filters, where) {
        const prismaWhere: QuizWhere = { ...where };
        if (filters) {
            const { tags, languages, subject } = filters;
            if (tags) {
                prismaWhere.tags = { some: { name: { in: tags } } };
            }
            if (languages) {
                prismaWhere.languages = { some: { name: { in: languages } } };
            }
            if (subject) {
                prismaWhere.subject = { name: subject };
            }
        }
        return await QuizRepository.getAllWithSelect<typeof select>(
            !isObjectEmpty(select) ? select : undefined,
            limit,
            offset,
            prismaWhere,
        );
    },
    getById: async function (id, select) {
        return await QuizRepository.get<typeof select>(
            { id },
            !isObjectEmpty(select) ? select : undefined,
        );
    },
    create: async function (data) {
        return await QuizRepository.create(data);
    },
    delete: async function (id) {
        return await QuizRepository.delete({ id });
    },
    updateFavourite: async function (userId, quizId) {
        return await QuizRepository.update(
            { id: quizId },
            {
                favouritedBy: {
                    connect: {
                        id: userId,
                    },
                },
            },
        );
    },
    deleteFavourite: async function (userId, quizId) {
        return await QuizRepository.update(
            { id: quizId },
            {
                favouritedBy: {
                    disconnect: {
                        id: userId,
                    },
                },
            },
        );
    },
};

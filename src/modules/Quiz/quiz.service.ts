import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import type { IQuizService, QuizWhere } from './quiz.types';

export const QuizService: IQuizService = {
    getAll: async (include, omit, limit, offset, filters) => {
        const where: QuizWhere = {};
        if (filters) {
            const { tags, languages, subject } = filters;
            if (tags) {
                where.tags = { some: { name: { in: tags } } };
            }
            if (languages) {
                where.languages = { some: { name: { in: languages } } };
            }
            if (subject) {
                where.subject = { name: subject };
            }
        }
        return await QuizRepository.getAll<typeof include, typeof omit>(
            include,
            omit,
            limit,
            offset,
            where,
        );
    },
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
        return await QuizRepository.getById<typeof select>(
            id,
            !isObjectEmpty(select) ? select : undefined,
        );
    },
    create: async function (data) {
        return await QuizRepository.create(data);
    },
    delete: async function (id) {
        return await QuizRepository.delete(id);
    },
};

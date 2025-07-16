import { isObjectEmpty } from '@utils';
import { QuizRepository } from './quiz.repository';
import { IQuizService } from './types/quiz.contract';
import { QuizWhere } from './types/quiz.domain';
const _manageFavouriteConnection = (
    userId: string,
    quizId: string,
    action: 'connect' | 'disconnect',
) => {
    return QuizRepository.update(
        { id: quizId },
        {
            favouritedBy: {
                [action]: {
                    id: userId,
                },
            },
        },
    );
};
export const QuizService: IQuizService = {
    getAll: async function ({ select, limit, offset, filters, where, userId }) {
        const dynamicSelect = {
            ...select,
            _count: {
                select: {
                    favouritedBy: {
                        where: {
                            id: userId,
                        },
                    },
                },
            },
        };
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
        const quizzes = await QuizRepository.getAllWithSelect<
            typeof dynamicSelect
        >(
            !isObjectEmpty(dynamicSelect) ? dynamicSelect : undefined,
            limit,
            offset,
            prismaWhere,
        );
        const enrichedQuizzes = quizzes.map((quiz) => {
            const { _count, ...restOfQuiz } = quiz;
            const isFavourite = _count.favouritedBy > 0;
            return {
                ...restOfQuiz,
                isFavourite,
            };
        });

        return enrichedQuizzes;
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
        return await _manageFavouriteConnection(userId, quizId, 'connect');
    },
    deleteFavourite: async function (userId, quizId) {
        return await _manageFavouriteConnection(userId, quizId, 'disconnect');
    },
};

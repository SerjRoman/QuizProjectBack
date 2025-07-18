import { InputJsonValue } from '#types';
import { QUIZ_COPY_SELECT } from './constants/quiz.constants';
import { QuizRepository } from './quiz.repository';
import {
    QuizCreateInput,
    QuizSelect,
    QuizWhere,
    QuizWithSelect,
} from './types/quiz.domain';

export const QuizBuilder = {
    buildWhereFromFilters: function (
        where: QuizWhere | undefined,
        filters:
            | {
                  tags?: string[];
                  languages?: string[];
                  subject?: string;
                  search?: string;
              }
            | undefined,
    ) {
        const prismaWhere: QuizWhere = { ...where };
        if (filters) {
            const { tags, languages, subject, search } = filters;
            if (tags && tags.length > 0) {
                prismaWhere.tags = { some: { id: { in: tags } } };
            } else {
                prismaWhere.tags = undefined;
            }
            if (languages && languages?.length > 0) {
                prismaWhere.languages = { some: { id: { in: languages } } };
            } else {
                prismaWhere.languages = undefined;
            }
            if (subject) {
                prismaWhere.subject = { id: subject };
            }
            if (search) {
                prismaWhere.title = { contains: search };
            }
        }
        return prismaWhere;
    },
    buildSelectWithFavourite: function (
        select: QuizSelect,
        userId: string | undefined,
    ) {
        const selectWithFavourite: QuizSelect = { ...select };
        selectWithFavourite._count = {
            select: {
                favouritedBy: {
                    where: {
                        id: userId,
                    },
                },
            },
        };
        return selectWithFavourite;
    },
    buildSelectWithCreatedBy: function (select: QuizSelect) {
        const selectWithCreatedBy: QuizSelect = { ...select };
        selectWithCreatedBy.createdBy = {
            select: {
                user: {
                    select: {
                        avatar: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        };
        return selectWithCreatedBy;
    },
    enrichQuizzesWithFavouriteStatus: function (
        quizzes: QuizWithSelect<{
            _count: { select: { favouritedBy: { where: { id: string } } } };
        }>[],
    ) {
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
    manageFavouriteConnection: function (
        userId: string,
        quizId: string,
        action: 'connect' | 'disconnect',
    ) {
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
    },
    manageAccessConnection: function (
        userId: string,
        quizId: string,
        action: 'connect' | 'disconnect',
    ) {
        return QuizRepository.update(
            { id: quizId },
            {
                accessedTo: {
                    [action]: {
                        userId,
                    },
                },
            },
        );
    },
    buildQuizCopyData: function (
        quizToCopy: QuizWithSelect<typeof QUIZ_COPY_SELECT>,
        teacherProfileId: string,
    ) {
        const questionsToCopy = quizToCopy.questions
            .filter((q) => {
                if (q.data) return true;
            })
            .map((q) => ({ type: q.type, data: q.data as InputJsonValue }));
        const dataToCreateQuiz: QuizCreateInput = {
            status: 'DRAFT',
            title: `Copied ${quizToCopy.title}`,
            subjectId: quizToCopy.subjectId,
            tagsIds: quizToCopy.tagsIds,
            languagesIds: quizToCopy.languagesIds,
            shuffleAnswers: quizToCopy.shuffleAnswers,
            shuffleQuestions: quizToCopy.shuffleQuestions,
            visibility: quizToCopy.visibility,
            coverImage: quizToCopy.coverImage,
            questions:
                questionsToCopy.length > 0
                    ? { createMany: { data: questionsToCopy } }
                    : undefined,
            createdById: teacherProfileId,
        };
        return dataToCreateQuiz;
    },
    buildCreateDataWithLanguages: function (
        data: QuizCreateInput,
        prismaData: QuizCreateInput,
    ) {
        if (data.languagesIds && 'length' in data.languagesIds) {
            const connectLanguages = data.languagesIds.map((languageId) => ({
                id: languageId,
            }));
            prismaData.languages = { connect: connectLanguages };
            prismaData.languagesIds = undefined;
        }
        return prismaData;
    },
    buildCreateDataWithTags: function (
        data: QuizCreateInput,
        prismaData: QuizCreateInput,
    ) {
        if (data.tagsIds && 'length' in data.tagsIds) {
            const connectTags = data.tagsIds.map((tagId) => ({ id: tagId }));
            prismaData.tags = { connect: connectTags };
            prismaData.tagsIds = undefined;
        }
        return prismaData;
    },
};

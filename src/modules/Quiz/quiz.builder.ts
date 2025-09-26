import { InputJsonValue } from '#types';
import { QUIZ_COPY_SELECT } from './constants';
import { QuizRepository } from './quiz.repository';
import {
    QuizForTeacher,
    QuizOrderBy,
    QuizSelect,
    QuizStatus,
    QuizUncheckedCreateInput,
    QuizVisibility,
    QuizWhere,
    QuizWithSelect,
    SortOptions,
} from './types';

export const QuizBuilder = {
    buildWhereFromFilters: function (
        where: QuizWhere | undefined,
        filters:
            | {
                  tags?: string[];
                  languages?: string[];
                  subject?: string;
                  search?: string;
                  visibility?: QuizVisibility[];
                  status?: QuizStatus[];
              }
            | undefined,
    ) {
        const prismaWhere: QuizWhere = { ...where };
        if (filters) {
            const { tags, languages, subject, search, visibility, status } =
                filters;
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
            if (visibility) {
                prismaWhere.visibility = { in: visibility };
            }
            if (status) {
                prismaWhere.status = { in: status };
            }
        }
        return prismaWhere;
    },
    buildOrderByFromSort: function (sort: SortOptions) {
        const orderBy: QuizOrderBy = {};
        orderBy[sort.field] = sort.order;
        return orderBy;
    },
    buildSelectWithFavourite: function (
        select: QuizSelect,
        userId: string | undefined,
    ) {
        const selectWithFavourite: QuizSelect = { ...select };
        selectWithFavourite.favouritedBy = {
            where: {
                id: userId,
            },
            select: {
                id: true,
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
                        id: true,
                    },
                },
            },
        };
        return selectWithCreatedBy;
    },
    enrichQuizzesWithFavouriteStatus(
        quizzes: QuizForTeacher[],
    ): (Omit<QuizForTeacher, 'favouritedBy'> & { isFavourite: boolean })[] {
        return quizzes.map((quiz) => {
            const { favouritedBy, ...restOfQuiz } = quiz;

            const isFavourite = favouritedBy.length > 0;

            return {
                ...restOfQuiz,
                isFavourite,
            };
        });
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

    buildQuizCopyData: function (
        quizToCopy: QuizWithSelect<typeof QUIZ_COPY_SELECT>,
        teacherProfileId: string,
    ) {
        const questionsToCopy = quizToCopy.questions
            .filter((q) => {
                if (q.data) return true;
            })
            .map((q) => ({ type: q.type, data: q.data as InputJsonValue }));
        const dataToCreateQuiz: QuizUncheckedCreateInput = {
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
            createdById: quizToCopy.ownedById,
            originalQuizId: quizToCopy.id,
            ownedById: teacherProfileId,
            accesses: {
                create: {
                    profile: {
                        connect: {
                            id: teacherProfileId,
                        },
                    },
                },
            },
        };
        return dataToCreateQuiz;
    },
    buildCreateDataWithLanguages: function (
        data: QuizUncheckedCreateInput,
        prismaData: QuizUncheckedCreateInput,
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
        data: QuizUncheckedCreateInput,
        prismaData: QuizUncheckedCreateInput,
    ) {
        if (data.tagsIds && 'length' in data.tagsIds) {
            const connectTags = data.tagsIds.map((tagId) => ({ id: tagId }));
            prismaData.tags = { connect: connectTags };
            prismaData.tagsIds = undefined;
        }
        return prismaData;
    },
};

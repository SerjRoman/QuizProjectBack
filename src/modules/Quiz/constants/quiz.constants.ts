import {
    QuizInclude,
    QuizOmit,
    QuizSelect,
    QuizStatus,
    QuizVisibility,
    SortOptions,
} from '../types';
import { KeysArray } from '#types';
import { Prisma } from '@prisma/client';

export const QUIZ_OMIT: KeysArray<QuizOmit> = [
    'id',
    'title',
    'visibility',
    'status',
    'coverImage',
    'tagsIds',
    'languagesIds',
    'shuffleAnswers',
    'shuffleQuestions',
    'subjectId',
    'createdAt',
    'updatedAt',
    'favouritedByIds',
    'createdById',
    'copiedByIds',
    'completedByIds',
    'folderIds',
];
export const QUIZ_SELECT: KeysArray<QuizSelect> = [
    'id',
    'title',
    'visibility',
    'status',
    'coverImage',
    'tagsIds',
    'languagesIds',
    'shuffleAnswers',
    'shuffleQuestions',
    'subjectId',
    'createdAt',
    'updatedAt',
    'favouritedByIds',
    'createdById',
    'copiedByIds',
    'completedByIds',
    'folderIds',
    'subject',
    'languages',
    'completedBy',
    'copiedBy',
    'createdBy',
    'favouritedBy',
    'folders',
    'questions',
    'tags',
    'copies',
];

export const QUIZ_INCLUDE: KeysArray<QuizInclude> = [
    '_count',
    'attempted',
    'completedBy',
    'copiedBy',
    'createdBy',
    'favouritedBy',
    'folders',
    'languages',
    'questions',
    'rooms',
    'subject',
    'tags',
];
export const QUIZ_STATUS: QuizStatus[] = ['PUBLISHED', 'DRAFT'];
export const QUIZ_VISIBILITY: QuizVisibility[] = ['PRIVATE', 'PUBLIC'];

export const QUIZ_COPY_SELECT = Prisma.validator<QuizSelect>()({
    id: true,
    questions: true,
    title: true,
    subjectId: true,
    tagsIds: true,
    languagesIds: true,
    shuffleAnswers: true,
    shuffleQuestions: true,
    visibility: true,
    coverImage: true,
    ownedById: true,
});

export const ORDER_OPTIONS: SortOptions['order'][] = ['desc', 'asc'];
export const SORT_FIELD_OPTIONS: SortOptions['field'][] = [
    'title',
    'createdAt',
];

export const GET_TEACHER_PROFILE_SELECT = {
    ownedBy: { select: { userId: true } },
};

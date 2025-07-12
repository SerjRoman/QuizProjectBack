import { KeysArray } from '@src/types';
import { QuizInclude, QuizOmit, QuizSelect, QuizStatus } from './quiz.types';

export const QuizOmitArray: KeysArray<QuizOmit> = [
    'id',
    'title',
    'isPrivate',
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
export const QuizSelectArray: KeysArray<QuizSelect> = [
    'id',
    'title',
    'isPrivate',
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

export const QuizIncludeArray: KeysArray<QuizInclude> = [
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
export const QuizStatusArray: QuizStatus[] = ['PUBLISHED', 'DRAFT'];

import { PaginationParams } from '#types';
import {
    QuizSelect,
    QuizUncheckedCreateInput,
    QuizWhere,
    SortOptions,
} from './quiz.domain';

export type GetAllTeacherQuizzesDto = {
    select: QuizSelect;
    filters?: {
        tags?: string[];
        languages?: string[];
        subject?: string;
        search?: string;
    };
    where?: QuizWhere;
    pagination?: PaginationParams;
    userId?: string;
    sort?: SortOptions;
};
export type GetQuizByIdDto = { id: string; select: QuizSelect };
export type DeleteQuizDto = { id: string; teacherId: string };
export type CreateQuizDto = QuizUncheckedCreateInput;
export type UpdateFavouriteDto = { userId: string; quizId: string };
export type CopyQuizDto = { userId: string; quizId: string };
export type UploadImageDto = { imageType: string };

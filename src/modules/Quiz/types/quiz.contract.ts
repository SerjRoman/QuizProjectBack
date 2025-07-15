import { AuthRequest, AuthResponse } from '#types';
import { InferType } from 'yup';
import { QuizSchema } from '../quiz.schema';
import {
    Quiz,
    QuizCreateInput,
    QuizSelect,
    QuizUpdateInput,
    QuizWhere,
    QuizWhereUnique,
    QuizWithSelect,
} from './quiz.domain';
import { NextFunction } from 'express';

type CommonTeacherRequest = (
    req: AuthRequest<
        object,
        object,
        object,
        InferType<typeof QuizSchema.getAll>['query']
    >,
    res: AuthResponse<QuizWithSelect[] | Quiz[]>,
    next: NextFunction,
) => void;

export interface IQuizController {
    teacherMy: CommonTeacherRequest;
    teacherMyCopied: CommonTeacherRequest;
    teacherMyFavourite: CommonTeacherRequest;
    teacherMyCreated: CommonTeacherRequest;
    getById: (
        req: AuthRequest<
            { id: string },
            object,
            object,
            InferType<typeof QuizSchema.getById>['query']
        >,
        res: AuthResponse<QuizWithSelect | Quiz>,
        next: NextFunction,
    ) => void;
    delete: (
        req: AuthRequest<InferType<typeof QuizSchema.delete>>['params'],
        res: AuthResponse,
        next: NextFunction,
    ) => void;
    create: (
        req: AuthRequest<
            object,
            QuizCreateInput,
            InferType<typeof QuizSchema.create>['body']
        >,
        res: AuthResponse<QuizCreateInput>,
        next: NextFunction,
    ) => void;
    handleTeacherQuizRequest: (
        req: AuthRequest<
            object,
            object,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        res: AuthResponse<QuizWithSelect[] | Quiz[]>,
        next: NextFunction,
        prismaWhereClause: QuizWhere,
    ) => void;
    addToFavourites: (
        req: AuthRequest<
            InferType<typeof QuizSchema.updateFavourite>['params'],
            object,
            object,
            object
        >,
        res: AuthResponse<void>,
        next: NextFunction,
    ) => void;
    removeFromFavourites: (
        req: AuthRequest<
            InferType<typeof QuizSchema.deleteFavourite>['params'],
            object,
            object,
            object
        >,
        res: AuthResponse<void>,
        next: NextFunction,
    ) => void;
}

export interface IQuizService {
    getAllWithSelect: (
        select: QuizSelect,
        limit?: number,
        offset?: number,
        filters?: {
            tags?: string[] | undefined;
            languages?: string[] | undefined;
            subject?: string | undefined;
        },
        where?: QuizWhere,
    ) => Promise<QuizWithSelect[]>;
    getById: (id: string, select: QuizSelect) => Promise<QuizWithSelect>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    updateFavourite: (userId: string, quizId: string) => Promise<Quiz>;
    deleteFavourite: (userId: string, quizId: string) => Promise<Quiz>;
}

export interface IQuizRepository {
    getAllWithSelect: <S extends QuizSelect>(
        select?: S,
        limit?: number,
        offset?: number,
        where?: QuizWhere,
    ) => Promise<QuizWithSelect<S>[] | Quiz[]>;
    get: <S extends QuizSelect>(
        where: QuizWhereUnique,
        select?: QuizSelect,
    ) => Promise<QuizWithSelect<S> | Quiz>;
    delete: (where: QuizWhereUnique) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    update: (where: QuizWhereUnique, data: QuizUpdateInput) => Promise<Quiz>;
}

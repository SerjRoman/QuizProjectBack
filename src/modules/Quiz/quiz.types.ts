import { Prisma, Quiz as QuizPrisma } from '#prisma/prisma';
import { AuthRequest, AuthResponse } from '#types/express';
import { InferType } from 'yup';
import { QuizSchema } from './quiz.schema';
import { NextFunction } from 'express';

export type Quiz = QuizPrisma;

export type QuizUpdateInput = Prisma.QuizUpdateInput;

export type QuizCreateInput = Prisma.QuizCreateInput;

export type QuizInclude = Prisma.QuizInclude;
export type QuizOmit = Prisma.QuizOmit;
export type QuizWhere = Prisma.QuizWhereInput;

export type QuizWithInclude<I extends QuizInclude = object> =
    Prisma.QuizGetPayload<{
        include: I;
    }>;

export type QuizWithOmit<O extends QuizOmit = object> = Prisma.QuizGetPayload<{
    omit: O;
}>;

export type QuizWithArgs<
    I extends QuizInclude = object,
    O extends QuizOmit = object,
> = Prisma.QuizGetPayload<{ omit: O; include: I }>;

export interface IQuizController {
    getAll: (
        req: AuthRequest<
            object,
            object,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        res: AuthResponse<QuizWithArgs[]>,
        next: NextFunction,
    ) => void;
    getById: (
        req: AuthRequest<
            { id: string },
            object,
            object,
            InferType<typeof QuizSchema.getById>['query']
        >,
        res: AuthResponse<QuizWithArgs>,
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
}
export interface IQuizService {
    getAll: (
        include: QuizInclude,
        omit: QuizOmit,
        limit: number,
        offset: number,
    ) => Promise<QuizWithArgs<QuizInclude, QuizOmit>[]>;
    getById: (
        id: string,
        include: QuizInclude,
        omit: QuizOmit,
    ) => Promise<QuizWithArgs<QuizInclude, QuizOmit>>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    // update: (data: )
}

export interface IQuizRepository {
    getAll: <I extends QuizInclude, O extends QuizOmit>(
        include: I,
        omit: O,
        limit: number,
        offset: number,
    ) => Promise<QuizWithArgs<I, O>[]>;
    getById: <I extends QuizInclude, O extends QuizOmit>(
        id: string,
        include: I,
        omit: O,
    ) => Promise<QuizWithArgs<I, O>>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
}

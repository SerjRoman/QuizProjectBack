import {
    Prisma,
    Quiz as QuizPrisma,
    QuizStatus as QuizStatusPrisma,
} from '#prisma/prisma';
import { AuthRequest, AuthResponse } from '#types/express';
import { InferType } from 'yup';
import { QuizSchema } from './quiz.schema';
import { NextFunction } from 'express';

export type Quiz = QuizPrisma;

export type QuizUpdateInput = Prisma.QuizUpdateInput;

export type QuizCreateInput = Prisma.QuizUncheckedCreateInput;

export type QuizStatus = QuizStatusPrisma;

export type QuizInclude = Prisma.QuizInclude;
export type QuizOmit = Prisma.QuizOmit;
export type QuizWhere = Prisma.QuizWhereInput;
export type QuizSelect = Prisma.QuizSelect;

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
export type QuizWithSelect<S extends QuizSelect = object> =
    Prisma.QuizGetPayload<{ select: S }>;

export interface IQuizController {
    getAll: (
        req: AuthRequest<
            object,
            object,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        res: AuthResponse<QuizWithArgs[] | QuizWithSelect[]>,
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
        limit?: number,
        offset?: number,
        filters?: {
            tags?: string[] | undefined;
            languages?: string[] | undefined;
            subject?: string | undefined;
        },
    ) => Promise<QuizWithArgs<QuizInclude, QuizOmit>[]>;
    getAllWithSelect: (
        select: QuizSelect,
        limit?: number,
        offset?: number,
        filters?: {
            tags?: string[] | undefined;
            languages?: string[] | undefined;
            subject?: string | undefined;
        },
    ) => Promise<QuizWithSelect[]>;
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
        limit?: number,
        offset?: number,
        where?: QuizWhere,
    ) => Promise<QuizWithArgs<I, O>[]>;
    getAllWithSelect: <S extends QuizSelect>(
        select: S,
        limit?: number,
        offset?: number,
        where?: QuizWhere,
    ) => Promise<QuizWithSelect<S>[]>;
    getById: <I extends QuizInclude, O extends QuizOmit>(
        id: string,
        include: I,
        omit: O,
    ) => Promise<QuizWithArgs<I, O>>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
}

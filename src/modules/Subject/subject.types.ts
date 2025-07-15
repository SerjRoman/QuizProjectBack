import type { Prisma, Subject as PrismaSubject } from '#prisma/prisma';
import { AuthRequest, AuthResponse } from '#types';
import { InferType } from 'yup';
import { SubjectSchema } from './subject.schema';
import { NextFunction } from 'express';

export type Subject = PrismaSubject;

export type SubjectSelect = Prisma.SubjectSelect;

export type SubjectWithSelect<S extends SubjectSelect = object> =
    Prisma.SubjectGetPayload<{
        select: S;
    }>;

export interface ISubjectRepository {
    getAll: <S extends SubjectSelect>(
        select?: SubjectSelect,
    ) => Promise<SubjectWithSelect<S>[] | Subject[]>;
}
export interface ISubjectService {
    getAll: (select: SubjectSelect) => Promise<SubjectWithSelect[] | Subject[]>;
}

export interface ISubjectController {
    getAll: (
        req: AuthRequest<
            object,
            SubjectWithSelect[] | Subject[],
            void,
            InferType<typeof SubjectSchema.getAll>['query']
        >,
        res: AuthResponse<SubjectWithSelect[] | Subject[]>,
        next: NextFunction,
    ) => void;
}

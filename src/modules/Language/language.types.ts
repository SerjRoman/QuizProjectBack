import type { Prisma, Language as PrismaLanguage } from '#prisma/prisma';
import { AuthRequest, AuthResponse } from '#types';
import { InferType } from 'yup';
import { LanguageSchema } from './language.schema';
import { NextFunction } from 'express';

export type Language = PrismaLanguage;

export type LanguageSelect = Prisma.LanguageSelect;

export type LanguageWithSelect<S extends LanguageSelect = object> =
    Prisma.LanguageGetPayload<{
        select: S;
    }>;

export interface ILanguageRepository {
    getAll: <S extends LanguageSelect>(
        select?: LanguageSelect,
    ) => Promise<LanguageWithSelect<S>[] | Language[]>;
}
export interface ILanguageService {
    getAll: (
        select: LanguageSelect,
    ) => Promise<LanguageWithSelect[] | Language[]>;
}

export interface ILanguageController {
    getAll: (
        req: AuthRequest<
            object,
            LanguageWithSelect[] | Language[],
            void,
            InferType<typeof LanguageSchema.getAll>['query']
        >,
        res: AuthResponse<LanguageWithSelect[] | Language[]>,
        next: NextFunction,
    ) => void;
}

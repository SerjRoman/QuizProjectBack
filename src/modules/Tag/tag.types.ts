import type { Prisma, Tag as PrismaTag } from '#prisma-types';
import { AuthRequest, AuthResponse } from '#types';
import { InferType } from 'yup';
import { TagSchema } from './tag.schema';
import { NextFunction } from 'express';

export type Tag = PrismaTag;

export type TagSelect = Prisma.TagSelect;

export type TagWithSelect<S extends TagSelect = object> = Prisma.TagGetPayload<{
    select: S;
}>;

export interface ITagRepository {
    getAll: <S extends TagSelect>(
        select?: TagSelect,
    ) => Promise<TagWithSelect<S>[] | Tag[]>;
}
export interface ITagService {
    getAll: (select: TagSelect) => Promise<TagWithSelect[] | Tag[]>;
}

export interface ITagController {
    getAll: (
        req: AuthRequest<
            object,
            TagWithSelect[] | Tag[],
            void,
            InferType<typeof TagSchema.getAll>['query']
        >,
        res: AuthResponse<TagWithSelect[] | Tag[]>,
        next: NextFunction,
    ) => void;
}

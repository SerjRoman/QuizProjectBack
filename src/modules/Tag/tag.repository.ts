import type { ITagRepository, TagSelect } from './tag.types';
import { PrismaClient } from '@prisma';

export const TagRepository: ITagRepository = {
    getAll: async function <S extends TagSelect = object>(select?: S) {
        try {
            return await PrismaClient.tag.findMany({
                select,
                orderBy: {
                    name: 'desc',
                },
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
};

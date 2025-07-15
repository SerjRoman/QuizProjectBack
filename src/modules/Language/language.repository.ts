import type { ILanguageRepository, LanguageSelect } from './language.types';
import { PrismaClient } from '@prisma';

export const LanguageRepository: ILanguageRepository = {
    getAll: async function <S extends LanguageSelect = object>(select?: S) {
        try {
            return await PrismaClient.language.findMany({
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

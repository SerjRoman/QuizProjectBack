import { isObjectEmpty } from '@utils';
import { LanguageRepository } from './language.repository';
import { ILanguageService } from './language.types';

export const LanguageService: ILanguageService = {
    getAll: async function (select) {
        return LanguageRepository.getAll<typeof select>(
            !isObjectEmpty(select) ? select : undefined,
        );
    },
};

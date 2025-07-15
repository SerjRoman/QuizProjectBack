import { isObjectEmpty } from '@utils';
import { TagRepository } from './tag.repository';
import { ITagService } from './tag.types';

export const TagService: ITagService = {
    getAll: async function (select) {
        return TagRepository.getAll<typeof select>(
            !isObjectEmpty(select) ? select : undefined,
        );
    },
};

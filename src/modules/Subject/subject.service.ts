import { isObjectEmpty } from '@utils';
import { SubjectRepository } from './subject.repository';
import { ISubjectService } from './subject.types';

export const SubjectService: ISubjectService = {
    getAll: async function (select) {
        return SubjectRepository.getAll<typeof select>(
            !isObjectEmpty(select) ? select : undefined,
        );
    },
};

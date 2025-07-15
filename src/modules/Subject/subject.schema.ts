import * as yup from 'yup';
import { SUBJECT_SELECT } from './subject.constants';

export const SubjectSchema = {
    getAll: yup.object({
        query: yup
            .object({
                select: yup
                    .array()
                    .of(yup.string().oneOf(SUBJECT_SELECT).required())
                    .optional(),
            })
            .optional(),
    }),
};

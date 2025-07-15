import * as yup from 'yup';
import { TAG_SELECT } from './tag.constants';

export const TagSchema = {
    getAll: yup.object({
        query: yup
            .object({
                select: yup
                    .array()
                    .of(yup.string().oneOf(TAG_SELECT).required())
                    .optional(),
            })
            .optional(),
    }),
};

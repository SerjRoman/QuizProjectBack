import * as yup from 'yup';
import { LANGUAGE_SELECT } from './language.constants';

export const LanguageSchema = {
    getAll: yup.object({
        query: yup
            .object({
                select: yup
                    .array()
                    .of(yup.string().oneOf(LANGUAGE_SELECT).required())
                    .optional(),
            })
            .optional(),
    }),
};

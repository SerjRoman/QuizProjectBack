import { arrayToBooleanObject } from '@utils';
import { ILanguageController } from './language.types';
import { LanguageService } from './language.service';

export const LanguageController: ILanguageController = {
    getAll: async function (req, res, next) {
        try {
            const select = arrayToBooleanObject(req.query?.select);
            res.status(200).json(await LanguageService.getAll(select));
        } catch (error) {
            next(error);
        }
    },
};

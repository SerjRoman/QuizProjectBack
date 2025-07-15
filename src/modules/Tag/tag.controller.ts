import { arrayToBooleanObject } from '@utils';
import { ITagController } from './tag.types';
import { TagService } from './tag.service';

export const TagController: ITagController = {
    getAll: async function (req, res, next) {
        try {
            const select = arrayToBooleanObject(req.query?.select);
            res.status(200).json(await TagService.getAll(select));
        } catch (error) {
            next(error);
        }
    },
};

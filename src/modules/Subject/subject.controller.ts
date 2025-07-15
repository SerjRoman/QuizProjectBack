import { arrayToBooleanObject } from '@utils';
import { ISubjectController } from './subject.types';
import { SubjectService } from './subject.service';

export const SubjectController: ISubjectController = {
    getAll: async function (req, res, next) {
        try {
            const select = arrayToBooleanObject(req.query?.select);
            res.status(200).json(await SubjectService.getAll(select));
        } catch (error) {
            next(error);
        }
    },
};

import { arrayToBooleanObject } from '@utils';
import { UserService } from './user.service';
import { UserControllerContract } from './types';

export const UserController: UserControllerContract = {
    async create(req, res) {
        res.status(201).json(await UserService.create(req.body));
    },
    async getById(req, res) {
        const select = arrayToBooleanObject(req.query?.select);
        res.status(200).json(
            await UserService.getById({
                id: req.params.id,
                select,
            }),
        );
    },

    async update(req, res) {
        res.status(200).json(
            await UserService.update({
                id: req.params.id,
                data: req.body,
            }),
        );
    },
    async delete(req, res) {
        res.status(200).send(await UserService.delete({ id: req.params.id }));
    },
};

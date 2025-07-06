import { UserService } from './user.service';
import { IUserController, UserInclude, UserOmit } from './user.types';

export const UserController: IUserController = {
    service: UserService,
    create: async function (req, res, next) {
        try {
            const data = await this.service.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    },
    getById: async function (req, res, next) {
        try {
            const include: UserInclude = {};
            const omit: UserOmit = {};
            const query = req.query;
            if (query) {
                if (query.include) {
                    query.include.forEach((q) => {
                        include[q] = true;
                    });
                }
                if (query.omit) {
                    query.omit.forEach((q) => {
                        omit[q] = true;
                    });
                }
            }
            const user = await this.service.getById(
                req.params.id,
                include,
                omit,
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    update: async function (req, res, next) {
        try {
            const user = await this.service.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            await this.service.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    me: async function (req, res, next) {
        try {
            const user = await this.service.getById(
                res.locals.userId,
                {},
                { password: true },
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    refresh: async function (req, res, next) {
        try {
            const { refreshToken } = req.body;
            const newToken = await this.service.refresh(refreshToken);
            res.status(200).json({ token: newToken });
        } catch (error) {
            next(error);
        }
    },
};

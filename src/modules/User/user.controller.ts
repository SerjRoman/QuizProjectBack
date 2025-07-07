import { UserService } from './user.service';
import { IUserController, UserInclude, UserOmit } from './user.types';

export const UserController: IUserController = {
    create: async function (req, res, next) {
        try {
            const data = await UserService.create(req.body);
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
            const user = await UserService.getById(
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
            const user = await UserService.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    delete: async function (req, res, next) {
        try {
            await UserService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },

    me: async function (req, res, next) {
        try {
            const user = await UserService.getById(
                res.locals.userId,
                {},
                { password: true },
            );
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
    refresh: function (req, res, next) {
        try {
            const { refreshToken } = req.body;
            const newToken = UserService.refresh(refreshToken);
            res.status(200).json({ token: newToken });
        } catch (error) {
            next(error);
        }
    },
    logout: function (req, res, next) {
        try {
            // Future Redis black list logic?
            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },
    register: async function (req, res, next) {
        try {
            res.status(201).json(await UserService.register(req.body));
        } catch (error) {
            next(error);
        }
    },
    login: async function (req, res, next) {
        try {
            res.status(201).json(await UserService.login(req.body));
        } catch (error) {
            next(error);
        }
    },
};

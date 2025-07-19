import { NextFunction, Request, Response } from 'express';

export const parseJsonQueryMiddleware = (
    req: Request<unknown, object, object, Record<string, unknown>>,
    _: Response,
    next: NextFunction,
) => {
    for (const key in req.query) {
        const value = req.query[key];

        if (typeof value === 'string') {
            if (value && !isNaN(Number(value))) {
                req.query[key] = Number(value);
            }

            if (value.startsWith('[') || value.startsWith('{')) {
                try {
                    req.query[key] = JSON.parse(value);
                } catch (error) {
                    console.error(error);
                    next(error);
                }
            }
        }
    }
    console.log(req.query);
    next();
};

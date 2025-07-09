import { NextFunction, Request, Response } from 'express';

export const parseJsonQueryMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    for (const key in req.query) {
        const value = req.query[key];

        if (typeof value === 'string') {
            if (!isNaN(Number(value))) {
                // req.query[key] = Number(value);
                req.query[key] = JSON.parse(value);
                // req.query.limit = value;
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
    next();
};

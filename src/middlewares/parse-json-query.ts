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
                try {
                    // req.query[key] = Number(value)
                    req.query.limit = value;
                } catch (error) {
                    console.log(error);
                    next(error);
                }
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

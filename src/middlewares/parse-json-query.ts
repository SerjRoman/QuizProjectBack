import { NextFunction, Request, Response } from 'express';

export const parseJsonQueryMiddleware = (
    req: Request<unknown, object, object, Record<string, unknown>>,
    _: Response,
    next: NextFunction,
) => {
    Object.defineProperty(req, 'query', {
        ...Object.getOwnPropertyDescriptor(req, 'query'),
        value: req.query,
        writable: true,
    });
    for (const key in req.query) {
        const value = req.query[key];

        if (typeof value === 'string') {
            if (value && !isNaN(Number(value))) {
                req.query[key] = Number(value);
            }

            if (value.startsWith('[') || value.startsWith('{')) {
                req.query[key] = JSON.parse(value);
            }
        }
    }
    next();
};

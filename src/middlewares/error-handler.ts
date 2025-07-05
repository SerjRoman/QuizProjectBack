import { AppError } from '@src/errors/app-errors';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(error);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
    next();
};

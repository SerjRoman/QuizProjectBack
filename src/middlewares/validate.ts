import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'src/errors/app-errors';
import { AnySchema, ValidationError as YupValidationError } from 'yup';

export const validateMiddleware = (schema: AnySchema) =>
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const validated = await schema.validate(
                {
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                {
                    abortEarly: false,
                    stripUnknown: true,
                },
            );
            req.query = validated.query;
            req.body = validated.body;

            return next();
        } catch (error) {
            if (error instanceof YupValidationError) {
                const validationErrors = error.inner.map((e) => ({
                    field: e.path,
                    message: e.message,
                }));
                next(new ValidationError(JSON.stringify(validationErrors)));
            }
            next(error);
        }
    };

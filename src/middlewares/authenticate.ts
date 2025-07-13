import { AuthenticationError, ForbiddenError } from '@src/errors';
import { UserService } from '@src/modules/User';
import { AuthRequest, AuthResponse } from '@src/types';
import { NextFunction, Request, Response } from 'express';

export const authenticateMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        next(new AuthenticationError('no authorization provided', 'no_auth'));
        return;
    }
    const [bearer, token] = authorization.split(' ');
    if (!(bearer === 'Bearer')) {
        next(
            new AuthenticationError(
                'unsupported type of token',
                'invalid_token',
            ),
        );
        return;
    }
    if (!token) {
        next(new AuthenticationError('no token provided', 'no_token'));
        return;
    }
    try {
        const userId = UserService.verifyToken(token);
        res.locals.userId = userId;
        next();
    } catch (error) {
        next(error);
    }
};
export async function isTeacherMiddleware(
    req: AuthRequest,
    res: AuthResponse,
    next: NextFunction,
) {
    try {
        const user = await UserService.getById(res.locals.userId, {}, {});
        if (user.role === 'TEACHER') {
            next();
        } else {
            next(
                new ForbiddenError(
                    'You must be a teacher to have access to this endpoint',
                    'not_teacher',
                ),
            );
        }
    } catch (error) {
        next(error);
    }
}

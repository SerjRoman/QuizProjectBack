import { AuthenticationError } from '@errors';
import { UserService } from '@modules/User';
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

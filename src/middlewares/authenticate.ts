import { TeacherResponse } from '#types';
import { env } from '@config';
import { AuthenticationError, ForbiddenError } from '@errors';
import { UserRepository } from '@modules/User';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

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
        const decoded = verify(token, env.SECRET_KEY);
        res.locals.userId = (decoded as { userId: string }).userId;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new AuthenticationError('token expired', 'token_expired');
        }
        throw new AuthenticationError('Invalid token', 'token_verification');
    }
};
export const authenticateTeacherMiddleware = async (
    req: Request,
    res: TeacherResponse,
    next: NextFunction,
) => {
    try {
        const teacherId = await UserRepository.get<{
            teacherProfile: { select: { id: true } };
        }>({
            where: { id: res.locals.userId },
            select: {
                teacherProfile: { select: { id: true } },
            },
        });
        if (!teacherId.teacherProfile) {
            next(new ForbiddenError('you are not a teacher'));
            return;
        }
        res.locals.teacherId = teacherId.teacherProfile.id;
        next();
    } catch (error) {
        next(error);
    }
};

import { TeacherResponse } from '#types';
import { AuthenticationError, ForbiddenError } from '@errors';
import { UserRepository, UserService } from '@modules/User';
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
export const authenticateTeacherMiddleware = async (
    req: Request,
    res: TeacherResponse,
    next: NextFunction,
) => {
    try {
        const teacherId = await UserRepository.get<{
            teacherProfile: { select: { id: true } };
        }>(
            { id: res.locals.userId },
            {
                teacherProfile: { select: { id: true } },
            },
        );
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

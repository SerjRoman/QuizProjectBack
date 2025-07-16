import { AuthRequest, AuthResponse } from '#types';
import { ForbiddenError } from '@errors';
import { UserRepository } from '@modules/User';
import { NextFunction } from 'express';

export function checkRole(role: string) {
    return async (_: AuthRequest, res: AuthResponse, next: NextFunction) => {
        try {
            const user = await UserRepository.get<{ role: true }>(
                { id: res.locals.userId },
                {
                    role: true,
                },
            );
            if (user.role === role) {
                next();
            } else {
                next(
                    new ForbiddenError(
                        `You must be a ${role} to have access to this resource`,
                        'not_role',
                    ),
                );
            }
        } catch (error) {
            next(error);
        }
    };
}

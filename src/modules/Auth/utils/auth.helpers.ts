import { env } from '@config';
import { AuthenticationError } from '@errors';
import { compare, hash } from 'bcryptjs';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';
import { StringValue } from 'ms';

export const generateToken = (userId: string) =>
    sign({ userId }, env.SECRET_KEY, {
        expiresIn: env.JWT_EXPIRES_IN as StringValue,
    });
export const generateRefreshToken = (userId: string) =>
    sign({ userId }, env.REFRESH_SECRET_KEY, {
        expiresIn: env.REFRESH_JWT_EXPIRES_IN as StringValue,
    });
export const hashPassword = async function (password: string) {
    return await hash(password, 10);
};

export const verifyRefreshToken = function (refreshToken: string) {
    try {
        const decoded = verify(refreshToken, env.REFRESH_SECRET_KEY);
        return (decoded as { userId: string }).userId;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new AuthenticationError('token expired', 'token_expired');
        }
        throw new AuthenticationError(
            'Invalid refresh token',
            'refresh_token_verification',
        );
    }
};
export const verifyToken = function (token: string) {
    try {
        const decoded = verify(token, env.SECRET_KEY);
        return (decoded as { userId: string }).userId;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new AuthenticationError('token expired', 'token_expired');
        }
        throw new AuthenticationError('Invalid token', 'token_verification');
    }
};
export const comparePasswords = async function (
    hashedPassword: string,
    password: string,
) {
    return await compare(password, hashedPassword);
};

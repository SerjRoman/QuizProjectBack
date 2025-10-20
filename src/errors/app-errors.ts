export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode?: string[] | string;
    constructor(message: string, code: number, errorCode?: string | string[]) {
        super(message);
        this.statusCode = code;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(resourceName: string, errorCode?: string | string[]) {
        super(`${resourceName} not found`, 404, errorCode);
    }
}

export class BadRequestError extends AppError {
    constructor(
        message: string = 'Bad request!',
        errorCode?: string | string[],
    ) {
        super(message, 400, errorCode);
    }
}
export class ConflictError extends AppError {
    constructor(
        message: string = 'Resource already exists',
        errorCode?: string | string[],
    ) {
        super(message, 409, errorCode);
    }
}
export class ValidationError extends AppError {
    constructor(errorCode: string[]) {
        super(`Validation error`, 422, errorCode);
    }
}
export class AuthenticationError extends AppError {
    constructor(message: string, errorCode?: string | string[]) {
        super(`Authentication error: ${message}`, 401, errorCode);
    }
}
export class ForbiddenError extends AppError {
    constructor(message: string, errorCode?: string | string[]) {
        super(`Forbidden error: ${message}`, 403, errorCode);
    }
}
export enum PrismaErrors {
    NOT_FOUND = 'P2025',
    CONFLICT = 'P2002',
}

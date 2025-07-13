export class AppError extends Error {
    public readonly statusCode: number;
    public readonly errorCode?: string;
    constructor(message: string, code: number, errorCode?: string) {
        super(message);
        this.statusCode = code;
        this.errorCode = errorCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class NotFoundError extends AppError {
    constructor(resourceName: string) {
        super(`${resourceName} not found`, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request!') {
        super(message, 400);
    }
}
export class ConflictError extends AppError {
    constructor(message: string = 'Resource already exists') {
        super(message, 409);
    }
}
export class ValidationError extends AppError {
    constructor(message: string) {
        super(`Validation error: ${message}`, 422);
    }
}
export class AuthenticationError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(`Authentication error: ${message}`, 401, errorCode);
    }
}
export class ForbiddenError extends AppError {
    constructor(message: string, errorCode?: string) {
        super(`Forbidden error: ${message}`, 403, errorCode);
    }
}
export enum PrismaErrors {
    NOT_FOUND = 'P2025',
    CONFLICT = 'P2002',
}

import { Prisma } from '@prisma/client';
import { PrismaErrors } from '@errors';

type ErrorMap = {
    [key in PrismaErrors]?: Error;
};

export async function handlePrismaError<T>(
    prismaPromise: Promise<T>,
    errorMap: ErrorMap = {},
): Promise<T> {
    try {
        return await prismaPromise;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            const customError = errorMap[error.code as PrismaErrors];
            if (customError) {
                throw customError;
            }
        }
        throw error;
    }
}

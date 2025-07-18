import { pagination } from 'prisma-extension-pagination';
import { PrismaClient as PC } from '../generated/prisma';

export const PrismaClient = new PC().$extends(
    pagination({
        pages: {
            includePageCount: true,
        },
    }),
);

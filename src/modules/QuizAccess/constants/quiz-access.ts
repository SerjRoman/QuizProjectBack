import { Prisma } from '#prisma-types';
import { EnumQuizAccessType } from '../types';

export const QUIZ_ACCESS_TYPE: EnumQuizAccessType[] = [
    'OWNER',
    'EDITOR',
    'VIEWER',
];

export const QUIZ_ACCESS_WITH_USER_INLCUDE =
    Prisma.validator<Prisma.QuizAccessDefaultArgs>()({
        include: {
            profile: {
                select: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatar: true,
                        },
                    },
                },
            },
        },
    }).include

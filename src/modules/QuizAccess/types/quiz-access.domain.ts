import { $Enums, Prisma, QuizAccess as PrismaQuizAccess } from '#prisma/prisma';

export type QuizAccessUncheckedCreateInput =
    Prisma.QuizAccessUncheckedCreateInput;
export type QuizAccessCreateInput = Prisma.QuizAccessCreateInput;

export type QuizAccess = PrismaQuizAccess;
export type QuizAccessWithSelect<S extends QuizAccessSelect> =
    Prisma.QuizAccessGetPayload<{ select: S }>;
export type QuizAccessWithInclude<I extends QuizAccessInclude> =
    Prisma.QuizAccessGetPayload<{ include: I }>;

export type QuizAccessesWithUser = Prisma.QuizAccessGetPayload<{
    include: {
        profile: {
            select: {
                user: {
                    select: {
                        id: true;
                        firstName: true;
                        lastName: true;
                        avatar: true;
                    };
                };
            };
        };
    };
}>;
export type EnumQuizAccessType = $Enums.QuizAccessType;
export type UpdateQuizAccess = Prisma.QuizAccessUpdateInput;
export type QuizAccessWhere = Prisma.QuizAccessWhereInput;
export type QuizAccessUniqueWhere = Prisma.QuizAccessWhereUniqueInput;
export type QuizAccessSelect = Prisma.QuizAccessSelect;
export type QuizAccessInclude = Prisma.QuizAccessInclude;

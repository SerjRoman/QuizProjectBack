import {
    Prisma,
    Quiz as QuizPrisma,
    QuizStatus as QuizStatusPrisma,
} from '#prisma/prisma';

export type Quiz = QuizPrisma;

export type QuizUpdateInput = Prisma.QuizUncheckedUpdateInput;

export type QuizCreateInput = Prisma.QuizUncheckedCreateInput;

export type QuizStatus = QuizStatusPrisma;

export type QuizInclude = Prisma.QuizInclude;
export type QuizOmit = Prisma.QuizOmit;
export type QuizWhereUnique = Prisma.QuizWhereUniqueInput;
export type QuizWhere = Prisma.QuizWhereInput;
export type QuizSelect = Prisma.QuizSelect;

export type QuizWithInclude<I extends QuizInclude = object> =
    Prisma.QuizGetPayload<{
        include: I;
    }>;

export type QuizWithOmit<O extends QuizOmit = object> = Prisma.QuizGetPayload<{
    omit: O;
}>;

export type QuizWithArgs<
    I extends QuizInclude = object,
    O extends QuizOmit = object,
> = Prisma.QuizGetPayload<{ omit: O; include: I }>;
export type QuizWithSelect<S extends QuizSelect = object> =
    Prisma.QuizGetPayload<{ select: S }>;

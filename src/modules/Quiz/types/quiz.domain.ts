import {
    Prisma,
    Quiz as QuizPrisma,
    QuizStatus as QuizStatusPrisma,
    QuizVisibility as QuizVisibilityPrisma,
} from '#prisma/prisma';

export type Quiz = QuizPrisma;

export type QuizUpdateInput = Prisma.QuizUncheckedUpdateInput;

export type QuizUncheckedCreateInput = Prisma.QuizUncheckedCreateInput;
export type QuizCreateInput = Prisma.QuizCreateInput;

export type QuizStatus = QuizStatusPrisma;
export type QuizVisibility = QuizVisibilityPrisma;

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

export type QuizAccessedToSelect = {
    accesses: {
        include: {
            profile: {
                select: {
                    user: {
                        select: {
                            firstName: true;
                            lastName: true;
                            id: true;
                            avatar: true;
                        };
                    };
                };
            };
        };
    };
    ownedById: true;
};

export type QuizAccesses = QuizWithSelect<QuizAccessedToSelect>;
export type QuizOrderBy = Prisma.QuizOrderByWithRelationInput;

export type SortOptions = {
    field: 'title' | 'createdAt';
    order: 'desc' | 'asc';
};

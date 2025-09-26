import { AuthControllerContract, AuthRequest, TeacherResponse } from '#types';
import { InferType } from 'yup';
import {
    EnumQuizAccessType,
    QuizAccess,
    QuizAccessesWithUser,
    QuizAccessUncheckedCreateInput,
    UpdateQuizAccess,
    QuizAccessWhere,
    QuizAccessSelect,
    QuizAccessUniqueWhere,
    QuizAccessWithSelect,
    QuizAccessInclude,
    QuizAccessWithInclude,
} from './quiz-access.domain';
import { QuizAccessSchema } from '../quiz-access.schema';

export interface QuizAccessControllerContract {
    getAllByQuizId: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizAccessSchema.getQuizAccessesByQuiz>['params']
        >,
        TeacherResponse<QuizAccessesWithUser[]>
    >;
    create: AuthControllerContract<
        AuthRequest<
            object,
            object,
            InferType<typeof QuizAccessSchema.createQuizAccess>['body']
        >,
        TeacherResponse<QuizAccess>
    >;
    delete: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizAccessSchema.deleteQuizAccess>['params']
        >,
        TeacherResponse<QuizAccess>
    >;
    updateAccessType: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizAccessSchema.updateQuizAccess>['params'],
            object,
            InferType<typeof QuizAccessSchema.updateQuizAccess>['body']
        >,
        TeacherResponse<QuizAccess>
    >;
}
export type CanEditAccessByIdDto = { id: string; teacherId: string };
export type CanEditAccessByQuizIdDto = { quizId: string; teacherId: string };
export type DeleteAccessDto = { id: string };
export type UpdateAccessTypeDto = {
    id: string;
    accessType: EnumQuizAccessType;
};
export type CreateAccessDto = {
    quizId: string;
    teacherUsername: string;
    accessType: EnumQuizAccessType;
};
export type GetAllByQuizIdDto = { quizId: string };

export interface QuizAccessServiceContract {
    canEditAccessById: (dto: CanEditAccessByIdDto) => Promise<boolean>;
    canEditAccessByQuizId: (dto: CanEditAccessByQuizIdDto) => Promise<boolean>;
    delete: (dto: DeleteAccessDto) => Promise<QuizAccess>;
    updateAccessType: (dto: UpdateAccessTypeDto) => Promise<QuizAccess>;
    create: (dto: CreateAccessDto) => Promise<QuizAccess>;
    getAllByQuizId: (dto: GetAllByQuizIdDto) => Promise<QuizAccessesWithUser[]>;
}

export interface QuizAccessRepositoryContract {
    create: (data: QuizAccessUncheckedCreateInput) => Promise<QuizAccess>;
    getAll: {
        (params: { where: QuizAccessWhere }): Promise<QuizAccess[]>; // Эта сигнатура остается
        <S extends QuizAccessSelect>(params: {
            where: QuizAccessWhere;
            select: S;
        }): Promise<QuizAccessWithSelect<S>[]>;
        <I extends QuizAccessInclude>(params: {
            where: QuizAccessWhere;
            include: I;
        }): Promise<QuizAccessWithInclude<I>[]>;
    };
    get: {
        (params: { where: QuizAccessUniqueWhere }): Promise<QuizAccess>;
        <S extends QuizAccessSelect>(params: {
            where: QuizAccessUniqueWhere;
            select: S;
        }): Promise<QuizAccessWithSelect<S>>;
        <I extends QuizAccessInclude>(params: {
            where: QuizAccessUniqueWhere;
            include: I;
        }): Promise<QuizAccessWithInclude<I>>;
    };
    delete: (where: QuizAccessUniqueWhere) => Promise<QuizAccess>;
    update: (
        where: QuizAccessUniqueWhere,
        data: UpdateQuizAccess,
    ) => Promise<QuizAccess>;
}

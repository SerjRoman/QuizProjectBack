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

export interface QuizAccessServiceContract {
    canEditAccessByQuizId: (
        quizId: string,
        teacherId: string,
    ) => Promise<boolean>;
    canEditAccessById: (id: string, teacherId: string) => Promise<boolean>;
    create: (data: {
        quizId: string;
        teacherUsername: string;
        accessType: EnumQuizAccessType;
    }) => Promise<QuizAccess>;
    getAllByQuizId: (quizId: string) => Promise<QuizAccessesWithUser[]>;
    delete: (id: string) => Promise<QuizAccess>;
    updateAccessType: (
        id: string,
        accessType: EnumQuizAccessType,
    ) => Promise<QuizAccess>;
}
export interface QuizAccessRepositoryContract {
    create: (data: QuizAccessUncheckedCreateInput) => Promise<QuizAccess>;
    getAll: {
        (params: { where: QuizAccessWhere }): Promise<QuizAccess[]>;
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

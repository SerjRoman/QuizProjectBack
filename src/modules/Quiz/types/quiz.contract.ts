import { AuthRequest, AuthResponse, AuthControllerContract } from '#types';
import { InferType } from 'yup';
import { QuizSchema } from '../quiz.schema';
import {
    Quiz,
    QuizAccessedTo,
    QuizCreateInput,
    QuizSelect,
    QuizUpdateInput,
    QuizWhere,
    QuizWhereUnique,
    QuizWithSelect,
} from './quiz.domain';

type CommonTeacherRequest = AuthControllerContract<
    AuthRequest<
        object,
        object,
        object,
        InferType<typeof QuizSchema.getAll>['query']
    >,
    AuthResponse<QuizWithSelect[] | Quiz[]>
>;

type GetAllServiceParams = {
    select: QuizSelect;
    limit?: number;
    offset?: number;
    filters?: {
        tags?: string[] | undefined;
        languages?: string[] | undefined;
        subject?: string | undefined;
    };
    where?: QuizWhere;
    userId?: string;
};

export interface IQuizController {
    teacherMy: CommonTeacherRequest;
    teacherMyCopied: CommonTeacherRequest;
    teacherMyFavourite: CommonTeacherRequest;
    teacherMyCreated: CommonTeacherRequest;
    getById: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizSchema.getById>['params'],
            object,
            object,
            InferType<typeof QuizSchema.getById>['query']
        >,
        AuthResponse<QuizWithSelect | Quiz>
    >;
    delete: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.delete>>['params'],
        AuthResponse<void>
    >;
    create: AuthControllerContract<
        AuthRequest<
            object,
            QuizCreateInput,
            InferType<typeof QuizSchema.create>['body']
        >,
        AuthResponse<QuizCreateInput>
    >;
    handleTeacherQuizRequest: AuthControllerContract<
        AuthRequest<
            object,
            object,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        AuthResponse<QuizWithSelect[] | Quiz[]>,
        { prismaWhereClause: QuizWhere }
    >;
    addToFavourites: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.updateFavourite>['params']>,
        AuthResponse<void>
    >;
    removeFromFavourites: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.deleteFavourite>['params']>,
        AuthResponse<void>
    >;
    getAccessesToQuiz: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.getAccessesToQuiz>['params']>,
        AuthResponse<QuizAccessedTo>
    >;
    giveAccessToQuiz: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizSchema.updateAccess>['params'],
            object,
            InferType<typeof QuizSchema.updateAccess>['body']
        >,
        AuthResponse<void>
    >;
    removeAccessToQuiz: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizSchema.deleteAccess>['params'],
            object,
            InferType<typeof QuizSchema.deleteAccess>['body']
        >,
        AuthResponse<void>
    >;
}

export interface IQuizService {
    getAllTeacher: (params: GetAllServiceParams) => Promise<QuizWithSelect[]>;
    getById: (id: string, select: QuizSelect) => Promise<QuizWithSelect>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    updateFavourite: (userId: string, quizId: string) => Promise<Quiz>;
    deleteFavourite: (userId: string, quizId: string) => Promise<Quiz>;
    getAccessesToQuiz: (
        userId: string,
        quizId: string,
    ) => Promise<QuizAccessedTo>;
    updateAccess: (
        userId: string,
        quizId: string,
        username: string,
    ) => Promise<Quiz>;
    deleteAccess: (userId: string, quizId: string, id: string) => Promise<Quiz>;
}

export interface IQuizRepository {
    getAllWithSelect: {
        <S extends QuizSelect>(
            select?: S,
            limit?: number,
            offset?: number,
            where?: QuizWhere,
        ): Promise<QuizWithSelect<S>[]>;
        (limit?: number, offset?: number, where?: QuizWhere): Promise<Quiz[]>;
    };
    get: {
        <S extends QuizSelect>(
            where: QuizWhereUnique,
            select?: QuizSelect,
        ): Promise<QuizWithSelect<S>>;
        (where: QuizWhereUnique): Promise<Quiz>;
    };
    delete: (where: QuizWhereUnique) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    update: (where: QuizWhereUnique, data: QuizUpdateInput) => Promise<Quiz>;
}

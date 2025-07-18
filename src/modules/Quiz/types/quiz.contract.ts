import {
    AuthRequest,
    AuthResponse,
    AuthControllerContract,
    PaginationType,
    PaginatedResult,
    PaginationData,
} from '#types';
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
    AuthResponse<{ data: QuizWithSelect[] | Quiz[]; meta?: PaginationData }>
>;

type GetAllServiceParams = {
    select: QuizSelect;
    filters?: {
        tags?: string[];
        languages?: string[];
        subject?: string;
        search?: string;
    };
    where?: QuizWhere;
    pagination?: PaginationType;
    userId?: string;
};

export interface IQuizController {
    teacherMy: CommonTeacherRequest;
    teacherMyCopied: CommonTeacherRequest;
    teacherMyFavourite: CommonTeacherRequest;
    teacherMyCreated: CommonTeacherRequest;
    teacherMyAccessed: CommonTeacherRequest;
    copyQuiz: AuthControllerContract<
        AuthRequest<
            object,
            object,
            InferType<typeof QuizSchema.copyQuiz>['body']
        >,
        AuthResponse<Quiz>
    >;
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
        AuthResponse<{
            data: QuizWithSelect[] | Quiz[];
            meta?: PaginationData;
        }>,
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
    getAllTeacher: (
        params: GetAllServiceParams,
    ) => Promise<{ data: QuizWithSelect[] | Quiz[]; meta?: PaginationData }>;
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
    copyQuiz: (userId: string, quizId: string) => Promise<Quiz>;
}

export interface IQuizRepository {
    getAllWithSelect: {
        <S extends QuizSelect>(
            select?: S,
            where?: QuizWhere,
        ): Promise<QuizWithSelect<S>[]>;
        (where?: QuizWhere): Promise<Quiz[]>;
    };
    getAllWithPagination: {
        <S extends QuizSelect>(
            pagination: PaginationType,
            select?: S,
            where?: QuizWhere,
        ): Promise<PaginatedResult<QuizWithSelect<S>[]>>;
    };
    get: {
        (where: QuizWhereUnique): Promise<Quiz>;
        <S extends QuizSelect>(
            where: QuizWhereUnique,
            select?: QuizSelect,
        ): Promise<QuizWithSelect<S>>;
    };
    delete: (where: QuizWhereUnique) => Promise<Quiz>;
    create: (data: QuizCreateInput) => Promise<Quiz>;
    update: (where: QuizWhereUnique, data: QuizUpdateInput) => Promise<Quiz>;
}

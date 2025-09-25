import {
    AuthRequest,
    TeacherResponse,
    AuthControllerContract,
    PaginationType,
    PaginatedResult,
    PaginationData,
} from '#types';
import { InferType } from 'yup';
import { QuizSchema } from '../quiz.schema';
import {
    Quiz,
    QuizOrderBy,
    QuizSelect,
    QuizUpdateInput,
    QuizWhere,
    QuizWhereUnique,
    QuizWithSelect,
    QuizUncheckedCreateInput,
    SortOptions,
} from './quiz.domain';

type CommonTeacherRequest = (
    req: AuthRequest<
        object,
        object,
        object,
        InferType<typeof QuizSchema.getAll>['query']
    >,
    res: TeacherResponse<{
        data: QuizWithSelect[] | Quiz[];
        meta?: PaginationData;
    }>,
) => void;

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
    sort?: SortOptions;
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
        TeacherResponse<Quiz>
    >;
    getById: AuthControllerContract<
        AuthRequest<
            InferType<typeof QuizSchema.getById>['params'],
            object,
            object,
            InferType<typeof QuizSchema.getById>['query']
        >,
        TeacherResponse<QuizWithSelect | Quiz>
    >;
    delete: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.delete>>['params'],
        TeacherResponse<void>
    >;
    create: AuthControllerContract<
        AuthRequest<object, Quiz, InferType<typeof QuizSchema.create>['body']>,
        TeacherResponse<QuizUncheckedCreateInput>
    >;
    handleTeacherQuizRequest: (
        req: AuthRequest<
            object,
            object,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        res: TeacherResponse<{
            data: QuizWithSelect[] | Quiz[];
            meta?: PaginationData;
        }>,
        prismaWhereClause: QuizWhere,
    ) => void;
    addToFavourites: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.updateFavourite>['params']>,
        TeacherResponse<void>
    >;
    removeFromFavourites: AuthControllerContract<
        AuthRequest<InferType<typeof QuizSchema.deleteFavourite>['params']>,
        TeacherResponse<void>
    >;
}

export interface IQuizService {
    getAllTeacher: (
        params: GetAllServiceParams,
    ) => Promise<{ data: QuizWithSelect[] | Quiz[]; meta?: PaginationData }>;
    getById: (id: string, select: QuizSelect) => Promise<QuizWithSelect>;
    delete: (id: string) => Promise<Quiz>;
    create: (data: QuizUncheckedCreateInput) => Promise<Quiz>;
    updateFavourite: (userId: string, quizId: string) => Promise<Quiz>;
    deleteFavourite: (userId: string, quizId: string) => Promise<Quiz>;
    copyQuiz: (userId: string, quizId: string) => Promise<Quiz>;
}

export interface IQuizRepository {
    getAllWithSelect: {
        <S extends QuizSelect>(
            select?: S,
            where?: QuizWhere,
            orderBy?: QuizOrderBy,
        ): Promise<QuizWithSelect<S>[]>;
        (where?: QuizWhere, orderBy?: QuizOrderBy): Promise<Quiz[]>;
    };
    getAllWithPagination: <S extends QuizSelect>(
        pagination: PaginationType,
        select?: S,
        where?: QuizWhere,
        orderBy?: QuizOrderBy,
    ) => Promise<PaginatedResult<QuizWithSelect<S>[]>>;
    get: {
        (where: QuizWhereUnique): Promise<Quiz>;
        <S extends QuizSelect>(
            where: QuizWhereUnique,
            select?: QuizSelect,
        ): Promise<QuizWithSelect<S>>;
    };
    delete: (where: QuizWhereUnique) => Promise<Quiz>;
    create: (data: QuizUncheckedCreateInput) => Promise<Quiz>;
    update: (where: QuizWhereUnique, data: QuizUpdateInput) => Promise<Quiz>;
}

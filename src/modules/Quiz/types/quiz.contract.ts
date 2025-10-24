import {
    AuthRequest,
    TeacherResponse,
    AuthControllerContract,
    PaginationParams,
    PaginatedResult,
    PaginationData,
} from '#types';
import { InferType } from 'yup';
import { QuizSchema } from '../quiz.schema';
import {
    Quiz,
    QuizSelect,
    QuizUpdateInput,
    QuizWhere,
    QuizWhereUnique,
    QuizWithSelect,
    QuizUncheckedCreateInput,
    QuizInclude,
    QuizWithInclude,
    QuizFindManyArgs,
} from './quiz.domain';
import {
    GetAllTeacherQuizzesDto,
    GetQuizByIdDto,
    DeleteQuizDto,
    CreateQuizDto,
    UpdateFavouriteDto,
    CopyQuizDto,
    UploadImageDto,
} from './quiz.dto';

type GetAllTeacherQuizzesResponse =
    | {
          data: QuizWithSelect[] | Quiz[];
          meta?: PaginationData;
      }
    | Quiz[];
type CommonTeacherRequest = (
    req: AuthRequest<
        object,
        GetAllTeacherQuizzesResponse,
        object,
        InferType<typeof QuizSchema.getAll>['query']
    >,
    res: TeacherResponse<GetAllTeacherQuizzesResponse>,
) => void;

export type GetQuizUploadUrl = {
    signature: string;
    timestamp: string;
    apiKey: string;
    uploadUrl: string;
    cloudName: string;
    folder: string;
    public_id: string;
    transformation: string;
};
export interface QuizControllerContract {
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
            GetAllTeacherQuizzesResponse,
            object,
            InferType<typeof QuizSchema.getAll>['query']
        >,
        res: TeacherResponse<GetAllTeacherQuizzesResponse>,
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
    uploadImage: AuthControllerContract<
        AuthRequest<
            object,
            GetQuizUploadUrl,
            InferType<typeof QuizSchema.uploadImage>['body']
        >,
        TeacherResponse<GetQuizUploadUrl>
    >;
}

export interface QuizServiceContract {
    getAllTeacher: (
        dto: GetAllTeacherQuizzesDto,
    ) => Promise<{ data: Quiz[] | QuizWithSelect[]; meta?: PaginationData }>;
    getById: (dto: GetQuizByIdDto) => Promise<Quiz>;
    delete: (dto: DeleteQuizDto) => Promise<Quiz>;
    create: (dto: CreateQuizDto) => Promise<Quiz>;
    updateFavourite: (dto: UpdateFavouriteDto) => Promise<Quiz>;
    deleteFavourite: (dto: UpdateFavouriteDto) => Promise<Quiz>;
    copyQuiz: (dto: CopyQuizDto) => Promise<Quiz>;
    uploadImage: (dto: UploadImageDto) => Promise<GetQuizUploadUrl>;
}

export interface QuizRepositoryContract {
    create: (data: QuizUncheckedCreateInput) => Promise<Quiz>;
    delete: (where: QuizWhereUnique) => Promise<Quiz>;
    update: (where: QuizWhereUnique, data: QuizUpdateInput) => Promise<Quiz>;

    get: {
        (params: { where: QuizWhereUnique }): Promise<Quiz>;
        <S extends QuizSelect>(params: {
            where: QuizWhereUnique;
            select?: S;
        }): Promise<QuizWithSelect<S>>;
        <I extends QuizInclude>(params: {
            where: QuizWhereUnique;
            include?: I;
        }): Promise<QuizWithInclude<I>>;
    };

    getAll: {
        (params?: QuizFindManyArgs): Promise<Quiz[]>;

        <S extends QuizSelect>(
            params: QuizFindManyArgs & { pagination: PaginationParams },
        ): Promise<PaginatedResult<QuizWithSelect<S>[]>>;
        <S extends QuizSelect>(
            params: QuizFindManyArgs,
        ): Promise<QuizWithSelect<S>[]>;
        <I extends QuizInclude>(
            params: QuizFindManyArgs,
        ): Promise<QuizWithInclude<I>[]>;
    };
}

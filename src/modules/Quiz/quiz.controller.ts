import { arrayToBooleanObject } from '@utils';
import { QuizService } from './quiz.service';
import type { QuizUncheckedCreateInput, QuizWhere } from './types';
import type { QuizControllerContract } from './types';
import { GetAllTeacherQuizzesDto } from './types/quiz.dto';

export const QuizController: QuizControllerContract = {
    handleTeacherQuizRequest: async function (req, res, prismaWhereClause) {
        const { query } = req;
        const select = arrayToBooleanObject(query?.select);
        const perPage = query?.perPage ? Number(query.perPage) : undefined;
        const page = query?.page ? Number(query.page) : undefined;
        const pagination = perPage && page ? { perPage, page } : undefined;
        const sort = query?.sort;

        const commonFilters = {
            tags: query?.tags,
            languages: query?.languages,
            subject: query?.subject,
            search: query?.search,
            visibility: query?.visibility,
            status: query?.status,
        };

        const dto: GetAllTeacherQuizzesDto = {
            userId: res.locals.userId,
            pagination: pagination,
            filters: commonFilters,
            sort: sort,
            where: prismaWhereClause,
            select: select,
        };
        const result = await QuizService.getAllTeacher(dto);
        res.status(200).json(result);
    },
    getById: async function (req, res) {
        const id = req.params.id;
        const select = arrayToBooleanObject(req.query?.select);
        res.status(200).json(await QuizService.getById({ id, select }));
    },
    create: async function (req, res) {
        const data: QuizUncheckedCreateInput = {
            ...req.body,
            createdById: res.locals.teacherId,
            ownedById: res.locals.teacherId,
        };
        res.status(201).json(await QuizService.create(data));
    },
    delete: async function (req, res) {
        await QuizService.delete({
            id: req.params.id,
            teacherId: res.locals.teacherId,
        });
        res.status(204).json();
    },
    teacherMy: async function (req, res) {
        const prismaWhereClause: QuizWhere = {
            OR: [
                {
                    ownedBy: { id: res.locals.teacherId },
                },
                { accesses: { some: { profileId: res.locals.teacherId } } },
            ],
        };
        QuizController.handleTeacherQuizRequest(req, res, prismaWhereClause);
    },
    teacherMyCopied: async function (req, res) {
        const prismaWhereClause: QuizWhere = {
            AND: [
                {
                    ownedBy: { id: res.locals.teacherId },
                    originalQuizId: { not: null },
                },
            ],
        };
        QuizController.handleTeacherQuizRequest(req, res, prismaWhereClause);
    },
    teacherMyCreated: async function (req, res) {
        const prismaWhereClause: QuizWhere = {
            createdBy: { id: res.locals.teacherId },
        };
        QuizController.handleTeacherQuizRequest(req, res, prismaWhereClause);
    },
    teacherMyFavourite: async function (req, res) {
        const prismaWhereClause = {
            favouritedBy: { some: { id: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, prismaWhereClause);
    },
    teacherMyAccessed: async function (req, res) {
        const prismaWhereClause: QuizWhere = {
            accesses: { some: { profileId: res.locals.teacherId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, prismaWhereClause);
    },
    addToFavourites: async function (req, res) {
        const result = await QuizService.updateFavourite({
            userId: res.locals.userId,
            quizId: req.params.id,
        });
        if (result) {
            res.status(204).json();
        }
    },
    removeFromFavourites: async function (req, res) {
        const result = await QuizService.deleteFavourite({
            userId: res.locals.userId,
            quizId: req.params.id,
        });
        if (result) {
            res.status(204).json();
        }
    },
    copyQuiz: async function (req, res) {
        res.status(201).json(
            await QuizService.copyQuiz({
                userId: res.locals.userId,
                quizId: req.body.id,
            }),
        );
    },
    uploadImage: async function (req, res) {
        const imageType = req.body.fileType;
        const assignedUrl = await QuizService.uploadImage({ imageType });
        res.status(200).json(assignedUrl);
    },
};

import { arrayToBooleanObject } from '@utils';
import { QuizService } from './quiz.service';
import type { QuizCreateInput, QuizWhere } from './types/quiz.domain';
import type { IQuizController } from './types/quiz.contract';

export const QuizController: IQuizController = {
    handleTeacherQuizRequest: async function (
        req,
        res,
        next,
        { prismaWhereClause },
    ) {
        try {
            const { query } = req;

            const select = arrayToBooleanObject(query?.select);
            const limit = query?.limit ? Number(query.limit) : undefined;
            const offset = query?.offset ? Number(query.offset) : undefined;
            const commonFilters = {
                tags: query?.tags,
                languages: query?.languages,
                subject: query?.subject,
            };
            const params = {
                select,
                limit,
                offset,
                filters: commonFilters,
                where: prismaWhereClause,
            };

            const quizzes = await QuizService.getAllTeacher(params);
            res.status(200).json(quizzes);
        } catch (error) {
            next(error);
        }
    },
    getById: async function (req, res, next) {
        try {
            const id = req.params.id;
            const select = arrayToBooleanObject(req.query?.select);
            res.status(200).json(await QuizService.getById(id, select));
        } catch (e) {
            next(e);
        }
    },
    create: async function (req, res, next) {
        try {
            const data: QuizCreateInput = {
                ...req.body,
                createdById: res.locals.userId,
            };
            res.status(201).json(await QuizService.create(data));
        } catch (error) {
            next(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            await QuizService.delete(req.params.id);
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    },
    teacherMy: async function (req, res, next) {
        const prismaWhereClause: QuizWhere = {
            OR: [
                {
                    copiedBy: {
                        some: {
                            userId: res.locals.userId,
                        },
                    },
                },
                { createdBy: { userId: res.locals.userId } },
                { accessedTo: { some: { userId: res.locals.userId } } },
            ],
        };
        QuizController.handleTeacherQuizRequest(req, res, next, {
            prismaWhereClause,
        });
    },
    teacherMyCopied: async function (req, res, next) {
        const prismaWhereClause = {
            copiedBy: { some: { userId: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, next, {
            prismaWhereClause,
        });
    },
    teacherMyCreated: async function (req, res, next) {
        const prismaWhereClause = { createdBy: { userId: res.locals.userId } };
        QuizController.handleTeacherQuizRequest(req, res, next, {
            prismaWhereClause,
        });
    },
    teacherMyFavourite: async function (req, res, next) {
        const prismaWhereClause = {
            favouritedBy: { some: { id: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, next, {
            prismaWhereClause,
        });
    },
    teacherMyAccessed: async function (req, res, next) {
        const prismaWhereClause = {
            accessedTo: { some: { userId: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, next, {
            prismaWhereClause,
        });
    },
    addToFavourites: async function (req, res, next) {
        try {
            const result = await QuizService.updateFavourite(
                res.locals.userId,
                req.params.id,
            );
            if (result) {
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    },
    removeFromFavourites: async function (req, res, next) {
        try {
            const result = await QuizService.deleteFavourite(
                res.locals.userId,
                req.params.id,
            );
            if (result) {
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    },
    getAccessesToQuiz: async function (req, res, next) {
        try {
            const accesses = await QuizService.getAccessesToQuiz(
                res.locals.userId,
                req.params.id,
            );
            res.status(200).json(accesses);
        } catch (error) {
            next(error);
        }
    },
    removeAccessToQuiz: async function (req, res, next) {
        try {
            await QuizService.deleteAccess(
                res.locals.userId,
                req.params.id,
                req.body.userId,
            );
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    },
    giveAccessToQuiz: async function (req, res, next) {
        try {
            await QuizService.updateAccess(
                res.locals.userId,
                req.params.id,
                req.body.username,
            );
            res.status(204).json();
        } catch (error) {
            next(error);
        }
    },
    copyQuiz: async function (req, res, next) {
        try {
            res.status(201).json(
                await QuizService.copyQuiz(res.locals.userId, req.body.id),
            );
        } catch (error) {
            next(error);
        }
    },
};

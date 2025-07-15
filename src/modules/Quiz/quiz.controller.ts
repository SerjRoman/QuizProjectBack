import { arrayToBooleanObject } from '@utils';
import { QuizService } from './quiz.service';
import type {
    IQuizController,
    QuizCreateInput,
    QuizInclude,
    QuizOmit,
    QuizSelect,
} from './quiz.types';

export const QuizController: IQuizController = {
    handleTeacherQuizRequest: async function (
        req,
        res,
        next,
        prismaWhereClause,
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

            const quizzes = await QuizService.getAllWithSelect(
                select,
                limit,
                offset,
                commonFilters,
                prismaWhereClause,
            );

            res.status(200).json(quizzes);
        } catch (error) {
            next(error);
        }
    },
    getAll: async function (req, res, next) {
        try {
            const query = req.query;

            const include: QuizInclude = arrayToBooleanObject(
                req.query?.include,
            );
            const omit: QuizOmit = arrayToBooleanObject(req.query?.omit);
            const select: QuizSelect = arrayToBooleanObject(req.query?.select);

            const limit: number | undefined = query?.limit;
            const offset: number | undefined = query?.offset;

            if (select) {
                res.status(200).json(
                    await QuizService.getAllWithSelect(select, limit, offset, {
                        tags: req.query?.tags,
                        languages: req.query?.languages,
                        subject: req.query?.subject,
                    }),
                );
                return;
            }
            res.status(200).json(
                await QuizService.getAll(include, omit, limit, offset, {
                    tags: req.query?.tags,
                    languages: req.query?.languages,
                    subject: req.query?.subject,
                }),
            );
        } catch (e) {
            next(e);
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
            res.status(204).json(await QuizService.delete(req.params.id));
        } catch (error) {
            next(error);
        }
    },
    teacherMy: async function (req, res, next) {
        const whereClause = {
            OR: [
                {
                    copiedBy: {
                        some: {
                            userId: res.locals.userId,
                        },
                    },
                },
                { createdBy: { userId: res.locals.userId } },
            ],
        };
        QuizController.handleTeacherQuizRequest(req, res, next, whereClause);
    },
    teacherMyCopied: async function (req, res, next) {
        const whereClause = {
            copiedBy: { some: { userId: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, next, whereClause);
    },
    teacherMyCreated: async function (req, res, next) {
        const whereClause = { createdBy: { userId: res.locals.userId } };
        QuizController.handleTeacherQuizRequest(req, res, next, whereClause);
    },
    teacherMyFavourite: async function (req, res, next) {
        const whereClause = {
            favouritedBy: { some: { id: res.locals.userId } },
        };
        QuizController.handleTeacherQuizRequest(req, res, next, whereClause);
    },
};

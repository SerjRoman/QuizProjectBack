import { arrayToBooleanObject } from '@src/utils/array-to-boolean-object';
import { QuizService } from './quiz.service';
import type {
    IQuizController,
    QuizCreateInput,
    QuizInclude,
    QuizOmit,
    QuizSelect,
} from './quiz.types';

export const QuizController: IQuizController = {
    getAll: async function (req, res, next) {
        console.log(req.query);
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
            const include: QuizInclude = {};
            const omit: QuizOmit = {};
            const id = req.params.id;
            const query = req.query;
            if (query) {
                if (query.include) {
                    query.include.forEach((q) => {
                        include[q] = true;
                    });
                }
                if (query.omit) {
                    query.omit.forEach((q) => {
                        omit[q] = true;
                    });
                }
            }
            res.status(200).json(await QuizService.getById(id, include, omit));
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
        try {
            const query = req.query;

            const select: QuizSelect = arrayToBooleanObject(req.query?.select);
            const limit: number | undefined = query?.limit;
            const offset: number | undefined = query?.offset;
            const filters = {
                tags: req.query?.tags,
                languages: req.query?.languages,
                subject: req.query?.subject,
            };
            res.status(200).json(
                await QuizService.getAllWithSelect(
                    select,
                    limit,
                    offset,
                    filters,
                    {
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
                    },
                ),
            );
        } catch (error) {
            next(error);
        }
    },
    teacherMyCopied: async function (req, res, next) {
        try {
            const query = req.query;

            const select: QuizSelect = arrayToBooleanObject(req.query?.select);
            const limit: number | undefined = query?.limit;
            const offset: number | undefined = query?.offset;
            const filters = {
                tags: req.query?.tags,
                languages: req.query?.languages,
                subject: req.query?.subject,
            };
            res.status(200).json(
                await QuizService.getAllWithSelect(
                    select,
                    limit,
                    offset,
                    filters,
                    { copiedBy: { every: { userId: res.locals.userId } } },
                ),
            );
        } catch (error) {
            next(error);
        }
    },
    teacherMyCreated: async function (req, res, next) {
        try {
            const query = req.query;

            const select: QuizSelect = arrayToBooleanObject(req.query?.select);
            const limit: number | undefined = query?.limit;
            const offset: number | undefined = query?.offset;
            const filters = {
                tags: req.query?.tags,
                languages: req.query?.languages,
                subject: req.query?.subject,
            };
            res.status(200).json(
                await QuizService.getAllWithSelect(
                    select,
                    limit,
                    offset,
                    filters,
                    { createdBy: { userId: res.locals.userId } },
                ),
            );
        } catch (error) {
            next(error);
        }
    },
    teacherMyFavourite: async function (req, res, next) {
        try {
            const query = req.query;

            const select: QuizSelect = arrayToBooleanObject(req.query?.select);
            const limit: number | undefined = query?.limit;
            const offset: number | undefined = query?.offset;
            const filters = {
                tags: req.query?.tags,
                languages: req.query?.languages,
                subject: req.query?.subject,
            };
            res.status(200).json(
                await QuizService.getAllWithSelect(
                    select,
                    limit,
                    offset,
                    filters,
                    { favouritedBy: { every: { id: res.locals.userId } } },
                ),
            );
        } catch (error) {
            next(error);
        }
    },
};

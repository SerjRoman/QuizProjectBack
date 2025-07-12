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
            const include: QuizInclude = {};
            const omit: QuizOmit = {};
            const select: QuizSelect = {};
            const query = req.query;
            let limit: number | undefined;
            let offset: number | undefined;
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
                if (query.select) {
                    query.select.forEach((q) => {
                        select[q] = true;
                    });
                }

                if (query.limit) {
                    limit = query.limit;
                }
                if (query.offset) {
                    offset = query.offset;
                }
            }
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
};

import { QuizService } from './quiz.service';
import type { IQuizController, QuizInclude, QuizOmit } from './quiz.types';

export const QuizController: IQuizController = {
    getAll: async function (req, res, next) {
        try {
            const include: QuizInclude = {};
            const omit: QuizOmit = {};
            const query = req.query;
            const limit = parseInt(req.query?.limit as string) || 100;
            const offset = parseInt(req.query?.offset as string) || 0;
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
                if (limit) {
                    limit;
                }
                if (offset) {
                    offset;
                }
            }
            console.log(req.query);
            res.status(200).json(
                await QuizService.getAll(include, omit, limit, offset),
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
            res.status(201).json(await QuizService.create(req.body));
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

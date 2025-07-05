import { QuizService } from './quiz.service';
import type {
    QuizController as QCType,
    QuizInclude,
    QuizOmit,
} from './quiz.types';

export const QuizController: QCType = {
    getAll: async function (req, res, next) {
        try {
            const include: QuizInclude = {};
            const omit: QuizOmit = {};
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
            console.log(req.query);
            res.json(await QuizService.getAll(include, omit));
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
            res.json(await QuizService.getById(id, include, omit));
        } catch (e) {
            next(e);
        }
    },
    create: async function (req, res, next) {
        try {
            res.json(await QuizService.create(req.body));
        } catch (error) {
            next(error);
        }
    },
    delete: async function (req, res, next) {
        try {
            res.json(await QuizService.delete(req.params.id));
        } catch (error) {
            next(error);
        }
    },
};

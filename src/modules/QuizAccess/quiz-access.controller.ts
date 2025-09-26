import { AuthenticationError } from '@errors';
import { QuizAccessService } from './quiz-access.service';
import { QuizAccessControllerContract } from './types';

export const QuizAccessController: QuizAccessControllerContract = {
    async getAllByQuizId(req, res) {
        if (
            !(await QuizAccessService.canEditAccessByQuizId({
                quizId: req.params.quizId,
                teacherId: res.locals.teacherId,
            }))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.json(
            await QuizAccessService.getAllByQuizId({
                quizId: req.params.quizId,
            }),
        );
    },
    async delete(req, res) {
        if (
            !(await QuizAccessService.canEditAccessById({
                id: req.params.id,
                teacherId: res.locals.teacherId,
            }))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.status(200).json(
            await QuizAccessService.delete({ id: req.params.id }),
        );
    },
    async updateAccessType(req, res) {
        if (
            !(await QuizAccessService.canEditAccessById({
                id: req.params.id,
                teacherId: res.locals.teacherId,
            }))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.status(200).json(
            await QuizAccessService.updateAccessType({
                id: req.params.id,
                accessType: req.body.accessType,
            }),
        );
    },
    async create(req, res) {
        if (
            !(await QuizAccessService.canEditAccessByQuizId({
                quizId: req.body.quizId,
                teacherId: res.locals.teacherId,
            }))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }

        res.status(201).json(await QuizAccessService.create(req.body));
    },
};

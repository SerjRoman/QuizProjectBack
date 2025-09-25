import { AuthenticationError } from '@errors';
import { QuizAccessService } from './quiz-access.service';
import { QuizAccessControllerContract } from './types';

export const QuizAccessController: QuizAccessControllerContract = {
    async getAllByQuizId(req, res) {
        if (
            !(await QuizAccessService.canEditAccessByQuizId(
                req.params.quizId,
                res.locals.teacherId,
            ))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.json(await QuizAccessService.getAllByQuizId(req.params.quizId));
    },
    async delete(req, res) {
        if (
            !(await QuizAccessService.canEditAccessById(
                req.params.id,
                res.locals.teacherId,
            ))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.status(200).json(await QuizAccessService.delete(req.params.id));
    },
    async updateAccessType(req, res) {
        if (
            !(await QuizAccessService.canEditAccessById(
                req.params.id,
                res.locals.teacherId,
            ))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }
        res.status(200).json(
            await QuizAccessService.updateAccessType(
                req.params.id,
                req.body.accessType,
            ),
        );
    },
    async create(req, res) {
        if (
            !(await QuizAccessService.canEditAccessById(
                req.body.quizId,
                res.locals.teacherId,
            ))
        ) {
            throw new AuthenticationError(
                'You are not allowed to update access',
            );
        }

        res.status(201).json(await QuizAccessService.create(req.body));
    },
};

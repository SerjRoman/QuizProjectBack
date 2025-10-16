import {
    authenticateMiddleware,
    checkRole,
    authenticateTeacherMiddleware,
    validateMiddleware,
} from '@middlewares';
import { Router } from 'express';
import { QuizAccessSchema } from './quiz-access.schema';
import { QuizAccessController } from './quiz-access.controller';

const router = Router();

router.use(authenticateMiddleware);
router.use(checkRole('TEACHER'));
router.use(authenticateTeacherMiddleware);

router.get(
    '/quiz/:quizId',
    validateMiddleware(QuizAccessSchema.getQuizAccessesByQuiz),
    QuizAccessController.getAllByQuizId,
);
router.post(
    '/',
    validateMiddleware(QuizAccessSchema.createQuizAccess),
    QuizAccessController.create,
);
router.put(
    '/access-type',
    validateMiddleware(QuizAccessSchema.updateQuizAccess),
    QuizAccessController.updateAccessType,
);
router.delete(
    '/:id',
    validateMiddleware(QuizAccessSchema.deleteQuizAccess),
    QuizAccessController.delete,
);

export { router as QuizAccessRouter };

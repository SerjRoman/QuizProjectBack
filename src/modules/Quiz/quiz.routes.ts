import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { validateMiddleware } from '@src/middlewares/validate';
import { QuizSchema } from './quiz.schema';
import { authenticateMiddleware } from '@src/middlewares/authenticate';

const router = Router();

router.use(authenticateMiddleware);

router.get('/', validateMiddleware(QuizSchema.getAll), QuizController.getAll);
router.get(
    '/:id',
    validateMiddleware(QuizSchema.getById),
    QuizController.getById,
);
router.post('/', validateMiddleware(QuizSchema.create), QuizController.create);
router.delete('/:id', QuizController.delete);

export { router as QuizRoutes };

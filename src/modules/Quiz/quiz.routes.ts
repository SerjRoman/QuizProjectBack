import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './quiz.schema';
import {
    authenticateMiddleware,
    isTeacherMiddleware,
    validateMiddleware,
} from '@middlewares';

const router = Router();

router.use(authenticateMiddleware);

router.get('/', validateMiddleware(QuizSchema.getAll), QuizController.getAll);
router.get(
    '/:id',
    validateMiddleware(QuizSchema.getById),
    QuizController.getById,
);
router.post('/', validateMiddleware(QuizSchema.create), QuizController.create);
router.delete(
    '/:id',
    validateMiddleware(QuizSchema.delete),
    QuizController.delete,
);
router.get(
    '/teacher/my',
    authenticateMiddleware,
    isTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMy),
    QuizController.teacherMy,
);
router.get(
    '/teacher/my/created',
    authenticateMiddleware,
    isTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyCreated),
    QuizController.teacherMyCreated,
);
router.get(
    '/teacher/my/copied',
    authenticateMiddleware,
    isTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyCopied),
    QuizController.teacherMyCopied,
);
router.get(
    '/teacher/my/favourite',
    authenticateMiddleware,
    isTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyFavourite),
    QuizController.teacherMyFavourite,
);

export { router as QuizRoutes };

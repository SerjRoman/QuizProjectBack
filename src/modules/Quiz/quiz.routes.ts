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

router.get(
    '/:id',
    validateMiddleware(QuizSchema.getById),
    QuizController.getById,
);
router.post('/', validateMiddleware(QuizSchema.create), QuizController.create);

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

router.put(
    '/:id/favourite',
    authenticateMiddleware,
    validateMiddleware(QuizSchema.updateFavourite),
    QuizController.addToFavourites
);
router.delete(
    '/:id/favourite',
    authenticateMiddleware,
    validateMiddleware(QuizSchema.deleteFavourite),
    QuizController.removeFromFavourites
);
router.delete(
    '/:id',
    validateMiddleware(QuizSchema.delete),
    QuizController.delete,
);

export { router as QuizRoutes };

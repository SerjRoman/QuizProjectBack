import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './quiz.schema';
import {
    authenticateMiddleware,
    checkRole,
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
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.teacherMy),
    QuizController.teacherMy,
);
router.get(
    '/teacher/my/created',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.teacherMyCreated),
    QuizController.teacherMyCreated,
);
router.get(
    '/teacher/my/copied',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.teacherMyCopied),
    QuizController.teacherMyCopied,
);
router.get(
    '/teacher/my/favourite',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.teacherMyFavourite),
    QuizController.teacherMyFavourite,
);
router.get(
    '/teacher/:id/access',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.getAccessesToQuiz),
    QuizController.teacherMyFavourite,
);
router.put(
    '/teacher/:id/access',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.updateAccess),
    QuizController.giveAccessToQuiz,
);
router.delete(
    '/teacher/:id/access',
    authenticateMiddleware,
    checkRole('TEACHER'),
    validateMiddleware(QuizSchema.deleteAccess),
    QuizController.removeAccessToQuiz,
);

router.put(
    '/:id/favourite',
    authenticateMiddleware,
    validateMiddleware(QuizSchema.updateFavourite),
    QuizController.addToFavourites,
);
router.delete(
    '/:id/favourite',
    authenticateMiddleware,
    validateMiddleware(QuizSchema.deleteFavourite),
    QuizController.removeFromFavourites,
);
router.delete(
    '/:id',
    validateMiddleware(QuizSchema.delete),
    QuizController.delete,
);

export { router as QuizRoutes };

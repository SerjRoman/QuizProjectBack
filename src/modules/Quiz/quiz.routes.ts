import { Router } from 'express';
import { QuizController } from './quiz.controller';
import { QuizSchema } from './quiz.schema';
import {
    authenticateMiddleware,
    authenticateTeacherMiddleware,
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
router.post(
    '/',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.create),
    QuizController.create,
);

router.get(
    '/teacher/my',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMy),
    QuizController.teacherMy,
);
router.get(
    '/teacher/my/created',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyCreated),
    QuizController.teacherMyCreated,
);
router.get(
    '/teacher/my/copied',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyCopied),
    QuizController.teacherMyCopied,
);
router.get(
    '/teacher/my/favourite',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.teacherMyFavourite),
    QuizController.teacherMyFavourite,
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
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.delete),
    QuizController.delete,
);
router.post(
    '/teacher/copy',
    authenticateMiddleware,
    checkRole('TEACHER'),
    authenticateTeacherMiddleware,
    validateMiddleware(QuizSchema.copyQuiz),
    QuizController.copyQuiz,
);

export { router as QuizRoutes };

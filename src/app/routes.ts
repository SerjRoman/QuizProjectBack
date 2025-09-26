import { Router } from 'express';
import { UserRoutes } from '@modules/User';
import { QuizRoutes } from '@modules/Quiz';
import { LanguageRoutes } from '@modules/Language';
import { SubjectRoutes } from '@modules/Subject';
import { TagRoutes } from '@modules/Tag';
import { AuthRouter } from '@modules/Auth';
import { QuizAccessRouter } from '@modules/QuizAccess';

const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/auth', AuthRouter);
AppRouter.use('/quizzes', QuizRoutes);
AppRouter.use('/languages', LanguageRoutes);
AppRouter.use('/subjects', SubjectRoutes);
AppRouter.use('/tags', TagRoutes);
AppRouter.use('/quiz-accesses', QuizAccessRouter);

export { AppRouter };

import { Router } from 'express';
import { UserRoutes } from '@modules/User';
import { QuizRoutes } from '@modules/Quiz';
import { LanguageRoutes } from '@modules/Language';

const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/quizzes', QuizRoutes);
AppRouter.use('/languages', LanguageRoutes);

export { AppRouter };

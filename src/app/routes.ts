import { Router } from 'express';
import { UserRoutes } from '@modules/User';
import { QuizRoutes } from '@modules/Quiz';

const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/quizzes', QuizRoutes);

export { AppRouter };

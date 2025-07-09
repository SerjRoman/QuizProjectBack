import { Router } from 'express';
import { UserRoutes } from '@src/modules/User';
import { QuizRoutes } from '@src/modules/Quiz/';

const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/quizes', QuizRoutes);

export { AppRouter };

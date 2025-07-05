import { Router } from 'express';
import { QuizRoutes } from '@src/modules/Quiz/';

const AppRouter = Router();

AppRouter.use('/quizes', QuizRoutes);

export { AppRouter };

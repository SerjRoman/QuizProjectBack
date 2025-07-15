import { Router } from 'express';
import { UserRoutes } from '@modules/User';
import { QuizRoutes } from '@modules/Quiz';
import { LanguageRoutes } from '@modules/Language';
import { TagRoutes } from '@modules/Tag';


const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/quizzes', QuizRoutes);
AppRouter.use('/languages', LanguageRoutes);
AppRouter.use('/tags', TagRoutes);


export { AppRouter };

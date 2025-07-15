import { Router } from 'express';
import { UserRoutes } from '@modules/User';
import { QuizRoutes } from '@modules/Quiz';
import { LanguageRouter } from '@modules/Language';
import { SubjectRoutes } from '@modules/Subject';

const AppRouter = Router();

AppRouter.use('/users', UserRoutes);
AppRouter.use('/quizzes', QuizRoutes);
AppRouter.use('/languages', LanguageRouter);
AppRouter.use('/subjects', SubjectRoutes);

export { AppRouter };

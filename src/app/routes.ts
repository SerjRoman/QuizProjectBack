import { Router } from 'express';
import { QuizRoutes } from '@src/modules/Quiz/';

const AppRouter = Router();

AppRouter.use('/quizes', QuizRoutes);
AppRouter.use('/users', (req, res) => {
    res.status(200).json({ token: 'token', refreshToken: 'refreshToken' });
});
export { AppRouter };

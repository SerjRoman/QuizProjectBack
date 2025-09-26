import { authenticateMiddleware, validateMiddleware } from '@middlewares';
import { Router } from 'express';
import { AuthSchema } from './auth.schema';
import { AuthController } from './auth.controller';

const router = Router();

router.get('/me', authenticateMiddleware, AuthController.me);
router.post(
    '/refresh',
    validateMiddleware(AuthSchema.refresh),
    AuthController.refresh,
);
router.get('/logout', authenticateMiddleware, AuthController.logout);
router.post(
    '/register',
    validateMiddleware(AuthSchema.register),
    AuthController.register,
);
router.post(
    '/login',
    validateMiddleware(AuthSchema.login),
    AuthController.login,
);
export { router as AuthRouter };

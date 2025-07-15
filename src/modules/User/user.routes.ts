import { Router } from 'express';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { authenticateMiddleware, validateMiddleware } from '@middlewares';

const router = Router();

router.post(
    '/create',
    validateMiddleware(UserSchema.create),
    UserController.create,
);

router.get(
    '/me',
    authenticateMiddleware,
    validateMiddleware(UserSchema.getById),
    UserController.me,
);
router.post(
    '/refresh',
    validateMiddleware(UserSchema.refresh),
    UserController.refresh,
);
router.get('/logout', authenticateMiddleware, UserController.logout);
router.post(
    '/register',
    validateMiddleware(UserSchema.create),
    UserController.register,
);
router.post(
    '/login',
    validateMiddleware(UserSchema.login),
    UserController.login,
);

router.get(
    '/:id',
    validateMiddleware(UserSchema.getById),
    UserController.getById,
);
router.put(
    '/:id',
    validateMiddleware(UserSchema.update),
    UserController.update,
);
router.delete(
    '/:id',
    validateMiddleware(UserSchema.delete),
    UserController.delete,
);
export const UserRoutes = router;

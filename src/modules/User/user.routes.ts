import { Router } from 'express';
import { UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { authenticateMiddleware, validateMiddleware } from '@middlewares';

const router = Router();

router.use(authenticateMiddleware);

router.post(
    '/create',
    validateMiddleware(UserSchema.create),
    UserController.create,
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

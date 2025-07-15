import { authenticateMiddleware, validateMiddleware } from '@middlewares';
import { Router } from 'express';
import { TagController } from './tag.controller';
import { TagSchema } from './tag.schema';

const router = Router();

router.get(
    '/',
    authenticateMiddleware,
    validateMiddleware(TagSchema.getAll),
    TagController.getAll,
);
export { router as TagRoutes };

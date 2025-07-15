import { authenticateMiddleware, validateMiddleware } from '@middlewares';
import { Router } from 'express';
import { LanguageController } from './language.controller';
import { LanguageSchema } from './language.schema';

const router = Router();

router.get(
    '/',
    authenticateMiddleware,
    validateMiddleware(LanguageSchema.getAll),
    LanguageController.getAll,
);

export { router as LanguageRoutes };

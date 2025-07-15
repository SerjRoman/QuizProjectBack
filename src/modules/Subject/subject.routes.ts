import { authenticateMiddleware, validateMiddleware } from '@middlewares';
import { Router } from 'express';
import { SubjectController } from './subject.controller';
import { SubjectSchema } from './subject.schema';

const router = Router();

router.get(
    '/',
    authenticateMiddleware,
    validateMiddleware(SubjectSchema.getAll),
    SubjectController.getAll,
);

export { router as SubjectRouter };

import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { AppRouter } from './routes';
import { parseJsonQueryMiddleware } from '@src/middlewares/parse-json-query';
import { errorHandler } from '@src/middlewares/error-handler';

const app = express();

app.use(cors());
app.use(json());
app.use(parseJsonQueryMiddleware);

app.use(AppRouter);

app.use(errorHandler);

export default app;

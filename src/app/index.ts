import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { AppRouter } from './routes';
import { parseJsonQueryMiddleware } from '@middlewares';
import { errorHandlerMiddleware } from '@middlewares';

const app = express();

app.use(cors());
app.use(json());
app.use(parseJsonQueryMiddleware);

app.use(AppRouter);

app.use(errorHandlerMiddleware);

export default app;

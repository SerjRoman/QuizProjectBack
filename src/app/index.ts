import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

const app = express();

app.use(cors());
app.use(json());


export default app


import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.ts';
import boardsRouter from './routes/boards.ts';
import columnsRouter from './routes/columns.ts';
import tasksRouter from './routes/tasks.ts';
import subtasksRouter from './routes/subtasks.ts';
import { notFound } from './middlewares/not-found.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { SITE_URL } from './config/env.ts';

const app = express();

app.use(
  cors({
    origin: SITE_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/boards', boardsRouter);
app.use('/api/boards/:boardId/columns', columnsRouter);
app.use('/api/boards/:boardId/columns/:columnId/tasks', tasksRouter);
app.use(
  '/api/boards/:boardId/columns/:columnId/tasks/:taskId/subtasks',
  subtasksRouter,
);

app.use(notFound);
app.use(errorHandler);

export default app;

import express from "express";
import authRouter from "./routes/auth.ts";
import boardsRouter from "./routes/boards.ts";
import { notFound } from "./middlewares/not-found.ts";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);

app.use(notFound);

export default app;

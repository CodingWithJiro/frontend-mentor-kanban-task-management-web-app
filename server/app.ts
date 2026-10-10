import express from "express";
import authRouter from "./routes/auth.ts";
import boardsRouter from "./routes/boards.ts";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);

export default app;

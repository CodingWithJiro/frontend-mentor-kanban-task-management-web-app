import express from "express";
import boardsRouter from "./routes/boards.ts";

const app = express();

app.use(express.json());
app.use("/api/boards", boardsRouter);

export default app;

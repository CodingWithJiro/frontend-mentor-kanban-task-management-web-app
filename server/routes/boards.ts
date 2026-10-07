import { Router } from "express";
import { getBoards } from "../controllers/boards.ts";

const router = Router();

router.get("/", getBoards);

export default router;

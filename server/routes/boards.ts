import { Router } from "express";
import { getBoards, getBoard } from "../controllers/boards.ts";

const router = Router();

router.get("/", getBoards);
router.get("/:id", getBoard);

export default router;

import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { getBoards, getBoard, createBoard } from "../controllers/boards.ts";

const router = Router();

router.get("/", getBoards);
router.get("/:id", getBoard);
router.post("/", authenticate, createBoard);

export default router;

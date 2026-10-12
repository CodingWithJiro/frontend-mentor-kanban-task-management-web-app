import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { getBoards, getBoard, createBoard } from "../controllers/boards.ts";

const router = Router();

router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoard);
router.post("/", authenticate, createBoard);

export default router;

import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
} from "../controllers/boards.ts";

const router = Router();

router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoard);
router.post("/", authenticate, createBoard);
router.patch("/:id", authenticate, updateBoard);

export default router;

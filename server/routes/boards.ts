import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateRequest } from "../middlewares/validate-request.ts";
import { createBoardSchema } from "../schemas/create-board.schema.ts";
import { updateBoardSchema } from "../schemas/update-board.schema.ts";
import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boards.ts";

const router = Router();

router.get("/", authenticate, getBoards);
router.get("/:id", authenticate, getBoard);
router.post("/", authenticate, validateRequest(createBoardSchema), createBoard);
router.patch(
  "/:id",
  authenticate,
  validateRequest(updateBoardSchema),
  updateBoard,
);
router.delete("/:id", authenticate, deleteBoard);

export default router;

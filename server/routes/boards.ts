import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateRequest } from "../middlewares/validate-request.ts";
import { validateParameterIds } from "../middlewares/validate-parameter.ts";
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
router.get("/:boardId", authenticate, validateParameterIds, getBoard);
router.post("/", authenticate, validateRequest(createBoardSchema), createBoard);
router.patch(
  "/:boardId",
  authenticate,
  validateParameterIds,
  validateRequest(updateBoardSchema),
  updateBoard,
);
router.delete("/:boardId", authenticate, validateParameterIds, deleteBoard);

export default router;

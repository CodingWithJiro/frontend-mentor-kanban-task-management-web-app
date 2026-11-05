import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateParameterIds } from "../middlewares/validate-parameter.ts";
import { validateRequest } from "../middlewares/validate-request.ts";
import { createSubtaskSchema } from "../schemas/create-subtask.schema.ts";
import { updateSubtaskSchema } from "../schemas/update-subtask.schema.ts";
import {
  createSubtask,
  deleteSubtask,
  getSubtask,
  getSubtasks,
  updateSubtask,
} from "../controllers/subtasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, validateParameterIds, getSubtasks);
router.get("/:subtaskId", authenticate, validateParameterIds, getSubtask);
router.post(
  "/",
  authenticate,
  validateParameterIds,
  validateRequest(createSubtaskSchema),
  createSubtask,
);
router.put(
  "/:subtaskId",
  authenticate,
  validateParameterIds,
  validateRequest(updateSubtaskSchema),
  updateSubtask,
);
router.delete("/:subtaskId", authenticate, validateParameterIds, deleteSubtask);

export default router;

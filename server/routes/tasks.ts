import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateParameterIds } from "../middlewares/validate-parameter.ts";
import { validateRequest } from "../middlewares/validate-request.ts";
import { createTaskSchema } from "../schemas/create-task.schema.ts";
import { updateTaskSchema } from "../schemas/update-task.schema.ts";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, validateParameterIds, getTasks);
router.get("/:taskId", authenticate, validateParameterIds, getTask);
router.post(
  "/",
  authenticate,
  validateParameterIds,
  validateRequest(createTaskSchema),
  createTask,
);
router.put(
  "/:taskId",
  authenticate,
  validateParameterIds,
  validateRequest(updateTaskSchema),
  updateTask,
);
router.delete("/:taskId", authenticate, validateParameterIds, deleteTask);

export default router;

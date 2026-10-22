import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import {
  createSubtask,
  getSubtask,
  getSubtasks,
} from "../controllers/subtasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getSubtasks);
router.get("/:subtaskId", authenticate, getSubtask);
router.post("/", authenticate, createSubtask);

export default router;

import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import {
  createTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getTasks);
router.get("/:taskId", authenticate, getTask);
router.post("/", authenticate, createTask);
router.put("/:taskId", authenticate, updateTask);

export default router;

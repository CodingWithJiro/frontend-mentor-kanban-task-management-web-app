import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { createTask, getTask, getTasks } from "../controllers/tasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getTasks);
router.get("/:taskId", authenticate, getTask);
router.post("/", authenticate, createTask);

export default router;

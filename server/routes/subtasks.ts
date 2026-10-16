import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { getSubtasks } from "../controllers/subtasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getSubtasks);

export default router;

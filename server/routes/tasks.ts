import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { getTasks } from "../controllers/tasks.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getTasks);

export default router;

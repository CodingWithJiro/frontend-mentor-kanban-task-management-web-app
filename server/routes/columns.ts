import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { getColumns } from "../controllers/columns.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getColumns);

export default router;

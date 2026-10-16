import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { createColumn, getColumn, getColumns } from "../controllers/columns.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getColumns);
router.get("/:columnId", authenticate, getColumn);
router.post("/", authenticate, createColumn);

export default router;

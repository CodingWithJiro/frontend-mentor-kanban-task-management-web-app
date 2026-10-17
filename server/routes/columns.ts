import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import {
  createColumn,
  deleteColumn,
  getColumn,
  getColumns,
  updateColumn,
} from "../controllers/columns.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, getColumns);
router.get("/:columnId", authenticate, getColumn);
router.post("/", authenticate, createColumn);
router.put("/:columnId", authenticate, updateColumn);
router.delete("/:columnId", authenticate, deleteColumn);

export default router;

import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.ts";
import { validateParameterIds } from "../middlewares/validate-parameter.ts";
import { validateRequest } from "../middlewares/validate-request.ts";
import { createColumnSchema } from "../schemas/create-column.schema.ts";
import { updateColumnSchema } from "../schemas/update-column.schema.ts";
import {
  createColumn,
  deleteColumn,
  getColumn,
  getColumns,
  updateColumn,
} from "../controllers/columns.ts";

const router = Router({ mergeParams: true });

router.get("/", authenticate, validateParameterIds, getColumns);
router.get("/:columnId", authenticate, validateParameterIds, getColumn);
router.post(
  "/",
  authenticate,
  validateParameterIds,
  validateRequest(createColumnSchema),
  createColumn,
);
router.put(
  "/:columnId",
  authenticate,
  validateParameterIds,
  validateRequest(updateColumnSchema),
  updateColumn,
);
router.delete("/:columnId", authenticate, validateParameterIds, deleteColumn);

export default router;

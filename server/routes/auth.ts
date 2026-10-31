import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request.ts";
import { loginAccount, registerAccount } from "../controllers/auth.ts";
import { registerSchema } from "../schemas/register.schema.ts";
import { loginSchema } from "../schemas/login.schema.ts";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerAccount);
router.post("/login", validateRequest(loginSchema), loginAccount);

export default router;

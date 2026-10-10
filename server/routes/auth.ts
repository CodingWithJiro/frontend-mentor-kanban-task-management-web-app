import { Router } from "express";
import { loginAccount, registerAccount } from "../controllers/auth.ts";

const router = Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);

export default router;

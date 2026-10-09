import { Router } from "express";
import { loginAccount } from "../controllers/auth.ts";

const router = Router();

router.post("/login", loginAccount);

export default router;

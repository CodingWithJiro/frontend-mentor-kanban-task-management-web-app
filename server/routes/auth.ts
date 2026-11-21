import { Router } from 'express';
import { validateRequest } from '../middlewares/validate-request.ts';
import { registerSchema } from '../../shared/schemas/register.schema.ts';
import { loginSchema } from '../schemas/login.schema.ts';
import {
  loginAccount,
  logoutAccount,
  refreshAccessToken,
  registerAccount,
} from '../controllers/auth.ts';

const router = Router();

router.post('/register', validateRequest(registerSchema), registerAccount);
router.post('/login', validateRequest(loginSchema), loginAccount);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logoutAccount);

export default router;

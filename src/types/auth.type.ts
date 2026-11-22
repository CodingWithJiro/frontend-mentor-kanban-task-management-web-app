import { loginSchema } from '../../shared/schemas/login.schema';
import { registerSchema } from '../../shared/schemas/register.schema';
import z from 'zod';

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
}
export interface AuthResponse {
  message: string;
  accessToken: string;
  user: AuthUser;
}
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

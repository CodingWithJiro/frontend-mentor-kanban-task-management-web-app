import { registerSchema } from '../../shared/schemas/register.schema';
import { API_URL } from '@/config/env';
import { z } from 'zod';

type RegisterInput = z.infer<typeof registerSchema>;

export async function registerAccount(userData: RegisterInput) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
}

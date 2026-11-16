import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, { error: 'Name is required.' }),
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  email: z.email({ error: 'Must be a valid email address.' }),
  password: z
    .string()
    .min(12, { error: 'Must contain at least 12 characters.' })
    .max(128, { error: 'Must not exceed 128 characters.' })
    .regex(/[a-z]/, { error: 'Must contain one lowercase letter.' })
    .regex(/[A-Z]/, { error: 'Must contain one uppercase letter.' })
    .regex(/[0-9]/, { error: 'Must contain one number.' })
    .regex(/[^A-Za-z0-9]/, { error: 'Must contain one special character.' }),
});

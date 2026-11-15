import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(1, { error: 'Name is required.' }),
  username: z.string().trim().min(1, { error: 'Username is required.' }),
  email: z.email({ error: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(12, { error: 'Password must contain at least 12 characters.' })
    .max(128, { error: 'Password cannot exceed 128 characters.' })
    .regex(/[a-z]/, {
      error: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      error: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, { error: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, {
      error: 'Password must contain at least one special character.',
    }),
});

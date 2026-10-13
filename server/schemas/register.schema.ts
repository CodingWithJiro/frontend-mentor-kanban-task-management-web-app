import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1),
  username: z.string().trim().min(1),
  email: z.email(),
  password: z
    .string()
    .min(12)
    .max(128)
    .regex(/[a-z]/)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

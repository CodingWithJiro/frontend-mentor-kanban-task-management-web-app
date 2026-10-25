import { z } from "zod";

export const updateColumnSchema = z.object({
  name: z.string().trim().min(1, "Column name is required."),
  color: z
    .string()
    .trim()
    .regex(/^#[0-9a-f]{6}$/i, "Color must be a valid hexadecimal color."),
});

import { z } from "zod";

export const createSubtaskSchema = z.object({
  title: z.string().trim().min(1, "Subtask title is required."),
  isCompleted: z.boolean().default(false),
});

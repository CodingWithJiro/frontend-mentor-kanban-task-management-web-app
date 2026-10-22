import { z } from "zod";

export const updateSubtaskSchema = z.object({
  title: z.string().trim().min(1, "Subtask title is required."),
  isCompleted: z.boolean(),
});

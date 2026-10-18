import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Task title is required."),
  description: z.string().trim().nullish(),
});

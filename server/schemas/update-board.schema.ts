import { z } from "zod";

export const updateBoardSchema = z.object({
  name: z.string().trim().min(1, "Board name is required."),
});

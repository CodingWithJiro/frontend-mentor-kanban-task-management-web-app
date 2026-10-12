import { z } from "zod";

export const updateBoardScheme = z.object({
  name: z.string().trim().min(1, "Board name is required."),
});

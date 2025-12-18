import { z } from "zod";

export const descriptionSchema = z.object({
  description: z
    .string()
    .trim()
    .max(300, { message: "Content must be no longer than 300 characters" })
    .optional(),
});


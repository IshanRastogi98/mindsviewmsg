import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be of at least 10 characters" })
    .max(300, { message: "Content must be no longer than 300 characters" }),
  username: usernameValidation,
});


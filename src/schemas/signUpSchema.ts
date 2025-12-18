import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username min length is 2")
  .max(20, "Username max length is 20")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not have special chars");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.email({ message: "Invalid Email Address" }),
  password: z.string().min(6, "minimum length is 6 chars"),
});

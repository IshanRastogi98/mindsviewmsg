import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username min length is 2")
  .max(36, "Username max length is 48")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not have special chars");
export const passwordValidation = z
  .string()
  .min(6, "minimum length is 6 chars");
export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.email({ message: "Invalid Email Address" }),
  password: passwordValidation,
});

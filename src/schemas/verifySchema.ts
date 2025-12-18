import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const verifyCodeSchema = z.object({
  verifyCode: z.string().length(6, "Verification code must be 6 digits"),
  username: usernameValidation,
  email: z.email({ message: "Invalid Email Address" }),
});
export const codeSchema = z.object({
  verifyCode: z.string().length(6, "Verification code must be 6 digits"),
});

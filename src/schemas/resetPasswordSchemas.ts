import z from "zod";
import { passwordValidation, usernameValidation } from "./signUpSchema";

export const resetPasswordUISchema = z
  .object({
    token: z.string().min(1, "Invalid reset token"),

    newPassword: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const identifierValidationSchema = z.object({
  identifier: z.union(
    [z.email({ message: "Invalid email address" }), usernameValidation],
    { message: "Identifier must be a valid email or username" }
  ),
});
export const resetPasswordSchema = z.object({
  token: z
    .string()
    .length(64, "Invalid token")
    .regex(/^[0-9a-f]{64}$/, "Invalid token format"),
  newPassword: passwordValidation,
  username: usernameValidation,
});
export const changePasswordSchema = z
  .object({
    username: usernameValidation,
    oldPassword: z.string().min(1, "Current password is required"),

    newPassword: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

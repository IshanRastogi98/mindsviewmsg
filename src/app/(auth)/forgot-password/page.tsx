"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { errorToast, successToast } from "@/components/ui/sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import Link from "next/link";
import { usernameValidation } from "@/schemas/signUpSchema";
import ChangeThemeDropdown from "@/components/ChangeThemeDropdown";

const ForgotPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof IdentifierValidationSchema>>({
    resolver: zodResolver(IdentifierValidationSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof IdentifierValidationSchema>
  > = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>(
        "/api/forgot-password/send-verification-link",
        { rawIdentifier: data.identifier }
      );

      if (response.data?.success) {
        successToast({
          message: "Reset Link Sent",
          description:
            "Check your email for the password reset link. Expires in 1 hour",
        });

        form.reset();
      } else {
        errorToast({
          message: "Request Failed",
          description:
            response.data?.message ||
            "Unable to send reset link. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      errorToast({
        message: "Error",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-2xl relative w-full font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <h1>Forgot Password</h1>
            <div className="absolute -top-1 -right-1">
              <ChangeThemeDropdown />
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="w-4 h-4" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/sign-in"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
const IdentifierValidationSchema = z.object({
  identifier: z.union(
    [z.email({ message: "Invalid email address" }), usernameValidation],
    { message: "Identifier must be a valid email or username" }
  ),
});

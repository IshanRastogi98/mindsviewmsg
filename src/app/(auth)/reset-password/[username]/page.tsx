"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { useState, useEffect } from "react";
import { resetPasswordUISchema } from "@/schemas/resetPasswordSchemas";
import ChangeThemeDropdown from "@/components/ChangeThemeDropdown";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username }: { username: string } = useParams();

  const token = searchParams.get("token");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordUISchema>>({
    resolver: zodResolver(resetPasswordUISchema),
    defaultValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { setValue } = form;

  // Inject token from URL
  useEffect(() => {
    if (token) {
      setValue("token", token);
    }
  }, [token, setValue]);

  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordUISchema>> = async (
    data
  ) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        `/api/reset-password/${username}?token=${encodeURIComponent(data.token)}`,
        {
          newPassword: data.newPassword,
        }
      );
      if (process.env.NODE_ENV === "development") console.log(response);
      if (response.data?.success) {
        successToast({
          message: "Password Reset Successful",
          description: "You can now sign in with your new password.",
        });

        router.replace("/sign-in");
      } else {
        errorToast({
          message: "Reset Failed",
          description:
            response.data?.message ||
            "Unable to reset password. Please try again.",
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
            <h1>Reset Password</h1>
            <div className="absolute -top-1 -right-1">
              <ChangeThemeDropdown />
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Set a new password for your account
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting || !token}
              className="w-full py-5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="w-4 h-4" />
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>

            {!token && (
              <p className="text-sm text-red-500 text-center">
                Invalid or missing reset token
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

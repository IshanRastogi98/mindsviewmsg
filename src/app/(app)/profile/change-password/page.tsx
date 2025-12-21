"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { changePasswordSchema } from "@/schemas/resetPasswordSchemas";
import ChangeThemeDropdown from "@/components/ChangeThemeDropdown";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      username: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { setValue } = form;

  const { data: session } = useSession();
  useEffect(() => {
    if (!session || !session.user) return;
    setValue("username", session.user.username as string);
  }, [session, setValue]);

  const onSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (
    data
  ) => {
    console.log("data is ->", data);
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        `/api/change-password/${data.username}`,
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }
      );
      console.log("data is ->", response);

      if (response.data?.success) {
        successToast({
          message: "Password Changed",
          description: "Your password has been updated successfully.",
        });

        router.replace(`/profile/${data.username}`);
      } else {
        errorToast({
          message: "Update Failed",
          description:
            response.data?.message ||
            "Unable to change password. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("error", axiosError);
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
            <h1>Change Password</h1>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Update your account password securely
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              disabled={isSubmitting}
              className="w-full py-5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="w-4 h-4" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

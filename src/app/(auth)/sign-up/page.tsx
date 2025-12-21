"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { title } from "process";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { errorToast, successToast } from "@/components/ui/sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import ChangeThemeDropdown from "@/components/ChangeThemeDropdown";

const page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);

  const router = useRouter();

  //1-> zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    // resolver options
    resolver: zodResolver(
      // requires schema for validation
      signUpSchema
    ),
    defaultValues: {
      // the default values
      username: "",
      email: "",
      password: "",
    },
  });

  // username availability check
  let controller = new AbortController();

  useEffect(() => {
    controller.abort(); // cancel previous
    controller = new AbortController();
    const checkUsernameUnique = async () => {
      if (
        !isCheckingUsername &&
        debouncedUsername &&
        debouncedUsername.length > 1
      ) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );

          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError?.response?.data?.message ?? "Error Checking Username" // if not found
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  //2-> submission handling
  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data: z.infer<typeof signUpSchema>
  ) => {
    setIsSubmitting(true);
    console.log("data is -> ", data);
    try {
      const response = await axios.post("/api/sign-up", data);
      if (response.data?.success) {
        successToast({
          message: "Registered Successfully 🎉",
          description: `Welcome aboard, ${debouncedUsername}! Your account is ready to be verified.`,
        });

        router.replace(`/verify/${username}?email=${data.email}`);
      } else {
        // console.error(response.data?.message);
        errorToast({
          message: "Signup Failed",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      //   console.error("Error signing up", axiosError.response?.data);
      errorToast({
        message: "Signup Failed",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-4">
      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="text-2xl relative w-full font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <h1>Create account</h1>
            <div className="absolute -top-1 -right-1">
              <ChangeThemeDropdown />
            </div>
          </div>
          <p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormDescription className="text-zinc-600 dark:text-zinc-400">
                      This is your public display name
                    </FormDescription>

                    {usernameMessage && (
                      <FormDescription
                        className={
                          usernameMessage.includes("Username Available")
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500"
                        }
                      >
                        {usernameMessage}
                      </FormDescription>
                    )}

                    {isCheckingUsername && (
                      <FormDescription className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                        <Spinner />
                        <span>Checking availability...</span>
                      </FormDescription>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
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
                className="
                py-5 text-md w-full flex items-center justify-center gap-2 font-medium
                bg-zinc-900 text-white hover:bg-zinc-800
                dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
              "
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Divider */}
        <div className="my-10 space-y-6">
          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Google Button */}
          <Button
            onClick={() => signIn("google")}
            variant="outline"
            className="
      w-full h-11
      flex items-center justify-center gap-3
      rounded-xl
      border-zinc-300 dark:border-zinc-700
      bg-white dark:bg-zinc-900
      text-zinc-800 dark:text-zinc-100
      hover:bg-zinc-100 dark:hover:bg-zinc-800
      transition-colors
    "
          >
            {/* Optional Google Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 48 48"
              className="shrink-0"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.1H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2c-1.7 1.3-4 2.1-7.3 2.1-5.2 0-9.6-3.3-11.2-7.9l-6.5 5c3.3 6.5 10 11.3 17.7 11.3z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.1H42V20H24v8h11.3c-1 2.7-3 5-5.7 6.5l6.3 5.2C39.6 36.3 44 30.8 44 24c0-1.3-.1-2.7-.4-3.9z"
              />
            </svg>

            <span className="text-sm font-medium">Continue in with Google</span>
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-500">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-zinc-900 dark:text-zinc-300 hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;

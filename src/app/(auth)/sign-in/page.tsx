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
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    // resolver options
    resolver: zodResolver(
      // requires schema for validation
      signInSchema
    ),
    defaultValues: {
      // the default values
      identifier: "",
      password: "",
    },
  });

  // submission handling
  const onSubmit: SubmitHandler<z.infer<typeof signInSchema>> = async (
    data: z.infer<typeof signInSchema>
  ) => {
    // just add the signin from the next auth
    // put credentials(since used that only)
    // next we have compulsary options/parameters
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    // console.log(result);
    if (result?.error) {
      if (!result.ok && result.error === "CredentialsSignin") {
        errorToast({
          message: "Login Failed",
          description: "Invalid username or password.",
        });
      } else {
        errorToast({
          message: "Login Failed",
          description: result.error || "Something Went Wrong !!",
        });
      }
      setIsSubmitting(false);
    }
    if (result?.url) {
      router.replace("/dashboard");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-4">
      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome Back
          </h1>
          <p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Username / Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="username/email" {...field} />
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
                className="py-5 text-md w-full flex items-center justify-center gap-2 font-medium
              bg-zinc-900 text-white hover:bg-zinc-800
              dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {/* Footer Links */}
        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-500">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-zinc-900 dark:text-zinc-300 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;

"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { errorToast, successToast } from "@/components/ui/sonner";
import { codeSchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useResendTimer } from "@/helpers/resendTimer";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams<{ username: string }>();
  const username = params.username;
  const email: string | null = searchParams.get("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { count, isActive, reset } = useResendTimer(30);

  // zod implementation
  const form = useForm<z.infer<typeof codeSchema>>({
    // resolver options
    resolver: zodResolver(
      // requires schema for validation
      codeSchema
    ),
    defaultValues: {
      // the default values
      verifyCode: "",
    },
  });

  const handleResendVerificationCode = async () => {
    if (isResending) return;
    if (!email || !username) {
      return errorToast({
        message: "Invalid request",
        description: "Missing email or username.",
      });
    }
    setIsResending(true);

    try {
      const response = await axios.post(`/api/verify-code/resend/`, {
        email,
        username,
      });
      if (response.data.success) {
        successToast({
          message: "OTP Resent",
          description: "The Otp has been sent again",
        });
        reset();
      } else {
        errorToast({
          message: "OTP Resend Failed",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      //   console.error("Error otp resend", axiosError.response?.data);
      errorToast({
        message: "OTP Resend Failed",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit: SubmitHandler<{ verifyCode: string }> = async (data: {
    verifyCode: string;
  }) => {
    setIsSubmitting(true);
    console.log("data is -> ", data, username);
    try {
      const response = await axios.post(`/api/verify-code`, {
        verifyCode: data.verifyCode,
        username,
        email,
      });
      if (response.data?.success) {
        successToast({
          message: "Verified Successfully",
          description: `` + "\nNow You can Sign In", // generate it
        });
        router.replace(`/sign-in`);
      } else {
        // console.error(response.data?.message);
        errorToast({
          message: "Verification Failed !!",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      //   console.error("Error Verifying user", axiosError.response?.data);
      errorToast({
        message: "Verification Failed !!",
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
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Verify account
          </h1>
          <p className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400 mt-1">
            Enter the OTP to continue
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="verifyCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center items-center gap-6">
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Enter the Verification Code
                    </FormLabel>

                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        value={field.value}
                        onChange={(val) => field.onChange(val)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>

                        <InputOTPSeparator />

                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting || isResending}
                className="
                py-5 text-md w-full flex items-center justify-center gap-2 font-medium
                bg-zinc-900 text-white hover:bg-zinc-800
                dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
              "
              >
                {isSubmitting ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Verifying ...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-500">
          The code was sent to {email}
        </p>

        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-500">
          Code not received?{" "}
          {!isResending && !isSubmitting ? (
            <button
              type="button"
              disabled={isActive || isSubmitting}
              onClick={handleResendVerificationCode}
              className="text-zinc-900 dark:text-zinc-300 hover:underline"
            >
              {isActive ? `Resend in ${count}s` : "Resend OTP"}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1">
              <Spinner />
              <span>Resending OTP...</span>
            </span>
          )}
        </p>

        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-500">
          Want to edit?{" "}
          <a
            href="/sign-up"
            className="text-zinc-900 dark:text-zinc-300 hover:underline"
          >
            Go Back
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;

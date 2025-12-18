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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      {/* Auth Card Container */}
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Create account
          </h1>
          <p className="text-sm tracking-wide text-zinc-400 mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* --- FORM GOES HERE --- */}
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* using the old FormField(shadcn) and form(html)*/}

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e); // did since we had below stmt requirement
                          setUsername(e.target.value); // added since we have a different check as well
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name
                    </FormDescription>
                    {usernameMessage && usernameMessage.length > 0 && (
                      <FormDescription
                        className={
                          !usernameMessage.includes("Username Available")
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {usernameMessage}
                      </FormDescription>
                    )}
                    {isCheckingUsername && (
                      <FormDescription className="flex items-center justify-start gap-1">
                        <Spinner />
                        <span className="mb-1">Checking Availability ...</span>
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
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
                variant={"default"}
                disabled={isSubmitting}
                className="py-5 text-md w-full text-zinc-900 flex items-center justify-center gap-2 font-medium"
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
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-zinc-800"></div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>

        {/* --- SOCIAL BUTTONS GO HERE --- */}
        <div className="flex flex-col gap-3">
          {/* Google / GitHub buttons */}
        </div>

        {/* Footer Links */}
        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-zinc-300 hover:text-zinc-100 underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;

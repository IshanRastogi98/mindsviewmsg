"use client";
import { Button } from "@/components/ui/button";
import {
  Send,
  Sparkles,
  X,
  BadgeCheckIcon,
  UserRoundPen,
  Sparkle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "./ui/badge";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "@/schemas/messageSchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { errorToast, successToast } from "./ui/sonner";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";
import { descriptionSchema } from "@/schemas/descriptionSchema";
import { Session } from "next-auth";
import {
  suggestionSchema,
} from "@/schemas/messageSuggestionSchema";

type MainFeatureProps = {
  session?: Session | null;
  username?: string;
  allowEdit?: boolean;
};

const MainFeature = ({
  username = "",
  allowEdit = true,
  session,
}: MainFeatureProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<
    z.infer<typeof suggestionSchema>
  >([
    { message: "What’s a hobby you've recently started?" },
    {
      message:
        "If you could have dinner with any historical figure, who would it be?",
    },
    { message: "What’s a simple thing that makes you happy?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof messageSchema>>({
    // resolver options
    resolver: zodResolver(
      // requires schema for validation
      messageSchema
    ),
    defaultValues: {
      // the default values
      username: "",
      content: "",
    },
  });

  useEffect(() => {
    if (username) {
      form.setValue("username", username, {
        shouldValidate: true,
      });
    }
  }, [username, form]);

  //2-> submission handling
  const onSubmit: SubmitHandler<z.infer<typeof messageSchema>> = async (
    data: z.infer<typeof messageSchema>
  ) => {
    setIsSending(true);
    console.log("data is -> ", data);
    try {
      const response = await axios.post("/api/send-message", data);
      if (response.data?.success) {
        successToast({
          message: "Success🎉",
          description: `Message sent to ${data.username}, Successfully.`,
        });
      } else {
        // console.error(response.data?.message);
        errorToast({
          message: "Failed",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      //   console.error("Error signing up", axiosError.response?.data);
      errorToast({
        message: "Error",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  // zod implementation
  const aiForm = useForm<z.infer<typeof descriptionSchema>>({
    // resolver options
    resolver: zodResolver(
      // requires schema for validation
      descriptionSchema
    ),
    defaultValues: {
      // the default values
      description: "",
    },
  });

  //2-> submission handling, onRefreshSuggessions = onSubmit for the AiForm
  const onRefreshSuggessions: SubmitHandler<
    z.infer<typeof descriptionSchema>
  > = async (data: z.infer<typeof descriptionSchema>) => {
    setIsLoading(true);
    console.log("data is -> ", data);
    try {
      const response = await axios.post<ApiResponse>(
        "/api/suggest-messages",
        data
      );
      console.log(response);
      if (response.data?.success) {
        successToast({
          message: "Success🎉",
          description: response.data.message,
        });
        setSuggestions(
          response.data.suggestions?.suggestions as z.infer<
            typeof suggestionSchema
          >
        );
      } else {
        // console.error(response.data?.message);
        errorToast({
          message: "Failed",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      //   console.error("Error signing up", axiosError.response?.data);
      errorToast({
        message: "Error",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = useCallback(
    (index: number) => {
      if (!suggestions[index]) return;
      form.setValue("content", suggestions[index].message);
    },
    [suggestions, form]
  );
  const renderedSuggestions = useMemo(
    () =>
      suggestions.map((suggestion, i) => (
        <div
          key={i}
          onClick={() => handleSuggestionClick(i)}
          className="
              rounded-xl
              bg-white/60 dark:bg-zinc-800/60
              border border-zinc-400/40 hover:border-zinc-800/40 dark:border-white/10
              p-4
              text-sm
              text-zinc-800 dark:text-zinc-100
              hover:bg-white/80 dark:hover:bg-zinc-700/70
              transition-colors
              cursor-pointer
            "
        >
          {suggestion.message}
        </div>
      )),
    [suggestions, handleSuggestionClick]
  );

  const handleEditUsername = useCallback(() => {
    router.replace(`/u/?username=${username}`);
  }, [router, username]);

  // if (session === undefined) {
  //   return (
  //     <section
  //       className="
  //         w-full
  //         py-24
  //         px-6
  //         flex justify-center
  //       "
  //     >
  //       <div
  //         className="
  //           w-full max-w-6xl
  //           grid grid-cols-1

  //         "
  //       >
  //         <div
  //           className="
  //   h-[32rem] w-full
  //   rounded-2xl
  //   flex items-center justify-center
  //   bg-white/5
  //   backdrop-blur-xl
  //   border border-white/10
  // "
  //         >
  //           <Skeleton className="h-80 w-3/4 max-w-md rounded-3xl" />
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section
      id="main-feature"
      className="
    w-full
    flex items-center justify-center
    px-6 pt-18 py-28
    bg-zinc-50 dark:bg-[#0a0a0a]
    overflow-hidden
  "
    >
      {/* ===== LIQUID GLASS OUTER ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
      relative w-full sm:max-w-[60vw]
      rounded-4xl
      bg-white/40 dark:bg-white/10
      backdrop-blur-2xl
      border border-white/30 dark:border-white/10
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      px-6 py-20
    "
      >
        {/* ===== SECTION HEADING ===== */}
        <div className="relative z-20 text-center mb-10">
          {/* Heading */}
          <h2
            className="
      text-3xl sm:text-4xl
      font-semibold tracking-tight
      text-zinc-900 dark:text-zinc-100
    "
          >
            Leave a message
          </h2>

          {/* Username chip */}
          {username && username.length >= 2 && !allowEdit && (
            <div className="mt-4 flex justify-center items-center gap-3">
              <span className="text-sm sm:text-base font-medium text-zinc-700 dark:text-zinc-300">
                For
              </span>

              <Badge
                variant={"secondary"}
                className="px-2 inline-flex items-center gap-1.5 font-semibold text-white bg-blue-500 dark:bg-blue-600
           "
              >
                {username}
                <BadgeCheckIcon
                  className="
            h-4 w-4
            text-white
          "
                />
              </Badge>
            </div>
          )}

          {/* Supporting text */}
          <p
            className="
      mt-4 max-w-md mx-auto
      text-sm sm:text-base
      text-zinc-600 dark:text-zinc-400
    "
          >
            Share a thought, a question, or a kind note — completely anonymous.
          </p>
        </div>

        {/* ===== SOFT REFLECTION BLOBS ===== */}
        <div className="absolute -left-32 top-24 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl -z-10" />
        <div className="absolute -right-36 bottom-[-90px] h-72 w-72 rounded-full bg-violet-400/20 blur-3xl -z-10" />

        {/* ===== FROSTED INNER CARD ===== */}
        <div
          className="
        relative z-20
        mx-auto max-w-md
        rounded-2xl
        bg-white/75 dark:bg-zinc-900/70
        backdrop-blur-2xl
        border border-white/50 dark:border-white/10
        shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        p-8
      "
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Username"
                          disabled={!allowEdit}
                          className="
          bg-transparent
          text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-500
          border-zinc-300/70 dark:border-zinc-700
          focus-visible:ring-zinc-400
          font-semibold
        "
                        />
                      </FormControl>
                      {!allowEdit && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              disabled={isSending || isLoading}
                              onClick={handleEditUsername}
                              className="
            h-10 w-10
            bg-white/60 dark:bg-zinc-800/60
            border border-zinc-400/40 dark:border-white/10
            backdrop-blur-xl
            group
          "
                            >
                              <UserRoundPen className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Edit Username, leads to a new Page!!
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Your message..."
                        rows={8}
                        className="
            resize-none
            bg-transparent placeholder:select-none
            h-48
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-500 placeholder:tracking-wide placeholder:font-semibold
            border-zinc-300/70 dark:border-zinc-700
            focus-visible:ring-zinc-400
          "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                {/* SEND */}
                <Button
                  type="submit"
                  className="
      flex-1
      bg-zinc-900 text-white
      hover:bg-zinc-800 hover:scale-102
      dark:bg-white dark:text-zinc-900 select-none
      dark:hover:bg-zinc-200
      group
    "
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      Sending ...
                      <Spinner className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Send
                      <Send
                        className="
        ml-2 h-4 w-4
        origin-center
        rotate-6
        group-hover:-rotate-12
        group-hover:scale-[1.05] select-none
        transition-transform
        duration-200
        ease-out
      "
                      />
                    </>
                  )}
                </Button>

                {/* AI SUGGEST */}
                {!showSuggestions ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant={"outline"}
                        disabled={isSending || isLoading}
                        onClick={() => setShowSuggestions((v) => !v)}
                        className="
      px-4
      bg-white/60 dark:bg-zinc-800/60
      text-zinc-900 dark:text-zinc-100
      border border-zinc-400/40 dark:border-white/10
      backdrop-blur-xl
      hover:bg-white/80 dark:hover:bg-zinc-700/70
      group
    "
                      >
                        <Sparkles
                          className="
        h-4 w-4
        origin-center
        group-hover:scale-110
        transition-transform
        duration-200
      "
                        />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>AI suggessions</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={isSending || isLoading}
                        variant={"outline"}
                        type="button"
                        onClick={() => {
                          setShowSuggestions((v) => !v);
                        }}
                        className="
      px-4
      bg-white/60 dark:bg-zinc-800/60
      text-zinc-900 dark:text-zinc-100
      border border-zinc-400/40 dark:border-white/10
      backdrop-blur-xl
      hover:bg-white/80 dark:hover:bg-zinc-700/70
      group
    "
                      >
                        <X
                          className="
        h-4 w-4 text-red-500
        origin-center
        group-hover:scale-110
        transition-transform
        duration-200
      "
                        />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>Close AI Suggest</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </form>
          </Form>
        </div>
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
        mt-8 mx-auto max-w-md
        rounded-2xl
        bg-white/75 dark:bg-zinc-900/70
        backdrop-blur-2xl
        border border-white/50 dark:border-white/10
        shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        p-6
      "
            >
              <div className="flex items-center justify-center w-full mb-6">
                {/* Loader / Refresh */}

                <Form {...aiForm}>
                  <form
                    onSubmit={aiForm.handleSubmit(onRefreshSuggessions)}
                    className="space-y-6 w-full"
                  >
                    <FormField
                      control={aiForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Let the AI help you cast effective messages
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe here(optional)"
                              rows={8}
                              className="
            resize-none
            bg-transparent placeholder:select-none
            h-24
            text-zinc-900 dark:text-zinc-100
            placeholder:text-zinc-500 placeholder:tracking-wide placeholder:font-semibold
            border-zinc-300/70 dark:border-zinc-700
            focus-visible:ring-zinc-400
          "
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="
      flex-1 w-full
      bg-zinc-900 text-white
      hover:bg-zinc-800 hover:scale-102
      dark:bg-white dark:text-zinc-900 select-none
      dark:hover:bg-zinc-200
      group
    "
                      disabled={isSending || isLoading}
                    >
                      {isLoading ? (
                        <>
                          Thinking ...
                          <Spinner className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Suggest
                          <Sparkle
                            className="
        ml-2 h-4 w-4
        origin-center
        rotate-6
        group-hover:-rotate-12
        group-hover:scale-[1.05] select-none
        transition-transform
        duration-200
        ease-out
      "
                          />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex flex-col gap-4">{renderedSuggestions}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default MainFeature;

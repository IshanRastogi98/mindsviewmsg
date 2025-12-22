"use client";
import MessageCard from "@/components/MessageCard";
import React, { useCallback, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Message } from "@/model/user";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcceptMessageSchema } from "@/schemas/acceptingMessageSchema";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { errorToast, successToast } from "@/components/ui/sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { User } from "next-auth";
import { CopyTextButton } from "@/components/CopyTextButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  // Optimistic UI
  // update the f.e. immediately and handle the b.e. later
  // if any problem occurs when on b.e. then the ui again updated later(ie -> reverted back)

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id.toString() !== messageId)
    );

    // UI updated
  };
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof AcceptMessageSchema>>({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: true,
    },
  });
  const { watch, setValue, register } = form;
  // to have consitency in logic, as we are using RHF
  //    so we'll use that only here also in the toggle switch
  // toggle switch is also a form

  const acceptMessages = watch("acceptMessages"); // gives the live value of the accept-messages field

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitching(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/accept-messages`);
      if (response.data?.success) {
        setValue("acceptMessages", response.data.isAcceptingMessage ?? true);
      } else {
        errorToast({
          message: "Error",
          description:
            response.data?.message || "Something went wrong. Please try again.",
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
      setIsSwitching(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitching(false);

      try {
        const response = await axios.get(`/api/get-messages`);
        if (response.data?.success) {
          setMessages(response.data.messages || []);
          if (refresh) {
            successToast({
              message: "Refreshed Messages",
              description:
                "the Latest messages have been fetched successfully.",
            });
          }
        } else {
          errorToast({
            message: "Error",
            description:
              response.data?.message ||
              "Something went wrong. Please try again.",
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
        setIsSwitching(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  const hasFetched = React.useRef(false);

  useEffect(() => {
    if (!session?.user || hasFetched.current) return;

    fetchMessages();
    fetchAcceptMessage();
    hasFetched.current = true;
  }, [session, , setValue, fetchAcceptMessage, fetchMessages]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-messages`, {
        acceptMessages: !acceptMessages,
      });
      if (response.data?.success) {
        successToast({
          message: "Toggled Successfully",
          description: !acceptMessages
            ? "You are Accepting messages from now."
            : "You have stopped accepting the messages from now.",
        });
        setValue("acceptMessages", !acceptMessages);
      } else {
        errorToast({
          message: "Error Switching",
          description:
            response.data?.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      errorToast({
        message: "Error Switching",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  if (session === undefined) {
    return (
      <div
        className="
        w-full min-h-[60vh]
        flex items-center justify-center
        px-4
      "
      >
        <div
          className="
          w-full max-w-sm
          bg-white/80 dark:bg-zinc-900/80
          backdrop-blur-lg
          border border-zinc-200/70 dark:border-zinc-800/70
          rounded-2xl
          p-6
          shadow-lg
          flex flex-col items-center gap-4
        "
        >
          {/* Spinner */}
          <div
            className="
            w-10 h-10
            flex items-center justify-center
            rounded-full
            bg-zinc-100 dark:bg-zinc-800
          "
          >
            <Spinner />
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
              Signing you in
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Please wait a moment…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!session || !session.user) {
    return (
      <div
        className="
        w-full min-h-[60vh]
        flex items-center justify-center
        px-4
      "
      >
        <div
          className="
          w-full max-w-md
          bg-white dark:bg-zinc-800
          border border-zinc-200 dark:border-zinc-700
          rounded-xl p-6
          shadow-sm
          text-center
        "
        >
          <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            Not Signed In
          </h2>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Please sign in to view and manage your messages.
          </p>
        </div>
      </div>
    );
  }

  const { username } = session?.user as User;
  // do more research on how to find the base url and which is the best way
  // DONE
  const profileUrl = new URL(
    `/u/${username}`,
    process.env.NEXT_PUBLIC_BASE_URL ?? window.location.origin
  ).toString();

  return (
    <div
      className="
        w-full max-w-6xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-8
        flex flex-col gap-8
      "
    >
      {/* Share Link */}
      <section>
        <div
          className="
            bg-white dark:bg-zinc-800
            border border-zinc-200 dark:border-zinc-700
            rounded-xl p-5 shadow-sm
          "
        >
          <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Share Your Link
          </h3>
          <div
            className="
              mt-2 text-sm font-mono
              text-zinc-800 dark:text-zinc-100
              bg-zinc-100 dark:bg-zinc-900
              rounded-lg px-3 py-2 gap-2
              border border-zinc-200 dark:border-zinc-700
              flex w-full justify-between items-center
            "
          >
            <span className="break-all text-wrap flex-1">{profileUrl}</span>
            <CopyTextButton text={profileUrl} />
          </div>
        </div>
      </section>

      {/* Accept Messages */}
      <section>
        <div
          className="
            bg-white dark:bg-zinc-800
            border border-zinc-200 dark:border-zinc-700
            rounded-xl p-5 shadow-sm
            flex items-center justify-between
          "
        >
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              {acceptMessages ? "Accepting Messages" : "Not Accepting Messages"}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Toggle to allow or block new messages
            </p>
          </div>
          {/* toggle switch */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center">
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitching}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Status</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      {/* Messages */}
      <section
        id="messages"
        className=" flex flex-col bg-white dark:bg-zinc-800
            border border-zinc-200 dark:border-zinc-700
            rounded-xl p-5 shadow-sm
            mb-6"
      >
        {/* Header card */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Your Messages
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Anonymous messages sent to you
            </p>
          </div>

          {/* Loader / Refresh */}
          {isLoading ? (
            <div
              className="
        bg-zinc-100 dark:bg-zinc-900
        rounded-lg px-3 py-2
        border border-zinc-200 dark:border-zinc-700
      "
            >
              <Spinner />
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => fetchMessages(true)}
                  disabled={isLoading}
                  className="
                   bg-zinc-100 dark:bg-zinc-900
        rounded-lg px-3 py-2
        border border-zinc-200 dark:border-zinc-700
        flex items-center justify-center

        text-zinc-600 dark:text-zinc-300
        hover:bg-zinc-200 dark:hover:bg-zinc-800
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
                >
                  <RotateCw
                    className={`
          h-4 w-4
          ${isLoading ? "animate-spin" : ""}
        `}
                  />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>Refresh messages</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <Separator className="my-6" />

        {/* Messages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p
              className="
  col-span-full
  text-center
  text-sm
  text-zinc-500
  dark:text-zinc-400
  bg-zinc-100
  dark:bg-zinc-900/40
  border
  border-zinc-200
  dark:border-zinc-800
  rounded-xl
  py-6
"
            >
              {isLoading ? "Loading messages ..." : " No Messages Yet ..."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;

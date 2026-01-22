"use client";
import { useState } from "react";
import {
  Card,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/user";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { errorToast, successToast } from "./ui/sonner";
import { Spinner } from "./ui/spinner";
import { formatDate } from "@/helpers/FormatDate";
import { CopyTextButton } from "./CopyTextButton";
type MessageCardProps = {
  message: Message; // }; //   _id: string; // {
  onMessageDelete: (messageId: string) => void;
};
const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      if (response.data.success) {
        successToast({
          message: "Deleted Successfully",
          description: response.data.message,
        });
        onMessageDelete(message._id.toString());
      } else {
        errorToast({
          message: "Deletion Failed",
          description: response.data.message,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      errorToast({
        message: "Deletion Failed",
        description:
          axiosError.response?.data.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsDeleting(false);
      setIsOpen(false);
    }
  };
  return (
    <Card
      className="
    relative
    bg-zinc-50 dark:bg-zinc-900
    border border-zinc-200 dark:border-zinc-800
    rounded-2xl
    p-4
  "
    >
      {/* ───────── Top Row ───────── */}
      <div className="flex items-center justify-between gap-3">
        {/* Meta / sent time */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Received · {formatDate(message.createdAt.toString())}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Copy */}
          <CopyTextButton text={message.content} />

          {/* Delete */}
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </span>
              </TooltipTrigger>

              <TooltipContent>
                <p>Delete message</p>
              </TooltipContent>
            </Tooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete message?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Spinner />
                      <span className="ml-2">Deleting…</span>
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* ───────── Message Content Box ───────── */}
      <div
        className="
      mt-2
      rounded-xl
      bg-zinc-100 dark:bg-zinc-800
      border border-zinc-200 dark:border-zinc-700
      p-4
    "
      >
        <p className="text-sm text-zinc-800 dark:text-zinc-100 leading-relaxed">
          {message.content}
        </p>
      </div>
    </Card>
  );
};

export default MessageCard;

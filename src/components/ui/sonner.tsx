"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};



// custom toasts
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

interface SuccessToastOptions {
  message?: string;
  description?: string;
}

export function successToast({
  message = "Success",
  description = "The Process was Successful",
}: SuccessToastOptions) {
  toast.success(message, {
    description,
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    className:
      "bg-zinc-900/90 border border-zinc-700 text-zinc-200 shadow-xl backdrop-blur-md",
    duration: 5000,
    closeButton: true,
  });
}

interface ErrorToastOptions {
  message?: string;
  description?: string;
}

export function errorToast({
  message = "Error",
  description = "Something went wrong. Please try again.",
}: ErrorToastOptions) {
  toast.error(message, {
    description,
    icon: <XCircle className="w-5 h-5 text-red-400" />,
    className:
      "bg-zinc-900/90 border border-zinc-700 text-zinc-200 shadow-xl backdrop-blur-md",
    duration: 6000,
    closeButton: true,
  });
}
interface InfoToastOptions {
  message?: string;
  description?: string;
}

export function infoToast({
  message = "Info",
  description = "Here's some information.",
}: InfoToastOptions) {
  toast.info(message, {
    description,
    icon: <InfoIcon className="w-5 h-5 text-blue-400" />,
    className:
      "bg-zinc-900/90 border border-zinc-700 text-zinc-200 shadow-xl backdrop-blur-md",
    duration: 5000,
    closeButton: true,
  });
}

interface WarningToastOptions {
  message?: string;
  description?: string;
}

export function warningToast({
  message = "Warning",
  description = "Please be aware of this.",
}: WarningToastOptions) {
  toast.warning(message, {
    description,
    icon: <TriangleAlertIcon className="w-5 h-5 text-yellow-400" />,
    className:
      "bg-zinc-900/90 border border-zinc-700 text-zinc-200 shadow-xl backdrop-blur-md",
    duration: 6000,
    closeButton: true,
  });
}

export { Toaster };

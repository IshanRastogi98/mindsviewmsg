"use client";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { errorToast, successToast } from "./ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CopyTextButton({ text }: { text: string }) {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  //   Clipboard Fallback
  // The BIG problem with
  // navigator.clipboard.writeText()
  // (the useCopyToClipboard() aso uses the same)

  // ❌ Does NOT work when:
  // HTTP (not HTTPS)
  // Older browsers
  // Some mobile webviews

  // So we create a safe utility function.
  // where even if then also fail safely

  async function handleCopy() {
    const success = await copy(text);

    if (success) {
      successToast({ message: "Success", description: "Copied to clipboard" });
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } else {
      errorToast({
        message: "Failed to copy",
        description: "Clipboard not supported",
      });
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to Clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
}

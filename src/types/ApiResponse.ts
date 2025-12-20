import { Message } from "@/model/user";
import { messageSuggestionSchema } from "@/schemas/messageSuggestionSchema";
import { User } from "next-auth";
import * as z from "zod";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
  suggestions?: z.infer<typeof messageSuggestionSchema>;
  user?: {
    isVerified: boolean;
    isAcceptingMessages: boolean;
    username: string;
    email?: string;
  };
}

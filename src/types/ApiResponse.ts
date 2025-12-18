import { Message } from "@/model/user";
import { messageSuggestionSchema } from "@/schemas/messageSuggestionSchema";
import * as z from "zod";
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<Message>;
  suggestions?: z.infer<typeof messageSuggestionSchema>;
}

import { z } from "zod";

/**
 * Schema for a single anonymous message suggestion
 */
const singleSuggestionSchema = z.object({
  message: z
    .string()
    .min(5, "Message must contain at least 5 characters")
    .max(300, "Message must not exceed 300 characters")
    .describe(
      "A single anonymous message suggestion written in a natural, friendly, and human tone. It must be safe, non-intrusive, and suitable to send anonymously to a stranger."
    ),
});

/**
 * Schema for exactly three anonymous message suggestions
 */
export const suggestionSchema = z
  .array(singleSuggestionSchema)
  .length(3, "Exactly three message suggestions are required")
  .describe(
    "A list of exactly three anonymous message suggestions. Each message should feel unique in tone and wording, while remaining friendly, safe, and natural."
  );

/**
 * Final response schema returned by the AI
 */
export const messageSuggestionSchema = z.object({
  suggestions: suggestionSchema.describe(
    "Container holding the generated anonymous message suggestions."
  ),
});

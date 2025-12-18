import { descriptionSchema } from "@/schemas/descriptionSchema";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;
export const runtime = "edge";

export async function POST(request: Request) {
  try {
    let { description } = await request.json();
    const validationResult = descriptionSchema.safeParse({
      description,
    });
    if (!validationResult.success) {
      const { fieldErrors } = validationResult.error.flatten();

      // create clean readable message:
      const errorMessage =
        Object.values(fieldErrors).flat().join(", ") || "Invalid input";

      return Response.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 400 }
      );
    }
    description = validationResult.data.description;
    console.log("\ndesc", description.length, "\n");
    const PROMPT_WITH_DESCRIPTION = `
    You are generating anonymous user feedback messages for a social messaging app.

These messages should sound like real people sharing their honest opinions.
They must feel natural, casual, and human — not formal, not promotional, and not robotic.

User input (context only):
"{description}"

TASK:
Generate exactly 3 anonymous feedback messages based on the input.

WRITING STYLE RULES:
- Write in first person (I / me / my)
- Messages must be statements, NOT questions
- Sound like genuine personal feedback or impressions
- Keep the tone honest, conversational, and human
- Avoid exaggerated marketing language
- Avoid generic AI phrases like “overall experience”, “highly recommend”, etc.

DIVERSITY RULES:
- Each message should feel slightly different in phrasing and tone
- Do NOT repeat the same sentence structure
- Do NOT simply paraphrase line by line
- Vary emphasis (performance, feeling, reliability, smoothness, expectations, etc.)

LENGTH:
- Each message should be 1–3 sentences
- Concise, readable, and natural

EXAMPLE (for style reference only — do NOT copy wording):

Input:
"this product gemini 2.5 flash is good, more than expected"

Good outputs:
"Honestly, Gemini 2.5 Flash surprised me. It works really well, feels fast, and delivers better results than I expected. Overall, a solid and impressive product."

"Didn’t expect much at first, but Gemini 2.5 Flash turned out to be really good. It’s fast, smooth, and does the job better than I thought."

"Gemini 2.5 Flash is better than I expected. The performance feels smooth and reliable, and using it has been a genuinely good experience."

FORMAT (EXACT, no extra text):
Message 1 || Message 2 || Message 3

    `;
    const PROMPT_FALLBACK = `
   You are generating anonymous user feedback messages for a social messaging app.

There is NO specific user description available.
You must generate general-purpose anonymous feedback messages that could be sent by anyone.

These messages should sound like real people sharing honest thoughts.
They must feel natural, casual, and human — not formal, not promotional, and not robotic.

TASK:
Generate exactly 3 anonymous feedback messages.

CRITICAL ANTI-REPETITION RULES (VERY IMPORTANT):
- Each message MUST express a DIFFERENT idea or emphasis
- Do NOT restate the same opinion using different words
- Do NOT reuse the same sentence structure
- Do NOT repeat phrases, metaphors, or emotional framing
- If two messages feel similar, rewrite one until they are clearly different

WRITING STYLE RULES:
- Write in first person (I / me / my)
- Messages must be statements ONLY (NO questions)
- Sound like genuine personal feedback or impressions
- Keep the tone honest, conversational, and human
- Avoid exaggerated marketing language
- Avoid generic AI phrases like “overall experience”, “highly recommend”, “great product”, etc.

INTENT DIVERSITY (MANDATORY):
Each message must follow a different intent:
1️⃣ Personal impression or feeling  
2️⃣ Experience-based observation  
3️⃣ Reflective or opinionated statement  

LENGTH:
- Each message should be 1–3 sentences
- Concise, readable, and natural

EXAMPLE (style reference only — do NOT copy wording):

Good anonymous feedback messages:
"I didn’t expect much going in, but using this turned out to be a pretty positive experience."

"It feels nice when something actually works the way you hope it will, without extra hassle."

"This came across as thoughtfully made, and using it felt smooth and reliable."

FORMAT (EXACT, no extra text):
Message 1 || Message 2 || Message 3


    `;
    const prompt =
      description?.trim().length > 0
        ? PROMPT_WITH_DESCRIPTION
        : PROMPT_FALLBACK;

    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("AI API error:", error);

    return NextResponse.json(
      {
        error: true,
        message: error?.message || "Unknown AI error",
      },
      { status: 500 }
    );
  }
}

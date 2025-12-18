import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";
import { messageSchema } from "@/schemas/messageSchema";
import { rateLimit } from "@/lib/rateLimiter";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import { RATE_LIMITS } from "@/lib/rateLimitConfigs";

export async function POST(request: Request) {
  // check under limit or not
  const session = await getServerSession(authOptions);
  const identity =
    session?.user?._id ?? request.headers.get("x-forwarded-for") ?? "anonymous";
  const { max, windowMs } = RATE_LIMITS.SEND_MESSAGE;
  const { allowed, remaining } = rateLimit(identity, max, windowMs);
  if (!allowed) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Too many messages sent. Please slow down.",
      },
      { status: 429 }
    );
  }

  await connectDB();
  try {
    let { username, content } = await request.json();

    const result = messageSchema.safeParse({
      username: username,
      content: content,
    });
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();

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
    username = result.data.username;
    content = result.data.content;

    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found or User is not Accepting the messages",
        },
        { status: 403 }
      );
    }
    // is user accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User not found or User is not Accepting the messages",
        },
        {
          status: 403,
        }
      );
    }
    const newMessage = {
      content,
      createdAt: new Date(),
    };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message Sent Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Sending Message", error);
    return Response.json(
      {
        success: false,
        message: "Error Sending Message",
      },
      {
        status: 500,
      }
    );
  }
}

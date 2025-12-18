import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request: Request) {
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
          message: "User not found",
        },
        { status: 404 }
      );
    }
    // is user accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not Accepting the messages",
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

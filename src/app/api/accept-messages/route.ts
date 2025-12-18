import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import { AcceptMessageSchema } from "@/schemas/acceptingMessageSchema";

export async function POST(request: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User; // assertion as User
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  // validate request inputs
  let { acceptMessages } = await request.json();
  const result = AcceptMessageSchema.safeParse({
    acceptMessages,
  });
  if (!result.success) {
    const acceptingMessageError =
      result.error.format().acceptMessages?._errors || [];
    // result.error.format() has all the errors
    return Response.json(
      {
        success: false,
        message:
          acceptingMessageError.length > 0
            ? acceptingMessageError.join(", ")
            : "Invalid Fields",
      },
      { status: 400 }
    );
  }
  acceptMessages = result.data.acceptMessages;

  try {
    const userUpdated = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );
    if (!userUpdated) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Status Updated Successfully",
        user: userUpdated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to update user's status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to update user's status to accept messages",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  // console.log("\n\nsession from a m -> ",session)

  const user: User = session?.user as User; // assertion as User
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Status Returning Successfully",
        user: foundUser,
        isAcceptingMessage: foundUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get user's status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get user's status to accept messages",
      },
      { status: 500 }
    );
  }
}

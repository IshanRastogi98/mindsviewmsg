import { getServerSession } from "next-auth";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";
import { authOptions } from "../../auth/[...nextauth]/options";
import z from "zod";

const messageDeletionSchema = z.object({
  message_id: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid MongoDB ObjectId",
  }),
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ message_id: string }> }
  // Dynamic params are resolved here to get the message_id sent via dynamic params
) {
  let { message_id } = await params;
  const result = messageDeletionSchema.safeParse({
    message_id,
  });
  if (!result.success) {
    const messageIdError = result.error.format().message_id?._errors || [];
    // result.error.format() has all the errors
    return Response.json(
      {
        success: false,
        message:
          messageIdError.length > 0
            ? messageIdError.join(", ")
            : "Invalid Fields",
      },
      { status: 400 }
    );
  }
  message_id = result.data.message_id;

  // console.log("msg id ", message_id);
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  const user: User = session?.user as User;

  const user_id = new mongoose.Types.ObjectId(user._id); // since user._id = string
  // in aggregation pipeline writing this string to ObjectId is not handled automatically

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user_id },
      {
        $pull: {
          messages: { _id: new mongoose.Types.ObjectId(message_id) },
        },
      }
    );
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted.",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message Deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed delete messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed delete messages",
      },
      { status: 500 }
    );
  }
}

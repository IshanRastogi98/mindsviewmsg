import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
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
  const user_id = new mongoose.Types.ObjectId(user._id); // since user._id = string
  // in aggregation pipeline writing this string to ObjectId is not handled automatically

  try {
    const authenticatedUser = await UserModel.aggregate([
      { $match: { _id: user_id } },
      { $unwind: { path: "$messages", preserveNullAndEmptyArrays: true } },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    // console.log("authed_user:", authenticatedUser);
    if (!authenticatedUser || authenticatedUser.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Fetched messages successfully",
        messages: authenticatedUser[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Failed to get user's messages", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get user's messages",
      },
      { status: 500 }
    );
  }
}

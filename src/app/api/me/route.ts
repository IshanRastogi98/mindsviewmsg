import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

export async function GET(request: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !user) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User found",
        user: {
          username: user.username,
          email: user.email as string,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error fetching user",
      },
      { status: 500 }
    );
  }
}

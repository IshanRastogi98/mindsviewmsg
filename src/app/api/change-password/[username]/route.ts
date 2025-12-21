import { passwordValidation, usernameValidation } from "@/schemas/signUpSchema";
import { getServerSession, User } from "next-auth";
import z from "zod";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";

const changePasswordSchema = z.object({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
  username: usernameValidation,
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const body = await request.json();
  const { username } = await params;
  console.log("object", body, username);
  const result = changePasswordSchema.safeParse({ ...body, username });
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
  const oldPassword = result.data.oldPassword;
  const newPassword = result.data.newPassword;
  const validatedUsername = result.data.username;
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User; // assertion as User

    if (!session || !session?.user || user.username !== validatedUsername) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }
    const user_id = new mongoose.Types.ObjectId(user._id); // since user._id = string
    await connectDB();
    const authenticatedUser = await UserModel.findOne({ _id: user_id }).select(
      "+password"
    );

    if (!authenticatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      authenticatedUser.password as string
    );

    if (!isPasswordMatched) {
      return Response.json(
        {
          success: false,
          message: "Wrong Password",
        },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    authenticatedUser.password = hashedPassword;
    await authenticatedUser.save();

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Password updated Successfully",
    });
  } catch (error) {
    console.error("Error Changing Password", error);
    return Response.json(
      {
        success: false,
        message: "Error Changing Password",
      },
      {
        status: 500,
      }
    );
  }
}

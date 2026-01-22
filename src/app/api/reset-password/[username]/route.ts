import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchemas";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const body = await request.json();
  const { username } = await params;
  const { searchParams } = new URL(request.url);
  // URLSearchParams is a Web API that provides utility methods
  const token = searchParams.get("token");

  const result = resetPasswordSchema.safeParse({
    newPassword: body.newPassword,
    token,
    username,
  });
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();

    // create clean readable message:
    const errorMessage =
      Object.values(fieldErrors).flat().join(", ") || "Invalid input";

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: errorMessage,
      },
      { status: 400 }
    );
  }

  const newPassword = result.data.newPassword;
  const validatedUsername = result.data.username;
  const resetToken = result.data.token;

  try {
    await connectDB();
    const user = await UserModel.findOne({
      username: validatedUsername,
    }).select("+password");

    if (!user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isResetTokenMatched = user.resetToken === resetToken;
    const isResetTokenNotExpired = user.resetTokenExpiry
      ? new Date(user.resetTokenExpiry) > new Date()
      : false;
    // both true change the pwd
    if (isResetTokenMatched && isResetTokenNotExpired) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: "Password reset successfully",
        },
        { status: 200 }
      );
    }
    // if token expired
    else if (!isResetTokenNotExpired) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Reset token has expired. Please try again.",
        },
        { status: 400 }
      );
    } else if (!isResetTokenMatched) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid reset token.",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid or expired reset token.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error Resetting Password", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error Resetting Password",
      },
      {
        status: 500,
      }
    );
  }
}

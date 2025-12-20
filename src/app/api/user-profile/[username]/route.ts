import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import { usernameValidation } from "@/schemas/signUpSchema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  await connectDB();

  const { username } = await params;

  const result = usernameValidation.safeParse(username);
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

  const validatedUsername = result.data;

  try {
    const user = await UserModel.findOne({ username: validatedUsername });

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
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Error fetching user profile",
      },
      { status: 500 }
    );
  }
}

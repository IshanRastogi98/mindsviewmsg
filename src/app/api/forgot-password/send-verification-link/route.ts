import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/ApiResponse";
import crypto from "crypto";
import { resetPasswordEmailBrevo } from "@/helpers/sendVerificationEmail";
import { identifierValidationSchema } from "@/schemas/resetPasswordSchemas";

export async function POST(request: Request) {
  const { rawIdentifier } = await request.json();
  const result = identifierValidationSchema.safeParse({
    identifier: rawIdentifier,
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
      { status: 400 },
    );
  }
  const identifier = result.data.identifier;

  let user = null;

  try {
    await connectDB();
    user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    if (user.resetTokenExpiry && new Date(user.resetTokenExpiry) > new Date()) {
      return Response.json(
        {
          success: false,
          message:
            "A password reset request has already been sent. Please check your email or try again later.",
        },
        { status: 429 },
      );
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    // if (!baseUrl) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "Base URL not found in environment variables",
    //     },
    //     { status: 500 }
    //   );
    // }
    const resetUrl = new URL(
      `/reset-password/${user.username}?token=${encodeURIComponent(resetToken)}`,
      baseUrl,
    ).toString();

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    user.save();

    // const emailResendResponse = await resetPasswordEmail(
    //   user.email as string,
    //   user.username,
    //   resetUrl
    // ); // resend version

    const emailResendResponse = await resetPasswordEmailBrevo(
      user.email as string,
      user.username,
      resetUrl,
    ); // Brevo Version

    if (!emailResendResponse.success) {
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      user.save();
      console.error(
        "\n\nError sending Reset Password Request",
        emailResendResponse,
      );

      return Response.json(
        {
          success: false,
          message: "error sending email " + emailResendResponse.message,
        },
        { status: 500 },
      );
    }
    // finally successful
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Reset Password Request Successfully, if the user exists",
      },
      { status: 200 },
    );
  } catch (error) {
    if (user) {
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      user.save();
    }
    console.error("Error sending Reset Password Request", error);
    return Response.json(
      {
        success: false,
        message: "Error sending Reset Password Request",
      },
      {
        status: 500,
      },
    );
  }
}

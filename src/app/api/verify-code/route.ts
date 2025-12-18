import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { verifyCodeSchema } from "@/schemas/verifySchema";
import z from "zod";

export async function POST(request: Request) {
  await connectDB();

  try {
    let body = await request.json();

    const result = verifyCodeSchema.safeParse(body);

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

    const { username, verifyCode, email } = result.data;

    const user = await UserModel.findOne({
      username,
      email,
      isVerified: false,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    console.log(verifyCode, user.verifyCode);
    const isCodeValid = verifyCode === user.verifyCode;
    const iscodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && iscodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User Verified Successfully",
        },
        { status: 200 }
      );
    } else if (!iscodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification Code Expired",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Wrong Verification Code",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error Verifying User", error);
    return Response.json(
      {
        success: false,
        message: "Error Verifying User",
      },
      { status: 500 }
    );
  }
}

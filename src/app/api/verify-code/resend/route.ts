import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const validationSchema = z.object({
  username: usernameValidation,
  email: z.email({ message: "Invalid Email Address" }),
});

export async function POST(request: Request) {
  await connectDB();
  try {
    let { username, email } = await request.json();
    const result = validationSchema.safeParse({
      username,
      email,
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
    email = result.data.email;

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

    let otp = "";
    // 1-> if otp not expired , return same one
    if (new Date(user.verifyCodeExpiry) > new Date()) {
      otp = user.verifyCode;
    } else {
      // if expired generate new one and send that one
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.verifyCodeExpiry = expiryDate;
      user.verifyCode = otp;
      await user.save();
    }

    const emailResendResponse = await sendVerificationEmail(
      email,
      username,
      otp
    );
    if (!emailResendResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResendResponse.message,
        },
        { status: 500 }
      );
    }
    // finally successful
    return Response.json(
      {
        success: true,
        message: "Verification Email re-sent",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Resending the verification code", error);
    return Response.json(
      {
        success: false,
        message: "Error in Resending the verification code",
      },
      { status: 500 }
    );
  }
}

import connectDB from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs";
import {
  sendVerificationEmail,
  sendVerificationEmailBrevo,
} from "@/helpers/sendVerificationEmail";
import { signUpSchema } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  await connectDB();

  try {
    let { username, email, password } = await request.json();
    if (!username || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "All Fields are mandatory",
        },
        { status: 400 }
      );
    }

    const result = signUpSchema.safeParse({
      username: username,
      email: email,
      password: password,
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
    password = result.data.password;

    const existingUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingUserByUsername?.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({
      email,
    });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email is already taken",
          },
          { status: 400 }
        );
      } else {
        // new password and otp
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.username = username;
        existingUserByEmail.verifyCode = otp;
        console.log("new otp->", otp, existingUserByEmail.verifyCode);
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      // now can register with new data
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      if (existingUserByUsername) {
        existingUserByUsername.email = email;
        existingUserByUsername.password = hashedPassword;
        existingUserByUsername.verifyCode = otp;
        existingUserByUsername.verifyCodeExpiry = expiryDate;
        await existingUserByUsername.save();
      } else {
        const newUser = new UserModel({
          username,
          email,
          password: hashedPassword,
          verifyCode: otp,
          verifyCodeExpiry: expiryDate,
          message: [],
        });
        await newUser.save();
      }
    }
    // const emailResendResponse = await sendVerificationEmail(
    //   email,
    //   username,
    //   otp
    // ); // resend version
    const emailResendResponse = await sendVerificationEmailBrevo(
      email,
      username,
      otp
    ); // Brevo Version

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
        message: "User Registered Successfully and Verification Email sent",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Registring user", error);
    return Response.json(
      {
        success: false,
        message: "Error Registring user",
      },
      {
        status: 500,
      }
    );
  }
}

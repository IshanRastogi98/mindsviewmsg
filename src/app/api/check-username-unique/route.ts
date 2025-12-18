import connectDB from "@/lib/dbConnect";
import { RATE_LIMITS } from "@/lib/rateLimitConfigs";
import { rateLimit } from "@/lib/rateLimiter";
import UserModel from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";
import { authOptions } from "../auth/[...nextauth]/options";

// schema -> to check a obj(of single or multi fields)
// Username(to validsta so) + Query(data from query params) + Schema((zod)schemas are used)
const UsernameQuerySchema = z.object({
  username: usernameValidation, // validate if the username follows the requirements
});
// get route to check if the username available
export async function GET(request: Request) {
  // check under limit or not
  const session = await getServerSession(authOptions);
  const identity =
    session?.user?._id ?? request.headers.get("x-forwarded-for") ?? "anonymous";
  const { max, windowMs } = RATE_LIMITS.USERNAME_CHECK;
  const { allowed, remaining } = rateLimit(identity, max, windowMs);
  if (!allowed) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Too many messages sent. Please slow down.",
      },
      { status: 429 }
    );
  }

  await connectDB();

  try {
    const { searchParams } = new URL(request.url); // all params
    const usernameEncoded = searchParams.get("username");
    const queryParam = {
      // for extracting from endoded urls ( eg -> ' ' => 20%, etc)
      username: decodeURIComponent(usernameEncoded || ""),
    }; // required params
    // e.g. -> localhost:300X/api/check-username-unique?username=xyz?phone=android

    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    // invalid format
    if (!result.success) {
      const usernameError = result.error.format().username?._errors || [];
      // result.error.format() has all the errors
      return Response.json(
        {
          success: false,
          message:
            usernameError.length > 0
              ? usernameError.join(", ")
              : "Invalid username",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    // un-available
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    // available
    return Response.json(
      {
        success: true,
        message: "Username Available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking uniqueness of username", error);
    return Response.json(
      {
        success: false,
        message: "Error checking uniqueness of username",
      },
      { status: 500 }
    );
  }
}

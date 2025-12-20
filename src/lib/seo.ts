import { usernameValidation } from "@/schemas/signUpSchema";
import connectDB from "./dbConnect";
import UserModel from "@/model/user";

export async function checkIfUsernameHasMessages(
  username: string
): Promise<boolean> {
  const validationResult = usernameValidation.safeParse({
    username,
  });
  if (!validationResult.success) {
    return false;
  }
  const validatedUsername = validationResult.data;
  await connectDB();
  const result = await UserModel.aggregate([
    {
      $match: { username: validatedUsername },
    },
    {
      $project: {
        messageCount: {
          $size: {
            $ifNull: ["$messages", []],
          },
        },
      },
    },
    {
      $limit: 1,
    },
  ]);

  if (!result.length) return false;

  return result[0].messageCount > 0;
}

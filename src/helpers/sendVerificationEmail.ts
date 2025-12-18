import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { error } from "console";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const resp = await resend.emails.send({
      from: "Mystry Msg <noreply@resend.dev>",
      to: email,
      subject: "Mystry Msg | Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    // Resend returns { error: Error | null, data: ... }
    if (resp.error) {
      throw new Error(resp.error.message || "Unknown email error");
    }
    return {
      success: true,
      message: "Verification Email Sent Successfully",
    };
  } catch (emailError) {
    console.error("Error Sending the Verification Email", emailError);
    return {
      success: false,
      message: "Failed to send Verification Email: ",
    };
  }
}

import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { render } from "@react-email/render";
import ResetPasswordEmail from "../../emails/ForgotPasswordVerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const resp = await resend.emails.send({
      from: "MindsViewMsg <noreply@resend.dev>",
      to: email,
      subject: "MindsViewMsg | Verification Code",
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
export async function resetPasswordEmail(
  email: string,
  username: string,
  resetUrl: string
): Promise<ApiResponse> {
  try {
    const resp = await resend.emails.send({
      from: "MindsViewMsg <noreply@resend.dev>",
      to: email,
      subject: "MindsViewMsg | Reset Password Request",
      react: ResetPasswordEmail({ username, resetUrl }),
    });
    // Resend returns { error: Error | null, data: ... }
    if (resp.error) {
      throw new Error(resp.error.message || "Unknown email error");
    }
    return {
      success: true,
      message: "Reset Password Request Sent Successfully",
    };
  } catch (emailError) {
    console.error("Error Sending the Reset Password Request", emailError);
    return {
      success: false,
      message: "Failed to send Reset Password Request ",
    };
  }
}

export async function sendVerificationEmailBrevo(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // 1️⃣ Convert React email → HTML
    const htmlContent = await render(
      VerificationEmail({ username, otp: verifyCode })
    );

    // 2️⃣ Send via Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "MindsViewMsg",
          email: process.env.BREVO_SENDER_EMAIL!, // e.g. noreply@mindsviewmsg.com
        },
        to: [{ email }],
        subject: "MindsViewMsg | Verification Code",
        htmlContent,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return {
      success: true,
      message: "Verification Email Sent Successfully",
    };
  } catch (emailError) {
    console.error("Error Sending the Verification Email", emailError);
    return {
      success: false,
      message: "Failed to send Verification Email",
    };
  }
}
export async function resetPasswordEmailBrevo(
  email: string,
  username: string,
  resetUrl: string
): Promise<ApiResponse> {
  try {
    // 1️⃣ Convert React email → HTML
    const htmlContent = await render(
      ResetPasswordEmail({ resetUrl, username })
    );

    // 2️⃣ Send via Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY!,
      },
      body: JSON.stringify({
        sender: {
          name: "MindsViewMsg",
          email: process.env.BREVO_SENDER_EMAIL!, // e.g. noreply@mindsviewmsg.com
        },
        to: [{ email }],
        subject: "MindsViewMsg | Reset Password Request",
        htmlContent,
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return {
      success: true,
      message: "Reset Password Request Sent Successfully",
    };
  } catch (emailError) {
    console.error("Error Sending the Reset Password Request", emailError);
    return {
      success: false,
      message: "Failed to send Reset Password Request",
    };
  }
}

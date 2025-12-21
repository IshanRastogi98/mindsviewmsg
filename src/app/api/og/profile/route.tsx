import { usernameValidation } from "@/schemas/signUpSchema";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";
export const revalidate = 60 * 60 * 24; // 24 hours

/**
 * OG Image Generator for /profile/:username
 * Returns ONLY an image (never JSON)
 */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawUsername = searchParams.get("username") || "";
    const parsedUsername = decodeURIComponent(rawUsername);

    // ---- VALIDATION (server-only, silent) ----
    const result = usernameValidation.safeParse(parsedUsername);
    const username = !result.success ? "someone" : (result.data ?? rawUsername);

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          backgroundColor: "#020617",
          color: "#ffffff",
        }}
        tw="font-sans"
      >
        {/* BACKGROUND */}
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/og-default.png`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* CONTENT WRAPPER */}
        <div
          style={{
            display: "flex", // ✅ REQUIRED
            alignItems: "center",
            gap: 14,
            position: "relative",
          }}
          tw="w-full h-full flex-col-reverse"
        >
          {/* USERNAME */}
          <div
            style={{
              display: "flex", // ✅ REQUIRED
              fontSize: 42,
              fontWeight: "bolder",
              opacity: 0.9,
            }}
            tw="mx-auto mb-24"
          >
            @{username}
          </div>

          {/* CONTEXT LABEL */}
          <div
            style={{
              display: "flex",
              fontSize: 22,
              opacity: 0.75,
              letterSpacing: "0.02em",
            }}
            tw="mx-auto"
          >
            Public Profile · MindsViewMsg
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(e?.message ?? "OG Profile generation failed");

    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}

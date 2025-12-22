// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/context/AuthProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "2-ZxkCTdRS2Gdv8sLaPG8v9ihSIT0YeWCb5MGTy_at4",
  },
  title: {
    default:
      "MindsViewMsg - Privacy-First Anonymous Messaging. Say Anything. Stay Anonymous.",
    template: "%s | MindsViewMsg",
  },
  description:
    "MindsViewMsg is a privacy-focused anonymous messaging platform that lets users receive honest messages without revealing identity.",
  keywords: [
    "anonymous messaging",
    "anonymous messages",
    "privacy focused messaging",
    "send anonymous messages",
  ],
  openGraph: {
    type: "website",
    siteName: "MindsViewMsg",
    title:
      "MindsViewMsg - Privacy-First Anonymous Messaging. Say Anything. Stay Anonymous.",
    description:
      "Say Anything. Stay Anonymous. Send and receive anonymous messages securely with a privacy-first approach.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "MindsViewMsg – Anonymous Messaging. Say Anything. Stay Anonymous.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "MindsViewMsg - Privacy-First Anonymous Messaging. Say Anything. Stay Anonymous.",
    description:
      "Say Anything. Stay Anonymous. Send and receive anonymous messages securely with a privacy-first approach.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/og-default.png`],
  },

  authors: [{ name: "MindsViewMsg Team" }],
  creator: "MindsViewMsg",
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL,

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

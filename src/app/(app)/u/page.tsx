import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MainFeature from "@/components/MainFeature";
import { Session } from "next-auth";
import { Metadata } from "next";

type PageProps = {
  searchParams: Promise<{
    username?: string;
  }>;
};
export const metadata: Metadata = {
  title: "Send Anonymous Messages. Say Anything. Stay Anonymous.",
  description:
    "Send anonymous messages to anyone without revealing your identity on MindsViewMsg. Share thoughts, feedback, or confessions securely and privately.",

  alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/u` },

  openGraph: {
    type: "website",
    title: "Send Anonymous Messages",
    description:
      "Send anonymous messages to anyone without revealing your identity on MindsViewMsg. Share thoughts, feedback, or confessions securely and privately.",

    url: `${process.env.NEXT_PUBLIC_BASE_URL}/u`,
    siteName: "MindsViewMsg",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/user?username=${encodeURIComponent("")}`,
        width: 1200,
        height: 630,
        alt: `Send anonymous messages to Anyone`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Send Anonymous Messages",
    description:
      "Send anonymous messages to anyone without revealing your identity on MindsViewMsg. Share thoughts, feedback, or confessions securely and privately.",

    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/user?username=${encodeURIComponent("")}`,
    ],
  },
};

export default async function Page({ searchParams }: PageProps) {
  const session: Session | null = await getServerSession(authOptions);
  const { username } = await searchParams;
  // console.log(username);
  return <MainFeature session={session} username={username} allowEdit={true} />;
}

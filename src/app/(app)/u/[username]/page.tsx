import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MainFeature from "@/components/MainFeature";
import { Session } from "next-auth";
import { Metadata } from "next";
import { checkIfUsernameHasMessages } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;

  if (!username || username.length < 2) {
    return {
      title: "Username Invalid | MindsViewMsg",
      robots: { index: false, follow: false },
    };
  }

  const shouldIndex = await checkIfUsernameHasMessages(username);
  const title = `Send Anonymous Messages to ${username}`;
  const description = `Send anonymous messages to ${username} on MindsViewMsg. Messages are private and identity is not revealed.`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`;
  const ogImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/user?username=${encodeURIComponent(username)}`;

  if (!shouldIndex) {
    return {
      title,
      description,
      robots: { index: false, follow: true },
    };
  }

  return {
    title,
    description,
    alternates: { canonical: url },

    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: "MindsViewMsg",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Send anonymous messages to ${username}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  const session: Session | null = await getServerSession(authOptions);

  // console.log("username came to be:", username); // ✅ "i"

  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center mt-12">
        Send Anonymous messages to{" "}
        <span className="text-blue-500 dark:text-blue-400">{username}</span>
      </h1>
      <p
        className="
        mt-4 max-w-md mx-auto
        text-sm sm:text-base
        text-zinc-600 dark:text-zinc-400
        text-center
      "
      >
        You can send anonymous messages to{" "}
        <span className="text-blue-500 dark:text-blue-400">{username}</span>.
        Messages are private and do not reveal the sender’s identity.
      </p>
      <MainFeature session={session} username={username} allowEdit={false} />
    </>
  );
}

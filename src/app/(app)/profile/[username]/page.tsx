import { Metadata } from "next";
import { notFound } from "next/navigation";

import ProfileClient from "../ProfileClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `${username} — MindsViewMsg`,
    description: `Send anonymous messages to ${username}. Private, secure, and anonymous.`,
    openGraph: {
      title: `${username} — MindsViewMsg`,
      description: "Anonymous messaging with privacy-first design.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}`,
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  if (!username) notFound();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-24 flex justify-center">
      <section className="w-full max-w-xl space-y-6">
        {/* SERVER-RENDERED PROFILE SHELL */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
            {/* LCP ELEMENT */}
            <h1 className="text-2xl font-semibold">@{username}</h1>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Receive honest, anonymous messages.
            </p>

            {/* SAFE DEFAULT BADGES */}
            <div className="flex gap-2">
              <Badge variant="secondary">Anonymous</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>

            {/* CLIENT ENHANCEMENT */}
            <ProfileClient profileUsername={username} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

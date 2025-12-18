"use client";
import MainFeature from "@/components/MainFeature";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const username: string | null = searchParams.get("username");

  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <MainFeature username={username ? username : undefined} />
    </main>
  );
};

export default page;

import { Suspense } from "react";
import UClient from "./u-client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <UClient />
    </Suspense>
  );
}

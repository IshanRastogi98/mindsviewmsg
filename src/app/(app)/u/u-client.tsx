"use client";
import MainFeature from "@/components/MainFeature";
import { useSearchParams } from "next/navigation";

export default function UClient() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <MainFeature username={username ?? undefined} />
    </main>
  );
}

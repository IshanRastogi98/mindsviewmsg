"use client";
import MainFeature from "@/components/MainFeature";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;

  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <MainFeature username={username || undefined} allowEdit={false} />
    </main>
  );
};

export default page;

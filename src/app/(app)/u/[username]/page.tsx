import MainFeature from "@/components/MainFeature";

type PageProps = {
  params: {
    username: string;
  };
};

export default function Page({ params }: PageProps) {
  const username = params.username;

  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <MainFeature username={username} allowEdit={false} />
    </main>
  );
}

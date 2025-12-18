import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MainFeature from "@/components/MainFeature";
import { Session } from "next-auth";

type PageProps = {
  searchParams: Promise<{
    username?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const session: Session | null = await getServerSession(authOptions);
  const { username } = await searchParams;
  // console.log(username);
  return <MainFeature session={session} username={username} allowEdit={true} />;
}

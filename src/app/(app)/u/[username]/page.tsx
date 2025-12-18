import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MainFeature from "@/components/MainFeature";
import { Session } from "next-auth";

type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { username } = await params;

  const session: Session | null = await getServerSession(authOptions);

  // console.log("username came to be:", username); // ✅ "i"

  return (
    <MainFeature session={session} username={username} allowEdit={false} />
  );
}

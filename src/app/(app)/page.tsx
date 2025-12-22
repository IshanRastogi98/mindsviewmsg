import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Anonymous Messaging Platform",
  description:
    "Send and receive anonymous messages securely with MindsViewMsg. No login required. Privacy-first anonymous messaging.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
};

export default function Page() {
  return <HomeClient />;
}

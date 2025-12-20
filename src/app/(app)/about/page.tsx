import AboutClient from "./AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MindsViewMsg",
  description:
    "Learn about MindsViewMsg, a privacy-first anonymous messaging platform built to encourage honest and secure communication.",
  openGraph: {
    title: "About MindsViewMsg",
    description:
      "Learn about MindsViewMsg, a privacy-first anonymous messaging platform.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },

  twitter: {
    card: "summary_large_image",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

import { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ | MindsViewMsg",
  description:
    "Find answers to common questions about MindsViewMsg, anonymous messaging, privacy, security, and how the platform works.",
  openGraph: {
    title: "FAQ | MindsViewMsg",
    description:
      "Frequently asked questions about MindsViewMsg and anonymous messaging.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
  },
  twitter: {
    card: "summary_large_image",
  },
};

const page = () => {
  return <FaqClient />;
};

export default page;

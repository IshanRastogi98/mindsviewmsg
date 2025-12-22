import TermsPageClient from "./TermsPageClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Terms of Service | MindsViewMsg",
  description:
    "Review the terms and conditions for using MindsViewMsg, including user responsibilities and platform usage guidelines.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/terms-of-service`,
  },
  openGraph: {
    title: "Terms of Service | MindsViewMsg",
    description:
      "Terms and conditions for using the MindsViewMsg platform.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/terms-of-service`,
  },
  twitter: {
    card: "summary_large_image",
  },
};


const page = () => {
  return <TermsPageClient />;
};

export default page;

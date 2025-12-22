import PrivacyClient from "./PrivacyClient";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Privacy Policy | MindsViewMsg",
  description:
    "Read how MindsViewMsg protects your privacy, handles data responsibly, and ensures anonymous and secure communication.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | MindsViewMsg",
    description:
      "Understand how MindsViewMsg protects user privacy and data.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
  },
  twitter: {
    card: "summary_large_image",
  },
};


export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}

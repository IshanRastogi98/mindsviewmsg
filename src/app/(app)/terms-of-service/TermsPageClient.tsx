"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  User,
  AlertTriangle,
  Ban,
  RefreshCcw,
  Lock,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export default function TermsPageClient() {
  return (
    <>
      <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {/* ================= HERO ================= */}
        <section className="w-full px-6 py-28 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl text-center flex flex-col gap-6"
          >
            <FileText className="w-8 h-8 mx-auto text-zinc-700 dark:text-zinc-300" />

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Terms of Service
            </h1>

            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              These terms exist to keep MindsViewMsg safe, fair, and respectful
              — while preserving anonymity and simplicity.
            </p>
          </motion.div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="w-full px-6 py-24 flex justify-center">
          <div className="w-full max-w-5xl flex flex-col gap-16">
            {/* ===== SECTION 1 ===== */}
            <TermsBlock
              icon={User}
              title="Eligibility & Accounts"
              content={[
                "You must be at least 13 years old to use the service.",
                "Account owners are responsible for securing their credentials.",
                "Senders may use the service without creating an account.",
              ]}
            />

            {/* ===== SECTION 2 ===== */}
            <TermsBlock
              icon={ShieldCheck}
              title="Acceptable Use"
              content={[
                "Use the service respectfully and in compliance with applicable laws.",
                "Do not harass, threaten, or abuse other users.",
                "Do not attempt to bypass security controls, rate limits, or safeguards.",
              ]}
            />

            {/* ===== SECTION 3 ===== */}
            <TermsBlock
              icon={Ban}
              title="Prohibited Content & Activities"
              content={[
                "Hate speech, threats, or incitement of violence.",
                "Illegal content or encouragement of unlawful activity.",
                "Spam, scams, phishing attempts, or malicious links.",
                "Attempts to deanonymize users or exploit AI features.",
              ]}
              note="Violations may result in content removal, access restrictions, or account termination."
            />

            {/* ===== SECTION 4 ===== */}
            <TermsBlock
              icon={Lock}
              title="Anonymity & Responsibility"
              content={[
                "The platform is designed to protect user anonymity by default.",
                "Absolute anonymity cannot be guaranteed in all circumstances.",
                "Users are responsible for the messages they choose to send.",
              ]}
            />

            {/* ===== SECTION 5 ===== */}
            <TermsBlock
              icon={AlertTriangle}
              title="Service Availability & Disclaimer"
              content={[
                "The service is provided on an “as-is” and “as-available” basis.",
                "We strive to maintain availability and security, but uninterrupted service is not guaranteed.",
                "We are not liable for user-generated content or misuse by others.",
              ]}
            />

            {/* ===== SECTION 6 ===== */}
            <TermsBlock
              icon={RefreshCcw}
              title="Changes to These Terms"
              content={[
                "We may update these Terms of Service from time to time.",
                "Updates will be reflected on this page with a revised date.",
                "Continued use of the service constitutes acceptance of updated terms.",
              ]}
            />
          </div>
        </section>

        {/* ================= FOOTER NOTE ================= */}
        <section className="w-full px-6 py-24 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
              w-full max-w-4xl
              rounded-3xl
              bg-zinc-100 dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              px-8 py-12
              text-center
            "
          >
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              These terms are written to be clear and understandable.
              <br />
              If something feels unclear or unfair, we encourage you to reach
              out.
            </p>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />
      </main>
    </>
  );
}

/* ================= SUB COMPONENT ================= */

function TermsBlock({
  icon: Icon,
  title,
  content,
  note,
}: {
  icon: any;
  title: string;
  content: string[];
  note?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="
        rounded-3xl
        bg-zinc-100 dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        p-8
        flex flex-col gap-4
      "
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
      </div>

      <Separator />

      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        {content.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>

      {note && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">{note}</p>
      )}
    </motion.div>
  );
}

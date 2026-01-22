"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  UserX,
  AlertTriangle,
  Shield,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export default function PrivacyClient() {
  return (
    <>

      <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {/* ================= HERO ================= */}
       <section className="w-full px-6 py-28 flex justify-center">
          <div className="w-full max-w-4xl text-center flex flex-col gap-6">
            
            <ShieldCheck className="w-8 h-8 mx-auto text-zinc-700 dark:text-zinc-300" />

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Privacy Policy
            </h1>

            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              MindsViewMsg is built on anonymity by design. This page clearly
              explains what we collect, what we intentionally avoid collecting,
              and how your privacy is protected.
            </p>
          </div>
        </section>

        {/* ================= CONTENT ================= */}
        <section className="w-full px-6 py-24 flex justify-center">
          <div className="w-full max-w-5xl flex flex-col gap-16">
            {/* ===== SECTION 1 ===== */}
            <PolicyBlock
              icon={EyeOff}
              title="Information We Do NOT Collect"
              content={[
                "We do not collect real names, phone numbers, or personal identifiers from message senders.",
                "We do not log message content for analytics or monitoring.",
                "We do not store IP addresses, device fingerprints, or tracking identifiers.",
                "We do not use advertising trackers or third-party profiling tools.",
              ]}
            />

            {/* ===== SECTION 2 ===== */}
            <PolicyBlock
              icon={Database}
              title="Information We May Collect"
              content={[
                "Username and email address for account owners (listeners) only.",
                "Encrypted authentication credentials (never stored in plaintext).",
                "Minimal technical logs required for security and abuse prevention.",
              ]}
              note="Security logs include route accessed, error category, and timestamp only. Logs are short-lived and never used for profiling."
            />

            {/* ===== SECTION 3 ===== */}
            <PolicyBlock
              icon={Lock}
              title="How We Use Data"
              content={[
                "To authenticate users securely and protect accounts.",
                "To deliver anonymous messages to the correct inbox.",
                "To prevent spam, abuse, automated attacks, and denial-of-service attempts.",
              ]}
            />

            {/* ===== SECTION 4 ===== */}
            <PolicyBlock
              icon={Shield}
              title="Security & Anonymity Measures"
              content={[
                "Passwords are hashed using bcrypt with strong cost factors.",
                "Email verification prevents fake or automated accounts.",
                "Sessions are protected using HttpOnly and Secure cookies.",
                "CSRF protection, rate limiting, authorization checks, and input validation are enforced.",
                "AI-generated features are protected against prompt-injection attacks.",
              ]}
            />

            {/* ===== SECTION 5 ===== */}
            <PolicyBlock
              icon={UserX}
              title="No Selling, No Sharing"
              content={[
                "We never sell user data.",
                "We never rent or trade information.",
                "We never share messages with advertisers or third parties.",
              ]}
            />

            {/* ===== SECTION 6 ===== */}
            <PolicyBlock
              icon={AlertTriangle}
              title="Data Control & Deletion"
              content={[
                "Account owners can delete messages at any time.",
                "Accounts and associated data can be removed upon request.",
                "Deleted data is permanently removed from active systems.",
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
            <div className="text-sm text-zinc-600 dark:text-zinc-400 flex text-left justify-center">
              <div className="flex flex-col gap-1 items-start">
                <span>Hence,</span>
                <div className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Say Anything.
                  <span className="block text-zinc-600 dark:text-zinc-400">
                    Stay Anonymous.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />
      </main>
    </>
  );
}

/* ================= SUB COMPONENT ================= */

function PolicyBlock({
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

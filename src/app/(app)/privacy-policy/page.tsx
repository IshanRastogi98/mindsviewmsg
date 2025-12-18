"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  UserX,
  AlertTriangle,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* ================= HERO ================= */}
      <section className="w-full px-6 py-28 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl text-center flex flex-col gap-6"
        >
          <ShieldCheck className="w-8 h-8 mx-auto text-zinc-700 dark:text-zinc-300" />

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Privacy Policy
          </h1>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Your privacy is not a feature — it’s the foundation. This page
            explains exactly what we collect, what we don’t, and why.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="w-full px-6 py-24 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-16">
          {/* ===== SECTION 1 ===== */}
          <PolicyBlock
            icon={EyeOff}
            title="Information We Do NOT Collect"
            content={[
              "We do not require senders to create accounts.",
              "We do not collect real names, emails, or phone numbers from senders.",
              "We do not track browsing behavior across websites.",
              "We do not use third-party advertising trackers.",
            ]}
          />

          {/* ===== SECTION 2 ===== */}
          <PolicyBlock
            icon={Database}
            title="Information We May Collect"
            content={[
              "Usernames chosen by listeners (account owners).",
              "Messages sent to a listener’s inbox.",
              "Basic technical logs required to keep the service secure (rate limiting, abuse prevention).",
            ]}
            note="These logs are minimal, short-lived, and never used for profiling."
          />

          {/* ===== SECTION 3 ===== */}
          <PolicyBlock
            icon={Lock}
            title="How Your Data Is Used"
            content={[
              "To deliver messages to the correct inbox.",
              "To allow listeners to manage and control their messages.",
              "To prevent spam, abuse, or malicious usage.",
            ]}
          />

          {/* ===== SECTION 4 ===== */}
          <PolicyBlock
            icon={UserX}
            title="No Selling, No Sharing"
            content={[
              "We never sell your data.",
              "We never rent or trade information.",
              "We never share messages with third parties.",
            ]}
          />

          {/* ===== SECTION 5 ===== */}
          <PolicyBlock
            icon={AlertTriangle}
            title="Data Control & Deletion"
            content={[
              "Listeners can delete messages at any time.",
              "Accounts and associated data can be removed upon request.",
              "Deleted data is permanently erased from active systems.",
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
            <div className="flex flex-col gap-1 items-start justify-start ">
              <span className="text">Hence,</span>
              <div
                className="
                text-sm md:text-md lg:text-lg
                font-semibold tracking-tight
                text-zinc-900 dark:text-zinc-100
              "
              >
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

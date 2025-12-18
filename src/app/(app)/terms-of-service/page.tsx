"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  User,
  AlertTriangle,
  Ban,
  RefreshCcw,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
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
          <FileText className="w-8 h-8 mx-auto text-zinc-700 dark:text-zinc-300" />

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Terms of Service
          </h1>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            These terms exist to keep the platform safe, fair, and respectful —
            without unnecessary complexity.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="w-full px-6 py-24 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-16">
          {/* ===== SECTION 1 ===== */}
          <TermsBlock
            icon={User}
            title="Who Can Use This Service"
            content={[
              "You must be at least 13 years old to use this service.",
              "Listeners are responsible for managing their inbox settings.",
              "Senders do not need an account to send messages.",
            ]}
          />

          {/* ===== SECTION 2 ===== */}
          <TermsBlock
            icon={ShieldCheck}
            title="Acceptable Use"
            content={[
              "Use the service respectfully and lawfully.",
              "Do not send messages intended to harass, threaten, or harm.",
              "Do not attempt to bypass security or abuse platform limits.",
            ]}
          />

          {/* ===== SECTION 3 ===== */}
          <TermsBlock
            icon={Ban}
            title="Prohibited Content"
            content={[
              "Hate speech, violence, or threats of harm.",
              "Illegal content or encouragement of illegal activity.",
              "Spam, scams, or malicious links.",
            ]}
            note="We may remove content or restrict access if these rules are violated."
          />

          {/* ===== SECTION 4 ===== */}
          <TermsBlock
            icon={AlertTriangle}
            title="Service Availability"
            content={[
              "The service is provided on an “as-is” basis.",
              "We do our best to keep the platform available and secure.",
              "We cannot guarantee uninterrupted or error-free operation.",
            ]}
          />

          {/* ===== SECTION 5 ===== */}
          <TermsBlock
            icon={RefreshCcw}
            title="Changes to These Terms"
            content={[
              "We may update these terms from time to time.",
              "Major changes will be communicated clearly on the site.",
              "Continued use of the service means acceptance of the updated terms.",
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
          className="w-full max-w-4xl rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-12 text-center"
        >
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            These terms are written to be simple and understandable.
            <br />
            If something feels unclear or unfair, we want to know.
          </p>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
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
      className="rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-4"
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

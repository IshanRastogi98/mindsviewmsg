"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, User, EyeOff, Zap, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* ================= HERO ================= */}
      <section className="relative w-full px-6 py-28 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-4xl text-center flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Built for honest conversations.
          </h1>

          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            This platform exists to let people speak freely — without pressure,
            identity, or fear. No accounts for senders. No tracking. Just words.
          </p>
          <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-500 max-w-2xl mx-auto">
            We're here{" "}
            <Link
              href={"/u/mystrymsgir"}
              className="text-zinc-600 dark:text-zinc-200 hover:text-zinc-800 dark:hover:text-zinc-100 underline"
            >
              @mystrymsgir
            </Link>
            , feel free to share a thought.
          </p>
        </motion.div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="w-full px-6 py-24 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: EyeOff,
              title: "True Anonymity",
              desc: "Senders never create accounts. No usernames, no metadata trails, no identity leaks.",
            },
            {
              icon: Lock,
              title: "Privacy First",
              desc: "We don’t sell data, profile users, or track behavior. What’s sent stays private.",
            },
            {
              icon: ShieldCheck,
              title: "User Control",
              desc: "Listeners decide when they want to receive messages. Full control, always.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                rounded-3xl
                bg-zinc-100 dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                p-8
                flex flex-col gap-4
                hover:-translate-y-1
                transition-transform
              "
            >
              <item.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= WHY IT EXISTS ================= */}
      <section className="w-full px-6 py-24 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="
            w-full max-w-5xl
            rounded-3xl
            bg-zinc-100 dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            px-10 py-16
            text-center
            flex flex-col gap-6
          "
        >
          <Sparkles className="w-7 h-7 mx-auto text-zinc-700 dark:text-zinc-300" />

          <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
            Why this platform exists
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            People often hold back their thoughts — not because they’re
            dishonest, but because they’re afraid of judgment. This platform
            removes that friction. It lets feedback, confessions, and
            appreciation flow without fear.
          </p>

          <Separator className="my-4" />

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No virality. No manipulation. Just communication.
          </p>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="w-full px-6 py-28 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center flex flex-col gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100">
            Start listening differently.
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Create your anonymous inbox and hear what people really think — when
            you choose to.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Button
              asChild
              size="lg"
              className="
                bg-zinc-900 text-zinc-100
                hover:bg-zinc-800
                dark:bg-zinc-100 dark:text-zinc-900
                dark:hover:bg-zinc-200
              "
            >
              <Link href="/sign-up">Get your link</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="
                border-zinc-300 dark:border-zinc-700
                text-zinc-700 dark:text-zinc-300
                hover:bg-zinc-100 dark:hover:bg-zinc-900
              "
            >
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </main>
  );
}

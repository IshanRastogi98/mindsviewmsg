"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";

export default function Footer() {
  const { data: session } = useSession();
  if (session === undefined) {
    return (
      <footer className="w-full py-12 px-6 flex justify-center">
        <Skeleton className="h-28 w-full max-w-6xl rounded-2xl" />
      </footer>
    );
  }
  return (
    <footer className="w-full px-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl rounded-[28px] bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-zinc-300/40 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.12)] px-8 py-10"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* ================= LEFT : BRAND ================= */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              MystryMsg
            </Link>
            <div className="text-sm md:text-md lg:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Say Anything.
              <span className="block text-zinc-600 dark:text-zinc-400">
                Stay Anonymous.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/40 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* ================= MIDDLE : QUICK LINKS ================= */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Quick links
            </h4>

            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "Messages", href: "/dashboard#messages" },
                { label: "About", href: "/about" },
                {
                  label:
                    !session || !session.user ? "Get Started" : "Dashboard",
                  href: !session || !session.user ? "/sign-up" : "/dashboard",
                },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= RIGHT : KNOW MORE ================= */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Know more
            </h4>

            <div className="flex flex-col gap-3">
              {[
                { label: "Privacy policy", href: "/privacy-policy" },
                { label: "Terms & conditions", href: "/terms-of-service" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-300/40 dark:border-white/10 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM STRIP ================= */}
        <div className="mt-10 border-t border-zinc-300/40 dark:border-white/10 pt-6 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} MystryMsg. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

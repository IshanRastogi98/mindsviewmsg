"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Link as LinkIcon,
  ShieldCheck,
  Send,
  Zap,
  ToggleRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { heroMarqueeFeatures } from "@/lib/heroMarquee/features";
import { heroMarqueeTrust } from "@/lib/heroMarquee/trust";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";
import MainFeature from "@/components/MainFeature";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-30">
        <div className="w-full max-w-6xl flex flex-col items-center gap-10">
          {/* Hero Text */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Say Anything.
              <span className="block text-zinc-600 dark:text-zinc-400">
                Stay Anonymous.
              </span>
            </h1>

            <p className="max-w-xl text-base md:text-lg text-zinc-600 dark:text-zinc-400">
              Create a personal link and receive honest, anonymous messages. No
              accounts. No identity. Just real thoughts.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                <Link href="/sign-up">
                  Get your link
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-ṅ2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <Link href="/#main-feature">
                  <LinkIcon className="w-4 h-4" />
                  View demo
                </Link>
              </Button>
            </div>
          </div>

          {/* ================= TRUST BADGE ================= */}
          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4" />
            Anonymous by design. No tracking.
          </div>
        </div>
      </section>

      {/* ================= MARQUEE SECTION ================= */}
      <section className="w-full py-24 px-6 flex flex-col justify-center gap-4">
        {/* ================= MARQUEE 1 : FEATURES ================= */}
        <Separator />
        <HeroMarquee list={heroMarqueeFeatures} direction="right" />

        {/* ================= MARQUEE 2 : TRUST ================= */}
        <HeroMarquee list={heroMarqueeTrust} direction="left" />

        <Separator />
      </section>

      {/* ================= PREVIEW / FEATURE ================= */}
      <MainFeature />

      {/* ================= HOW IT WORKS ================= */}
      <section className="w-full py-24 px-6 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col gap-14">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100">
              How It Works
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Anonymous for senders. Fully controlled by listeners.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative flex flex-col md:grid md:grid-cols-3 gap-12">
            {/* Vertical line (mobile only) */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-700 md:hidden" />

            {/* ================= STEP 1 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-0 group hover:scale-102 hover:-translate-y-2 transition-transform"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 md:hidden" />

              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
                <Send className="w-6 h-6 text-zinc-700 dark:text-zinc-300 transition-transform duration-300 group-hover:translate-x-1" />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Anonymous Sender
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  The sender pastes the username of the person they want to
                  message and sends it — no account, no login, no identity.
                </p>

                {/* Image */}
                <div className="h-32 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/anonymity.webp"
                    alt="Anonymous and privacy-safe messaging"
                    width={96}
                    height={96}
                    className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>

            {/* ================= STEP 2 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-0 group hover:scale-102 hover:-translate-y-2 transition-transform"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 md:hidden" />

              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
                <Zap className="w-6 h-6 text-zinc-700 dark:text-zinc-300 transition-transform duration-300 group-hover:scale-110" />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Instant Delivery
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Once sent, the message reaches the target user immediately. No
                  delays, no queues.
                </p>

                <div className="h-32 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/fast-delivery.webp"
                    alt="Illustration representing instant message delivery with no delays"
                    width={96}
                    height={96}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>

            {/* ================= STEP 3 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12 md:pl-0 group hover:scale-102 hover:-translate-y-2 transition-transform duration-100 ease-in"
            >
              <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 md:hidden" />

              <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
                <ToggleRight className="w-6 h-6 text-zinc-700 dark:text-zinc-300 transition-transform duration-300 group-hover:rotate-6" />

                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Listener Control
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  The receiver decides if they want to accept messages. A simple
                  toggle lets them pause or resume anytime.
                </p>

                <div className="h-32 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/controlled-toggle.webp"
                    alt="Illustration showing user-controlled message acceptance toggle"
                    width={96}
                    height={96}
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="w-full py-28 px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full max-w-4xl flex flex-col items-center gap-6 text-center rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-16"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Ready to hear what people really think?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-xl text-zinc-600 dark:text-zinc-400 text-base md:text-lg"
          >
            Create your anonymous inbox in seconds and start receiving honest,
            unfiltered feedback — only when you want it.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-4 space-x-2.5"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Primary CTA */}
              <Button
                asChild
                size="lg"
                className="group gap-2 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
              >
                <Link href="/sign-up">
                  Get your link
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-100 w-4 h-4" />
                </Link>
              </Button>

              {/* Secondary CTA */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group gap-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                <Link href="#main-feature">
                  Have a message
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-100 w-4 h-4 opacity-70" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Trust note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <ShieldCheck className="w-4 h-4" />
            Anonymous by design · No tracking · Full control
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FOOTER PLACEHOLDER ================= */}
      <Footer />
    </main>
  );
}

type HeroMarqueeItem = {
  label: string;
  description: string;
  icon: LucideIcon;
};

type HeroMarqueeProps = {
  list: readonly HeroMarqueeItem[];
  direction?: "left" | "right";
};

export const HeroMarquee = ({ list, direction = "left" }: HeroMarqueeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: direction === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full select-none space-y-5 mt-6 relative overflow-hidden"
    >
      <Marquee
        speed={60}
        className="py-2"
        direction={direction}
        pauseOnHover
        gradient={false}
      >
        {list.map((item, index) => (
          <div
            key={index}
            className="mx-6 w-72 h-36 flex flex-col items-center justify-center gap-2 rounded-3xl bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 backdrop-blur text-center px-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-900/10 dark:hover:shadow-black/40"
          >
            {/* Icon */}
            <item.icon className="w-7 h-7 text-zinc-800 dark:text-zinc-200" />

            {/* Title */}
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {item.label}
            </span>

            {/* Description */}
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              {item.description}
            </span>
          </div>
        ))}
      </Marquee>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent" />
    </motion.div>
  );
};

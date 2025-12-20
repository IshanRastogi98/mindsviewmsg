"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 fade-in">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>

      <Accordion
        type="single"
        collapsible
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
      >
        {children}
      </Accordion>
    </section>
  );
}

export { AccordionItem, AccordionTrigger, AccordionContent };

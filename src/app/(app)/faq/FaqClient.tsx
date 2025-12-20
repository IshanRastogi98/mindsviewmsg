"use client";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";

export default function FaqClient() {
  return (
    <>
      <main className="w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {/* ================= HERO ================= */}
        <section className="w-full px-6 py-28 flex justify-center">
          <div className="w-full max-w-4xl text-center flex flex-col gap-6">
            <HelpCircle className="w-8 h-8 mx-auto text-zinc-700 dark:text-zinc-300" />

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Frequently Asked Questions
            </h1>

            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Clear, honest answers about how MindsViewMsg works, how your
              privacy is protected, and what to expect.
            </p>
          </div>
        </section>

        {/* ================= FAQ CONTENT ================= */}
        <section className="w-full px-6 py-24 flex justify-center">
          <div className="w-full max-w-4xl flex flex-col gap-16">
            {/* ===== GENERAL ===== */}
            <FAQSection title="General & Usage">
              <FAQ
                q="What is MindsViewMsg?"
                a="MindsViewMsg is an anonymity-first messaging platform that allows people to receive honest feedback or messages without requiring the sender to reveal their identity. Privacy and security are core design principles."
              />
              <FAQ
                q="Do I need an account to send a message?"
                a="No. Sending messages does not require creating an account, logging in, or providing personal information."
              />
              <FAQ
                q="Do I need an account to receive messages?"
                a="Yes. To create a personal link and manage an inbox, you must register for an account."
              />
              <FAQ
                q="Is MindsViewMsg free to use?"
                a="Yes. MindsViewMsg does not run ads and does not sell user data. The platform operates on a privacy-first model."
              />
              <FAQ
                q="What is the minimum age requirement?"
                a="You must be at least 13 years old to use MindsViewMsg."
              />
            </FAQSection>

            {/* ===== PRIVACY ===== */}
            <FAQSection title="Privacy & Anonymity">
              <FAQ
                q="How anonymous is MindsViewMsg?"
                a="MindsViewMsg follows an anonymity-by-design approach. Senders do not log in, and sender identity is not attached to messages. However, absolute anonymity cannot be guaranteed due to external factors like internet service providers."
              />
              <FAQ
                q="What data do you not collect?"
                a="We do not collect real names, device fingerprints, or message content for analytics or advertising, and we do not use third-party tracking tools."
              />
              <FAQ
                q="Do you track IP addresses?"
                a="We do not log IP addresses alongside message content for analytics or profiling. Any temporary technical data used for security is minimized."
              />
              <FAQ
                q="Can message receivers identify the sender?"
                a="No. Receivers only see the message content and a timestamp. There are no features that reveal sender identity."
              />
              <FAQ
                q="Do you encrypt stored messages?"
                a="Messages are stored securely with strict access controls. While end-to-end encryption is not currently implemented, encryption-at-rest and zero-knowledge designs are being researched."
              />
            </FAQSection>

            {/* ===== SECURITY ===== */}
            <FAQSection title="Security & Technology">
              <FAQ
                q="How are passwords protected?"
                a="Passwords are never stored in plain text. They are hashed using bcrypt with strong cost factors (12+ rounds)."
              />
              <FAQ
                q="What is server-side input validation?"
                a="Server-side input validation means all data is checked and sanitized on our servers before processing, preventing malicious inputs even if browser protections fail."
              />
              <FAQ
                q="What is database field whitelisting?"
                a="Only explicitly allowed fields are stored in the database. Unexpected or hidden fields are ignored to prevent unauthorized data manipulation."
              />
              <FAQ
                q="What is rate limiting and why does it exist?"
                a="Rate limiting restricts how many requests can be made in a short time window. It helps prevent spam, abuse, and denial-of-service attacks."
              />
              <FAQ
                q="What is username enumeration protection?"
                a="It prevents attackers from determining whether a specific username exists, reducing targeted attacks and privacy risks."
              />
            </FAQSection>

            {/* ===== AI ===== */}
            <FAQSection title="AI Features & Safety">
              <FAQ
                q="Does MindsViewMsg use AI?"
                a="Yes. Optional AI-assisted features may suggest message ideas. These are purely optional and meant as inspiration."
              />
              <FAQ
                q="Are AI-generated suggestions always accurate?"
                a="No. AI suggestions may not always reflect your intent or values. You are responsible for reviewing what you send."
              />
              <FAQ
                q="How do you protect against AI misuse?"
                a="Safeguards are in place to reduce prompt-injection attacks and harmful outputs. No AI system is perfect, but protections are actively enforced."
              />
            </FAQSection>

            {/* ===== SAFETY ===== */}
            <FAQSection title="Safety, Abuse & Legal">
              <FAQ
                q="Do you read or monitor messages?"
                a="No. We do not actively read or monitor message content. Inbox owners control deletion and management."
              />
              <FAQ
                q="What content is prohibited?"
                a="Harassment, hate speech, threats, illegal activity, sexual exploitation, and spam are strictly prohibited."
              />
              <FAQ
                q="What happens if someone misuses the platform?"
                a="Violations of our Terms of Service may result in content removal or access restrictions."
              />
              <FAQ
                q="Is MindsViewMsg safe for teenagers?"
                a="The platform is intended for users aged 13 and above. Guardians are encouraged to discuss responsible online communication."
              />
              <FAQ
                q="Do you cooperate with law enforcement?"
                a="If required by valid legal process, we comply to the extent permitted by our minimal data retention."
              />
            </FAQSection>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <Footer />
      </main>
    </>
  );
}

/* ================= SUB COMPONENTS ================= */

function FAQSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
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

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <AccordionItem value={q} className="px-6">
      <AccordionTrigger className="text-left text-zinc-900 dark:text-zinc-100">
        {q}
      </AccordionTrigger>
      <AccordionContent className="text-sm text-zinc-600 dark:text-zinc-400">
        {a}
      </AccordionContent>
    </AccordionItem>
  );
}

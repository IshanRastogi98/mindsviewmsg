import {
  Shield,
  Lock,
  Settings,
  Ban,
  Slash,
  Ghost,
} from "lucide-react";

export const heroMarqueeTrust = [
  {
    label: "Messages stay anonymous",
    description: "We never expose sender identity — ever.",
    icon: Ghost,
  },
  {
    label: "Privacy first",
    description: "Designed with privacy as the core principle.",
    icon: Shield,
  },
  {
    label: "No account tracking",
    description: "We don’t track profiles, behavior, or activity.",
    icon: Lock,
  },
  {
    label: "User-controlled inbox",
    description: "You decide when to receive messages.",
    icon: Settings,
  },
  {
    label: "Block anytime",
    description: "Pause or stop messages instantly with one toggle.",
    icon: Ban,
  },
  {
    label: "No spam or ads",
    description: "No promotions, no ads, no hidden agendas.",
    icon: Slash,
  },
] as const;

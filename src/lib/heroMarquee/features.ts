import {
  MessageCircle,
  Rocket,
  Link,
  HelpCircle,
  EyeOff,
  Brain,
  UserX,
} from "lucide-react";

export const heroMarqueeFeatures = [
  {
    label: "Send anonymous messages",
    description: "Share thoughts freely without revealing who you are.",
    icon: MessageCircle,
  },
  {
    label: "No login required",
    description: "Start messaging instantly. No signup or account needed.",
    icon: Rocket,
  },
  {
    label: "Share your link",
    description: "Get a personal link others can message you through.",
    icon: Link,
  },
  {
    label: "Ask anything freely",
    description: "Encourage honest questions without social pressure.",
    icon: HelpCircle,
  },
  {
    label: "Honest opinions only",
    description: "Receive genuine responses people might not say openly.",
    icon: EyeOff,
  },
  {
    label: "Real feedback",
    description: "Understand what people truly think about you.",
    icon: Brain,
  },
  {
    label: "No identity revealed",
    description: "Senders stay completely anonymous at all times.",
    icon: UserX,
  },
] as const;

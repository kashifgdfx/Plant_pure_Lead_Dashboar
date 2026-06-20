import { Globe } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";


export const channelMeta = {
  website: {
    label: "Website",
    icon: Globe,
    tone: "bg-[var(--channel-web)]/12 text-[var(--channel-web)]",
    chip: "bg-[var(--channel-web)]",
  },
  instagram: {
    label: "Instagram",
    icon: FaInstagram,
    tone: "bg-[var(--channel-instagram)]/12 text-[var(--channel-instagram)]",
    chip: "bg-[var(--channel-instagram)]",
  },
  facebook: {
    label: "Facebook",
    icon: FaFacebook,
    tone: "bg-[var(--channel-facebook)]/12 text-[var(--channel-facebook)]",
    chip: "bg-[var(--channel-facebook)]",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: ImWhatsapp,
    tone: "bg-[var(--channel-whatsapp)]/12 text-[var(--channel-whatsapp)]",
    chip: "bg-[var(--channel-whatsapp)]",
  },
};


export type Lead = {
  id: string;
  name: string;
  handle: string;
  channel: Channel;
  status: Status;
  product: string;
  city: string;
  lastMessage: string;
  time: string;
  unread: number;
  value: number;
  initials: string;
  messages: Message[]; // Direct and simple array reference
};

export type Message = {
  from: "lead" | "agent";
  text: string;
  time: string;
};


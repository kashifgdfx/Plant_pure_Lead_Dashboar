import type { Lead } from "../types/crm";

export const LEADS: Lead[] = [
  {
    id: "L-1042",
    name: "Ananya Sharma",
    handle: "ananya@gmail.com",
    channel: "website",
    status: "new",
    product: "Hair Coloring Kit",
    city: "Mumbai",
    lastMessage: "Is the henna kit safe for color-treated hair?",
    time: "2m",
    unread: 2,
    value: 1499,
    initials: "AS",
    messages: [
      {
        from: "lead",
        text: "Hi! I saw your Hair Coloring Kit on the website.",
        time: "10:21",
      },
      {
        from: "lead",
        text: "Is the henna kit safe for color-treated hair?",
        time: "10:22",
      },
    ],
  },
  {
    id: "L-1041",
    name: "Priya Iyer",
    handle: "@priya.glow",
    channel: "instagram",
    status: "contacted",
    product: "Hibiscus Oil",
    city: "Bengaluru",
    lastMessage: "Sending you a discount code — check DM 🌿",
    time: "14m",
    unread: 0,
    value: 899,
    initials: "PI",
    messages: [
      {
        from: "lead",
        text: "Loved your reel! Does the oil reduce hairfall?",
        time: "09:40",
      },
      {
        from: "agent",
        text: "Hi Priya! Yes — most users see results in 4–6 weeks.",
        time: "09:55",
      },
      {
        from: "agent",
        text: "Sending you a discount code — check DM 🌿",
        time: "10:08",
      },
    ],
  },
  {
    id: "L-1040",
    name: "Riya Kapoor",
    handle: "+91 98•••• 41210",
    channel: "whatsapp",
    status: "qualified",
    product: "Indigo Powder",
    city: "Delhi",
    lastMessage: "Cool, please share COD options.",
    time: "31m",
    unread: 1,
    value: 649,
    initials: "RK",
    messages: [
      {
        from: "agent",
        text: "Hi Riya, the Indigo Powder ships in 2-3 days.",
        time: "08:30",
      },
      {
        from: "lead",
        text: "Cool, please share COD options.",
        time: "09:45",
      },
    ],
  },
];
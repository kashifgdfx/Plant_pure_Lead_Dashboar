import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Globe,
  BadgeInfo, // Facebook ki jagah
  MessageCircle,
  Search,
  Filter,
  Plus,
  Send,
  Paperclip,
  Smile,
  Phone,
  Mail,
  MoreHorizontal,
  TrendingUp,
  Leaf,
  Settings,
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Shield,
  Plug,
  CreditCard,
  UserCircle,
  Zap,
} from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";

import logo from "/logo.png";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlantPure CRM — Lead Management" },
      {
        name: "description",
        content:
          "Manage leads and conversations from your website, Instagram, Facebook, and WhatsApp in one botanical-inspired CRM.",
      },
      { property: "og:title", content: "PlantPure CRM — Lead Management" },
      {
        property: "og:description",
        content:
          "All your leads & messages from web, Instagram, Facebook and WhatsApp — in one place.",
      },
    ],
  }),
  component: LeadsApp,
});

type Channel = "website" | "instagram" | "facebook" | "whatsapp";
type Status = "new" | "contacted" | "qualified" | "converted" | "lost";
type Tab = "dashboard" | "inbox" | "leads" | "reports" | "settings";

type Lead = {
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
  messages: { from: "lead" | "agent"; text: string; time: string }[];
};

const LEADS: Lead[] = [
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
      { from: "lead", text: "Cool, please share COD options.", time: "09:45" },
    ],
  },
  {
    id: "L-1039",
    name: "Meera Nair",
    handle: "meera.nair@fb",
    channel: "facebook",
    status: "converted",
    product: "Skin Botanicals Set",
    city: "Kochi",
    lastMessage: "Thank you! Order placed ✨",
    time: "1h",
    unread: 0,
    value: 2199,
    initials: "MN",
    messages: [
      {
        from: "lead",
        text: "Comment from your ad — interested in the bundle.",
        time: "Yesterday",
      },
      {
        from: "agent",
        text: "Shared the link, let me know if you need help.",
        time: "Yesterday",
      },
      { from: "lead", text: "Thank you! Order placed ✨", time: "08:10" },
    ],
  },
  {
    id: "L-1038",
    name: "Sneha Patel",
    handle: "sneha@yahoo.in",
    channel: "website",
    status: "contacted",
    product: "Hair Coloring Kit",
    city: "Ahmedabad",
    lastMessage: "Can I get a tutorial video?",
    time: "3h",
    unread: 0,
    value: 1499,
    initials: "SP",
    messages: [
      { from: "lead", text: "Can I get a tutorial video?", time: "07:02" },
    ],
  },
  {
    id: "L-1037",
    name: "Kavya Reddy",
    handle: "@kavyareddy",
    channel: "instagram",
    status: "new",
    product: "Hibiscus Oil",
    city: "Hyderabad",
    lastMessage: "How often should I apply this?",
    time: "5h",
    unread: 3,
    value: 899,
    initials: "KR",
    messages: [
      { from: "lead", text: "How often should I apply this?", time: "05:30" },
    ],
  },
  {
    id: "L-1036",
    name: "Nisha Verma",
    handle: "+91 99•••• 88712",
    channel: "whatsapp",
    status: "lost",
    product: "Indigo Powder",
    city: "Pune",
    lastMessage: "Maybe next month, thanks.",
    time: "1d",
    unread: 0,
    value: 0,
    initials: "NV",
    messages: [
      { from: "lead", text: "Maybe next month, thanks.", time: "Yesterday" },
    ],
  },
];

const channelMeta: Record<
  Channel,
  { label: string; icon: typeof Globe; tone: string; chip: string }
> = {
  website: {
    label: "Website",
    icon: Globe,
    tone: "bg-[color:var(--channel-web)]/12 text-[color:var(--channel-web)]",
    chip: "bg-[color:var(--channel-web)]",
  },
  instagram: {
    label: "Instagram",
    icon: BadgeInfo,
    tone: "bg-[color:var(--channel-instagram)]/12 text-[color:var(--channel-instagram)]",
    chip: "bg-[color:var(--channel-instagram)]",
  },
  facebook: {
    label: "Facebook",
    icon: BadgeInfo,
    tone: "bg-[color:var(--channel-facebook)]/12 text-[color:var(--channel-facebook)]",
    chip: "bg-[color:var(--channel-facebook)]",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    tone: "bg-[color:var(--channel-whatsapp)]/12 text-[color:var(--channel-whatsapp)]",
    chip: "bg-[color:var(--channel-whatsapp)]",
  },
};

const statusMeta: Record<Status, { label: string; cls: string }> = {
  new: {
    label: "New",
    cls: "bg-[color:var(--leaf)]/15 text-[color:var(--leaf)]",
  },
  contacted: {
    label: "Contacted",
    cls: "bg-[color:var(--clay)]/15 text-[color:var(--clay)]",
  },
  qualified: { label: "Qualified", cls: "bg-amber-500/15 text-amber-700" },
  converted: { label: "Converted", cls: "bg-emerald-600/15 text-emerald-700" },
  lost: { label: "Lost", cls: "bg-rose-500/15 text-rose-600" },
};

function LeadsApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [activeChannel, setActiveChannel] = useState<Channel | "all">("all");
  const [activeId, setActiveId] = useState<string>(LEADS[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = useMemo(() => {
    return LEADS.filter(
      (l) =>
        (activeChannel === "all" || l.channel === activeChannel) &&
        (l.name.toLowerCase().includes(query.toLowerCase()) ||
          l.product.toLowerCase().includes(query.toLowerCase())),
    );
  }, [activeChannel, query]);

  const active =
    LEADS.find((l) => l.id === activeId) ?? filtered[0] ?? LEADS[0];

  const counts = useMemo(
    () => ({
      all: LEADS.length,
      website: LEADS.filter((l) => l.channel === "website").length,
      instagram: LEADS.filter((l) => l.channel === "instagram").length,
      facebook: LEADS.filter((l) => l.channel === "facebook").length,
      whatsapp: LEADS.filter((l) => l.channel === "whatsapp").length,
    }),
    [],
  );

  return (
    <div className="grid h-screen grid-cols-[260px_1fr] bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex flex-col border-r border-input bg-sidebar text-sidebar-foreground">
        
  <div className="h-[87px] bg-[#FEFDF9] border-b border-input flex items-center px-5">
    <img
      src="/logo.png"
      alt="PlantPure"
      className="h-12 w-auto"
    />

    <div className="ml-3">
      <h2 className="text-[#1d2b1f] text-2xl font-bold">
        PlantPure
      </h2>
      {/* <p className="text-[#666] text-[11px] tracking-[4px] uppercase">
        LEAD STUDIO
      </p> */}
    </div>
  </div>

   <div className="mt-4 px-4 flex flex-col gap-1">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />
        <NavItem
          icon={Inbox}
          label="Inbox"
          badge="6"
          active={activeTab === "inbox"}
          onClick={() => setActiveTab("inbox")}
        />
        <NavItem
          icon={Users}
          label="Leads"
          active={activeTab === "leads"}
          onClick={() => setActiveTab("leads")}
        />
        <NavItem
          icon={BarChart3}
          label="Reports"
          active={activeTab === "reports"}
          onClick={() => setActiveTab("reports")}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        </div>

        {activeTab === "inbox" && (
          <>
            <div className="mt-6 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-60">
              Channels
            </div>
            <ChannelNav
              active={activeChannel === "all"}
              onClick={() => setActiveChannel("all")}
              icon={Inbox}
              label="All channels"
              count={counts.all}
            />
            <ChannelNav
              active={activeChannel === "website"}
              onClick={() => setActiveChannel("website")}
              icon={Globe}
              label="Website"
              count={counts.website}
              dot="var(--channel-web)"
            />
            <ChannelNav
              active={activeChannel === "instagram"}
              onClick={() => setActiveChannel("instagram")}
              icon={FaInstagram}
              label="Instagram"
              count={counts.instagram}
              dot="var(--channel-instagram)"
            />
            <ChannelNav
              active={activeChannel === "facebook"}
              onClick={() => setActiveChannel("facebook")}
              icon={FaFacebook}
              label="Facebook"
              count={counts.facebook}
              dot="var(--channel-facebook)"
            />
            <ChannelNav
              active={activeChannel === "whatsapp"}
              onClick={() => setActiveChannel("whatsapp")}
              icon={ImWhatsapp}
              label="WhatsApp"
              count={counts.whatsapp}
              dot="var(--channel-whatsapp)"
            />
          </>
        )}

        <div className="mt-auto rounded-xl bg-sidebar-accent p-3 text-xs">
          <div className="mb-1 font-medium">Botanical Tip</div>
          <p className="opacity-80">
            Respond to Instagram leads within 1 hour — conversion lifts by 38%.
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex flex-col overflow-hidden">
        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "inbox" && (
          <InboxView
            activeChannel={activeChannel}
            filtered={filtered}
            active={active}
            setActiveId={setActiveId}
            query={query}
            setQuery={setQuery}
            draft={draft}
            setDraft={setDraft}
          />
        )}
        {activeTab === "leads" && (
          <LeadsView query={query} setQuery={setQuery} />
        )}
        {activeTab === "reports" && <ReportsView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */
function DashboardView() {
  return (
    <>
 <PageHeader
  title={
    <div className="flex items-center gap-6">
      {/* Logo Section */}
  

      {/* Existing Dashboard Header */}
      <div>
        <div className="font-display text-3xl">Dashboard</div>
        <div className="text-sm text-muted-foreground">
          Snapshot of leads, messages & revenue across all channels.
        </div>
      </div>
    </div>
  }
  subtitle={null}
  action={
    <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm hover:bg-muted">
      <Download className="h-4 w-4" />
      Export
    </button>
  }
/>
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-y-auto p-6">
        {/* KPIs */}
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <Kpi
            label="Total leads"
            value="1,284"
            delta="+12.4%"
            tone="leaf"
            icon={Users}
          />
          <Kpi
            label="Unread messages"
            value="37"
            delta="6 urgent"
            tone="clay"
            icon={Inbox}
          />
          <Kpi
            label="Conversion rate"
            value="18.6%"
            delta="+2.1%"
            tone="bark"
            icon={TrendingUp}
          />
          <Kpi
            label="Revenue (MTD)"
            value="₹4.82L"
            delta="+₹62k"
            tone="leaf"
            icon={CheckCircle2}
          />
        </div>

        {/* Trend chart */}
        <div className="col-span-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Leads over time
              </div>
              <div className="font-display text-lg">Last 30 days</div>
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs">
              {["7D", "30D", "90D"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md px-3 py-1 ${i === 1 ? "bg-muted font-medium" : "text-muted-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <MiniBarChart />
        </div>

        {/* Channel split */}
        <div className="col-span-4 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Lead source split
          </div>
          <ul className="space-y-3">
            {[
              { ch: "website" as Channel, pct: 42, count: 540 },
              { ch: "instagram" as Channel, pct: 28, count: 360 },
              { ch: "whatsapp" as Channel, pct: 19, count: 244 },
              { ch: "facebook" as Channel, pct: 11, count: 140 },
            ].map((s) => {
              const meta = channelMeta[s.ch];
              const Icon = meta.icon;
              return (
                <li key={s.ch}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" /> {meta.label}
                    </span>
                    <span className="text-muted-foreground">
                      {s.count} · {s.pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${meta.chip}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pipeline */}
        <div className="col-span-7 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pipeline
          </div>
          <div className="grid grid-cols-5 gap-2">
            {(Object.keys(statusMeta) as Status[]).map((s) => {
              const count = LEADS.filter((l) => l.status === s).length;
              return (
                <div
                  key={s}
                  className="rounded-lg border border-border bg-background p-3 text-center"
                >
                  <div
                    className={`mx-auto mb-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusMeta[s].cls}`}
                  >
                    {statusMeta[s].label}
                  </div>
                  <div className="font-display text-2xl">{count}</div>
                  <div className="text-[10px] text-muted-foreground">leads</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="col-span-5 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent activity
          </div>
          <ul className="space-y-3 text-sm">
            <Activity
              time="2m"
              text="Ananya Sharma sent a message on Website"
            />
            <Activity time="14m" text="Priya Iyer replied on Instagram" />
            <Activity time="31m" text="Riya Kapoor qualified on WhatsApp" />
            <Activity time="1h" text="Meera Nair converted · ₹2,199" />
            <Activity time="3h" text="New lead Sneha Patel from Website" />
          </ul>
        </div>

        {/* Top products */}
        <div className="col-span-12 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top products by leads
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Hair Coloring Kit", leads: 412, rev: "₹1.84L" },
              { name: "Hibiscus Oil", leads: 318, rev: "₹1.12L" },
              { name: "Indigo Powder", leads: 224, rev: "₹68k" },
              { name: "Skin Botanicals Set", leads: 168, rev: "₹1.18L" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="text-sm font-medium">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.leads} leads · {p.rev}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-[color:var(--leaf)]">
                  <ArrowUpRight className="h-3 w-3" /> Trending
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function MiniBarChart() {
  const bars = [
    38, 52, 44, 60, 48, 72, 58, 80, 66, 90, 74, 88, 96, 82, 110, 92, 104, 120,
    100, 132,
  ];
  const max = Math.max(...bars);
  return (
    <div className="flex h-40 items-end gap-1.5">
      {bars.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-[color:var(--leaf)]/70 transition-all hover:bg-[color:var(--leaf)]"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

/* ---------------- INBOX ---------------- */
function InboxView({
  activeChannel,
  filtered,
  active,
  setActiveId,
  query,
  setQuery,
  draft,
  setDraft,
}: {
  activeChannel: Channel | "all";
  filtered: Lead[];
  active: Lead;
  setActiveId: (id: string) => void;
  query: string;
  setQuery: (v: string) => void;
  draft: string;
  setDraft: (v: string) => void;
}) {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] overflow-hidden">
      <header className="flex items-center justify-between gap-4 border-b border-border bg-card/60 px-6 py-4 backdrop-blur">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Lead Inbox</h1>
          <p className="text-xs text-muted-foreground">
            All conversations from web, social & messaging — unified.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, products…"
              className="h-10 w-72 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm hover:bg-muted">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4" /> New lead
          </button>
        </div>
      </header>

      <section className="grid grid-cols-4 gap-4 border-b border-border bg-background px-6 py-5">
        <Kpi
          label="Total leads"
          value="1,284"
          delta="+12.4%"
          tone="leaf"
          icon={Users}
        />
        <Kpi
          label="Unread messages"
          value="37"
          delta="6 urgent"
          tone="clay"
          icon={Inbox}
        />
        <Kpi
          label="Conversion rate"
          value="18.6%"
          delta="+2.1%"
          tone="bark"
          icon={TrendingUp}
        />
        <Kpi
          label="Revenue (MTD)"
          value="₹4.82L"
          delta="+₹62k"
          tone="leaf"
          icon={CheckCircle2}
        />
      </section>

      <section className="grid grid-cols-[1.1fr_1.4fr] gap-0 overflow-hidden">
        <div className="flex flex-col overflow-hidden border-r border-border bg-card/40">
          <div className="flex items-center justify-between px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>
              {filtered.length} leads ·{" "}
              {activeChannel === "all"
                ? "All channels"
                : channelMeta[activeChannel].label}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Sorted by recent
            </span>
          </div>
          <ul className="flex-1 divide-y divide-border overflow-y-auto">
            {filtered.map((lead) => {
              const ch = channelMeta[lead.channel];
              const Icon = ch.icon;
              const isActive = lead.id === active.id;
              return (
                <li key={lead.id}>
                  <button
                    onClick={() => setActiveId(lead.id)}
                    className={`flex w-full gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/60 ${isActive ? "bg-muted" : ""}`}
                  >
                    <div className="relative">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--leaf)]/15 font-display text-sm font-semibold text-[color:var(--leaf)]">
                        {lead.initials}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full ring-2 ring-card ${ch.tone}`}
                      >
                        <Icon className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold">
                          {lead.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {lead.time}
                        </span>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {lead.handle} · {lead.product}
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-foreground/80">
                        {lead.lastMessage}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusMeta[lead.status].cls}`}
                        >
                          {statusMeta[lead.status].label}
                        </span>
                        {lead.unread > 0 && (
                          <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                            {lead.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] overflow-hidden">
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-[color:var(--leaf)]/15 font-display font-semibold text-[color:var(--leaf)]">
                  {active.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{active.name}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${channelMeta[active.channel].tone}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${channelMeta[active.channel].chip}`}
                      />
                      {channelMeta[active.channel].label}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {active.handle} · {active.city}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <IconBtn icon={Phone} />
                <IconBtn icon={Mail} />
                <IconBtn icon={MoreHorizontal} />
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[color:var(--muted)]/40 px-6 py-6">
              <div className="mx-auto w-fit rounded-full bg-card px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
                Today
              </div>
              {active.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.from === "agent" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-card text-foreground"}`}
                  >
                    <p>{m.text}</p>
                    <div
                      className={`mt-1 text-[10px] ${m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border bg-card p-4">
              <div className="flex items-end gap-2 rounded-xl border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
                <button className="p-2 text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={1}
                  placeholder={`Reply via ${channelMeta[active.channel].label}…`}
                  className="max-h-32 flex-1 resize-none bg-transparent px-1 py-2 text-sm outline-none"
                />
                <button className="p-2 text-muted-foreground hover:text-foreground">
                  <Smile className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                  <Send className="h-4 w-4" /> Send
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {[
                  "Share product link",
                  "Send discount code",
                  "Ask for pincode",
                  "Schedule call",
                ].map((s) => (
                  <button
                    key={s}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4 overflow-y-auto border-l border-border bg-background p-5">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Lead
              </div>
              <div className="mt-1 font-display text-lg">{active.name}</div>
              <div className="text-xs text-muted-foreground">
                {active.id} · added today
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(statusMeta) as Status[]).map((s) => (
                  <span
                    key={s}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${s === active.status ? statusMeta[s].cls + " ring-1 ring-current" : "bg-muted text-muted-foreground"}`}
                  >
                    {statusMeta[s].label}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-sm">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Details
              </div>
              <Row label="Channel" value={channelMeta[active.channel].label} />
              <Row label="Product" value={active.product} />
              <Row label="City" value={active.city} />
              <Row
                label="Est. value"
                value={`₹${active.value.toLocaleString("en-IN")}`}
              />
              <Row label="Owner" value="Riya M." />
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {["Hair care", "First-time", "Hot lead", "COD"].map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-[color:var(--leaf)]/12 px-2 py-1 text-[color:var(--leaf)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Activity
              </div>
              <ul className="space-y-3 text-xs">
                <Activity time="2m" text="New message received" />
                <Activity time="1h" text="Lead viewed Hair Coloring Kit" />
                <Activity time="3h" text="Captured from website form" />
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

/* ---------------- LEADS TABLE ---------------- */
function LeadsView({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  const [status, setStatus] = useState<Status | "all">("all");
  const rows = LEADS.filter(
    (l) =>
      (status === "all" || l.status === status) &&
      (l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.product.toLowerCase().includes(query.toLowerCase())),
  );
  return (
    <>
      <PageHeader
        title="All Leads"
        subtitle="A unified table of every lead captured across channels."
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="h-10 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm hover:bg-muted">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
              <Plus className="h-4 w-4" /> New lead
            </button>
          </div>
        }
      />
      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterPill
            active={status === "all"}
            onClick={() => setStatus("all")}
            label={`All (${LEADS.length})`}
          />
          {(Object.keys(statusMeta) as Status[]).map((s) => (
            <FilterPill
              key={s}
              active={status === s}
              onClick={() => setStatus(s)}
              label={`${statusMeta[s].label} (${LEADS.filter((l) => l.status === s).length})`}
            />
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Value</th>
                <th className="px-4 py-3">Last activity</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((l) => {
                const meta = channelMeta[l.channel];
                const Icon = meta.icon;
                return (
                  <tr key={l.id} className="hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <input type="checkbox" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--leaf)]/15 text-xs font-semibold text-[color:var(--leaf)]">
                          {l.initials}
                        </div>
                        <div>
                          <div className="font-medium">{l.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {l.handle}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium ${meta.tone}`}
                      >
                        <Icon className="h-3 w-3" /> {meta.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">{l.product}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {l.city}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusMeta[l.status].cls}`}
                      >
                        {statusMeta[l.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ₹{l.value.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {l.time} ago
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-md p-1 hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {rows.length} of {LEADS.length} leads
          </span>
          <div className="flex gap-1">
            <button className="rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              Previous
            </button>
            <button className="rounded-md border border-border px-3 py-1.5 hover:bg-muted">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- REPORTS ---------------- */
function ReportsView() {
  return (
    <>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Channel performance, response times and revenue insights."
        action={
          <div className="flex gap-2">
            <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last quarter</option>
            </select>
            <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm hover:bg-muted">
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        }
      />
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-y-auto p-6">
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <Kpi
            label="New leads"
            value="412"
            delta="+18%"
            tone="leaf"
            icon={Users}
          />
          <Kpi
            label="Avg. response"
            value="42 min"
            delta="-9 min"
            tone="clay"
            icon={Clock}
          />
          <Kpi
            label="Reply rate"
            value="92%"
            delta="+3%"
            tone="bark"
            icon={MessageCircle}
          />
          <Kpi
            label="Won deals"
            value="76"
            delta="+12"
            tone="leaf"
            icon={CheckCircle2}
          />
        </div>

        <div className="col-span-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Channel performance
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="py-2">Channel</th>
                <th className="py-2">Leads</th>
                <th className="py-2">Replies</th>
                <th className="py-2">Converted</th>
                <th className="py-2">Revenue</th>
                <th className="py-2">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  ch: "website" as Channel,
                  leads: 540,
                  replies: 502,
                  conv: 92,
                  rev: "₹1.84L",
                  up: true,
                },
                {
                  ch: "instagram" as Channel,
                  leads: 360,
                  replies: 340,
                  conv: 64,
                  rev: "₹1.12L",
                  up: true,
                },
                {
                  ch: "whatsapp" as Channel,
                  leads: 244,
                  replies: 240,
                  conv: 58,
                  rev: "₹98k",
                  up: true,
                },
                {
                  ch: "facebook" as Channel,
                  leads: 140,
                  replies: 122,
                  conv: 22,
                  rev: "₹38k",
                  up: false,
                },
              ].map((r) => {
                const meta = channelMeta[r.ch];
                const Icon = meta.icon;
                return (
                  <tr key={r.ch}>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${meta.tone}`}
                      >
                        <Icon className="h-3 w-3" /> {meta.label}
                      </span>
                    </td>
                    <td className="py-3">{r.leads}</td>
                    <td className="py-3">{r.replies}</td>
                    <td className="py-3">{r.conv}</td>
                    <td className="py-3 font-medium">{r.rev}</td>
                    <td className="py-3">
                      {r.up ? (
                        <span className="inline-flex items-center gap-1 text-[color:var(--leaf)]">
                          <ArrowUpRight className="h-3 w-3" /> up
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600">
                          <ArrowDownRight className="h-3 w-3" /> down
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="col-span-4 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Team leaderboard
          </div>
          <ul className="space-y-3">
            {[
              { n: "Riya M.", deals: 28, rev: "₹1.42L" },
              { n: "Arjun K.", deals: 22, rev: "₹1.08L" },
              { n: "Sneha P.", deals: 18, rev: "₹84k" },
              { n: "Devika R.", deals: 12, rev: "₹52k" },
            ].map((m, i) => (
              <li
                key={m.n}
                className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--leaf)]/15 text-sm font-semibold text-[color:var(--leaf)]">
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{m.n}</div>
                  <div className="text-xs text-muted-foreground">
                    {m.deals} won · {m.rev}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Response time by channel
          </div>
          <ul className="space-y-3">
            {[
              { ch: "whatsapp" as Channel, mins: 12 },
              { ch: "instagram" as Channel, mins: 28 },
              { ch: "facebook" as Channel, mins: 54 },
              { ch: "website" as Channel, mins: 72 },
            ].map((r) => {
              const meta = channelMeta[r.ch];
              const pct = Math.min(100, (r.mins / 90) * 100);
              return (
                <li key={r.ch}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{meta.label}</span>
                    <span className="text-muted-foreground">{r.mins} min</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full ${meta.chip}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-span-6 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Funnel
          </div>
          <ul className="space-y-2">
            {[
              { l: "Captured", v: 1284, pct: 100 },
              { l: "Contacted", v: 1042, pct: 81 },
              { l: "Qualified", v: 486, pct: 38 },
              { l: "Converted", v: 238, pct: 18 },
            ].map((s) => (
              <li key={s.l}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{s.l}</span>
                  <span className="text-muted-foreground">
                    {s.v} · {s.pct}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-md bg-muted">
                  <div
                    className="h-full bg-[color:var(--leaf)]"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- SETTINGS ---------------- */
function SettingsView() {
  const [section, setSection] = useState("profile");
  const sections = [
    { id: "profile", label: "Profile", icon: UserCircle },
    { id: "channels", label: "Channels", icon: Plug },
    { id: "team", label: "Team & roles", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "automations", label: "Automations", icon: Zap },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Workspace, channel integrations, team and automations."
      />
      <div className="grid flex-1 grid-cols-[220px_1fr] overflow-hidden">
        <nav className="space-y-1 overflow-y-auto border-r border-border bg-card/40 p-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${section === s.id ? "bg-muted font-medium" : "text-muted-foreground hover:bg-muted/60"}`}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </nav>

        <div className="overflow-y-auto p-6">
          {section === "profile" && (
            <Card
              title="Workspace profile"
              desc="How PlantPure CRM appears to your team."
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[color:var(--leaf)]/20 text-[color:var(--leaf)]">
                  <Leaf className="h-7 w-7" />
                </div>
                <button className="rounded-lg border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
                  Change logo
                </button>
              </div>
              <Field label="Workspace name" value="PlantPure India" />
              <Field label="Website" value="https://plantpure.in" />
              <Field label="Default currency" value="INR (₹)" />
              <Field label="Timezone" value="Asia/Kolkata (IST)" />
            </Card>
          )}

          {section === "channels" && (
            <div className="space-y-4">
              {(Object.keys(channelMeta) as Channel[]).map((c) => {
                const m = channelMeta[c];
                const Icon = m.icon;
                const connected = c !== "facebook";
                return (
                  <Card
                    key={c}
                    title={m.label}
                    desc={`Manage your ${m.label} integration & webhook.`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid h-10 w-10 place-items-center rounded-xl ${m.tone}`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-sm font-medium">
                            {m.label} integration
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {connected
                              ? "Connected · last sync 2 min ago"
                              : "Not connected"}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`rounded-lg px-3 py-2 text-sm font-medium ${connected ? "border border-input bg-background hover:bg-muted" : "bg-primary text-primary-foreground hover:opacity-90"}`}
                      >
                        {connected ? "Manage" : "Connect"}
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {section === "team" && (
            <Card
              title="Team & roles"
              desc="Invite teammates and assign permissions."
            >
              <div className="mb-3 flex justify-end">
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                  <Plus className="h-4 w-4" /> Invite member
                </button>
              </div>
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-2">Member</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      n: "Riya M.",
                      e: "riya@plantpure.in",
                      r: "Admin",
                      s: "Active",
                    },
                    {
                      n: "Arjun K.",
                      e: "arjun@plantpure.in",
                      r: "Agent",
                      s: "Active",
                    },
                    {
                      n: "Sneha P.",
                      e: "sneha@plantpure.in",
                      r: "Agent",
                      s: "Invited",
                    },
                  ].map((m) => (
                    <tr key={m.e}>
                      <td className="py-3 font-medium">{m.n}</td>
                      <td className="text-muted-foreground">{m.e}</td>
                      <td>{m.r}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${m.s === "Active" ? "bg-emerald-500/15 text-emerald-700" : "bg-amber-500/15 text-amber-700"}`}
                        >
                          {m.s}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {section === "notifications" && (
            <Card
              title="Notifications"
              desc="Choose how you want to hear about new activity."
            >
              {[
                "New lead from website",
                "New Instagram DM",
                "New WhatsApp message",
                "Facebook ad comment",
                "Lead converted",
                "Daily summary email",
              ].map((n, i) => (
                <Toggle key={n} label={n} defaultOn={i % 2 === 0} />
              ))}
            </Card>
          )}

          {section === "automations" && (
            <Card
              title="Automations"
              desc="Auto-replies, assignment rules & follow-ups."
            >
              {[
                {
                  t: "Auto-reply on WhatsApp",
                  d: "Send greeting within 1 minute of new message.",
                },
                {
                  t: "Round-robin Instagram leads",
                  d: "Distribute new DMs across active agents.",
                },
                {
                  t: "Follow-up reminder",
                  d: "Ping owner if no reply in 24 hours.",
                },
                {
                  t: "Tag hot leads",
                  d: "Auto-tag leads viewing pricing page twice.",
                },
              ].map((a) => (
                <div
                  key={a.t}
                  className="flex items-center justify-between border-b border-border py-3 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.d}</div>
                  </div>
                  <Toggle defaultOn />
                </div>
              ))}
            </Card>
          )}

          {section === "billing" && (
            <Card title="Billing" desc="Manage your plan and invoices.">
              <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-background p-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Current plan
                  </div>
                  <div className="font-display text-xl">
                    Growth — ₹2,499 / month
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Renews Aug 12, 2026 · 5 of 10 seats used
                  </div>
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                  Upgrade
                </button>
              </div>
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="py-2">Invoice</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["INV-2026-06", "Jun 12", "₹2,499", "Paid"],
                    ["INV-2026-05", "May 12", "₹2,499", "Paid"],
                    ["INV-2026-04", "Apr 12", "₹2,499", "Paid"],
                  ].map((r) => (
                    <tr key={r[0]}>
                      <td className="py-3">{r[0]}</td>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-700">
                          {r[3]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}

          {section === "security" && (
            <Card
              title="Security"
              desc="Protect your workspace and team accounts."
            >
              <Toggle label="Require 2-factor authentication" defaultOn />
              <Toggle label="Single sign-on (SSO)" />
              <Toggle label="Auto-logout inactive sessions" defaultOn />
              <div className="mt-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  API keys
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm">
                  <span className="font-mono text-xs">
                    pp_live_••••••••8a21
                  </span>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Revoke
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

// function SettingsView() {
//   return (
//       <>
//       <PageHeader
//         title="Settings"
//         subtitle="Workspace, channel integrations, team and automations."
//       />
//       <Card title="Test">
//            <Toggle label="Test Toggle" />
//       </Card>
//     </>

//   );
// }

/* ---------------- HELPERS ---------------- */
function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card/60 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      {action}
    </header>
  );
}

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-4 rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <div className="font-display text-lg">{title}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <input
        defaultValue={value}
        className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}

function Toggle({ label, defaultOn }: { label?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
      {label && <span className="text-sm">{label}</span>}
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-[color:var(--leaf)]" : "bg-muted"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "border border-border bg-background text-muted-foreground hover:bg-muted"}`}
    >
      {label}
    </button>
  );
}

function NavItem({
  icon: Icon,
  label,
  badge,
  active,
  onClick,
}: {
  icon: typeof Globe;
  label: string;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"}`}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="rounded-md bg-[color:var(--leaf)]/30 px-1.5 py-0.5 text-[10px] font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}

function ChannelNav({
  icon: Icon,
  label,
  count,
  active,
  onClick,
  dot,
}: {
  icon: typeof Globe;
  label: string;
  count: number;
  active?: boolean;
  onClick: () => void;
  dot?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"}`}
    >
      <span className="relative">
        <Icon className="h-4 w-4" />
        {dot && (
          <span
            className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full"
            style={{ background: dot }}
          />
        )}
      </span>
      <span className="flex-1 text-left">{label}</span>
      <span className="text-[11px] opacity-70">{count}</span>
    </button>
  );
}

function Kpi({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  icon: typeof Globe;
  tone: "leaf" | "clay" | "bark";
}) {
  const map = {
    leaf: "bg-[color:var(--leaf)]/12 text-[color:var(--leaf)]",
    clay: "bg-[color:var(--clay)]/12 text-[color:var(--clay)]",
    bark: "bg-[color:var(--bark)]/15 text-[color:var(--bark)]",
  } as const;
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span
          className={`grid h-8 w-8 place-items-center rounded-lg ${map[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-2 font-display text-2xl">{value}</div>
      <div className="text-xs text-muted-foreground">{delta}</div>
    </div>
  );
}

function IconBtn({ icon: Icon }: { icon: typeof Globe }) {
  return (
    <button className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
      <Icon className="h-4 w-4" />
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function Activity({ time, text }: { time: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--leaf)]" />
      <div className="flex-1">
        <div>{text}</div>
        <div className="text-[10px] text-muted-foreground">{time} ago</div>
      </div>
    </li>
  );
}

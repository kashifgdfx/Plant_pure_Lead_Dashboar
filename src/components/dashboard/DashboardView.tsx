
import PageHeader from "../common/PageHeader";
import Kpi from "../common/Kpi";
import Activity from "../common/Activity";

import { LEADS } from "../../data/leads";
import { statusMeta } from "../../data/statusMeta";
import { channelMeta } from "../../data/channelMeta";

import type { Channel, Status } from "../../types/crm";

import {
  Download,
  Users,
  Inbox,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
export default function DashboardView() {
  return (
    <>
      {/* Dashboard Section Top Header */}
      <PageHeader
        title={
          <div className="flex items-center gap-4">
            <div>
              <div className="font-display text-3xl font-semibold tracking-tight">Dashboard</div>
              <div className="text-sm text-muted-foreground">
                Snapshot of leads, messages & revenue across all channels.
              </div>
            </div>
          </div>
        }
        subtitle={null}
        action={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      {/* Main Grid Workspace Layout */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-y-auto p-6">
        
        {/* --- KPI METRICS CARD LAYER --- */}
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <Kpi label="Total leads" value="1,284" delta="+12.4%" tone="leaf" icon={Users} />
          <Kpi label="Unread messages" value="37" delta="6 urgent" tone="clay" icon={Inbox} />
          <Kpi label="Conversion rate" value="18.6%" delta="+2.1%" tone="bark" icon={TrendingUp} />
          <Kpi label="Revenue (MTD)" value="₹4.82L" delta="+₹62k" tone="leaf" icon={CheckCircle2} />
        </div>

        {/* --- GRAPH TRACKING MATRIX CHART --- */}
        <div className="col-span-8 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Leads over time
              </div>
              <div className="font-display text-lg font-medium">Last 30 days</div>
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs bg-background">
              {["7D", "30D", "90D"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md px-3 py-1 transition-all ${
                    i === 1 ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <MiniBarChart />
        </div>

        {/* --- DISTRIBUTION SPLIT BY CHANNEL --- */}
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
              if (!meta) return null; // Safe check against empty meta object
              const Icon = meta.icon;
              return (
                <li key={s.ch}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="h-4 w-4 opacity-80" /> {meta.label}
                    </span>
                    <span className="text-muted-foreground">
                      {s.count} · {s.pct}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all duration-500 ${meta.chip}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- OPERATION PIPELINE PROGRESS --- */}
        <div className="col-span-7 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pipeline Stages
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(statusMeta) as Status[]).map((s) => {
              const count = LEADS.filter((l) => l.status === s).length;
              const currentMeta = statusMeta[s];
              if (!currentMeta) return null; // Safe check against casing mismatch crashes

              return (
                <div key={s} className="rounded-lg border border-border bg-background p-3 text-center transition-hover hover:border-muted-foreground/20">
                  <div className={`mx-auto mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${currentMeta.cls}`}>
                    {currentMeta.label}
                  </div>
                  <div className="font-display text-2xl font-semibold">{count}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">leads active</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- LIVE TIMELINE FEED AREA --- */}
        <div className="col-span-5 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent activity log
          </div>
          <ul className="space-y-3 text-sm">
            <Activity time="2m" text="Ananya Sharma sent a message on Website" />
            <Activity time="14m" text="Priya Iyer replied on Instagram" />
            <Activity time="31m" text="Riya Kapoor qualified on WhatsApp" />
            <Activity time="1h" text="Meera Nair converted · ₹2,199" />
            <Activity time="3h" text="New lead Sneha Patel from Website" />
          </ul>
        </div>

        {/* --- CATALOGUE TRENDING ITEMS LIST --- */}
        <div className="col-span-12 rounded-xl border border-border bg-card p-5">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top products by leads volume
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Hair Coloring Kit", leads: 412, rev: "₹1.84L" },
              { name: "Hibiscus Oil", leads: 318, rev: "₹1.12L" },
              { name: "Indigo Powder", leads: 224, rev: "₹68k" },
              { name: "Skin Botanicals Set", leads: 168, rev: "₹1.18L" },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-background p-4 hover:shadow-sm transition-all">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.leads} leads · {p.rev}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-[var(--leaf)]">
                  <ArrowUpRight className="h-3 w-3" /> Trending Up
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
  
  // Highest value extract ki taaki percentage scaling exact ho
  const max = Math.max(...bars);

  return (
    <div className="flex h-40 items-end gap-1.5 pt-4 w-full">
      {bars.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-[var(--leaf)]/70 transition-all duration-300 hover:bg-[var(--leaf)] cursor-pointer relative group"
          style={{ height: `${(v / max) * 100}%` }}
          title={`Leads: ${v}`}
        >
          {/* Tooltip on Hover */}
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background transition-all group-hover:scale-100 z-10">
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

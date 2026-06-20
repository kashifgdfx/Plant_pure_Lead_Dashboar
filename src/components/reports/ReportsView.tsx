
import PageHeader from "../common/PageHeader";
import Kpi from "../common/Kpi";
import { useState,useMemo  } from "react";

import {
  Download,
  Users,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { channelMeta } from "../../data/channelMeta";
import type { Channel } from "../../types/crm";

export default function ReportsView() {
  const [timeframe, setTimeframe] = useState("30-days");

  // 1. Static Performance Metrics Pre-allocated to prevent loop recreations
  const channelData = useMemo(() => [
    { ch: "website" as Channel, leads: 540, replies: 502, conv: 92, rev: "₹1.84L", up: true },
    { ch: "instagram" as Channel, leads: 360, replies: 340, conv: 64, rev: "₹1.12L", up: true },
    { ch: "whatsapp" as Channel, leads: 244, replies: 240, conv: 58, rev: "₹98k", up: true },
    { ch: "facebook" as Channel, leads: 140, replies: 122, conv: 22, rev: "₹38k", up: false },
  ], []);

  const leaderboard = useMemo(() => [
    { n: "Riya M.", deals: 28, rev: "₹1.42L" },
    { n: "Arjun K.", deals: 22, rev: "₹1.08L" },
    { n: "Sneha P.", deals: 18, rev: "₹84k" },
    { n: "Devika R.", deals: 12, rev: "₹52k" },
  ], []);

  const responseTimes = useMemo(() => [
    { ch: "whatsapp" as Channel, mins: 12 },
    { ch: "instagram" as Channel, mins: 28 },
    { ch: "facebook" as Channel, mins: 54 },
    { ch: "website" as Channel, mins: 72 },
  ], []);

  const funnelData = useMemo(() => [
    { l: "Captured", v: 1284, pct: 100 },
    { l: "Contacted", v: 1042, pct: 81 },
    { l: "Qualified", v: 486, pct: 38 },
    { l: "Converted", v: 238, pct: 18 },
  ], []);

  return (
    <>
      {/* Dynamic Interactive Page Control Header */}
      <PageHeader
        title="Reports & Analytics"
        subtitle="Channel performance, response times and revenue insights."
        action={
          <div className="flex gap-2">
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-ring cursor-pointer transition-all"
            >
              <option value="7-days">Last 7 days</option>
              <option value="30-days">Last 30 days</option>
              <option value="quarter">Last quarter</option>
            </select>
            <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted transition-colors">
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        }
      />

      {/* Main Analytical Grid Workspace Dashboard Layout */}
      <div className="grid flex-1 grid-cols-12 gap-4 overflow-y-auto p-6 max-h-[calc(100vh-80px)]">
        
        {/* KPI Scorecard Panels Row */}
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <Kpi label="New leads" value="412" delta="+18%" tone="leaf" icon={Users} />
          <Kpi label="Avg. response" value="42 min" delta="-9 min" tone="clay" icon={Clock} />
          <Kpi label="Reply rate" value="92%" delta="+3%" tone="bark" icon={MessageCircle} />
          <Kpi label="Won deals" value="76" delta="+12" tone="leaf" icon={CheckCircle2} />
        </div>

        {/* Channel Main Analytics Report Table */}
        <div className="col-span-8 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
            Channel performance
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-muted/20">
                <tr>
                  <th className="pb-3 pt-1 font-semibold">Channel</th>
                  <th className="pb-3 pt-1 font-semibold">Leads</th>
                  <th className="pb-3 pt-1 font-semibold">Replies</th>
                  <th className="pb-3 pt-1 font-semibold">Converted</th>
                  <th className="pb-3 pt-1 font-semibold">Revenue</th>
                  <th className="pb-3 pt-1 font-semibold text-right pr-2">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {channelData.map((r) => {
                  const meta = channelMeta[r.ch] || {};
                  const Icon = meta.icon;
                  return (
                    <tr key={r.ch} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3.5">
                        {Icon && (
                          <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${meta.tone || ''}`}>
                            <Icon className="h-3 w-3" /> {meta.label}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-foreground">{r.leads}</td>
                      <td className="py-3.5 text-foreground">{r.replies}</td>
                      <td className="py-3.5 text-foreground">{r.conv}</td>
                      <td className="py-3.5 font-semibold text-foreground">{r.rev}</td>
                      <td className="py-3.5 text-right pr-2">
                        {r.up ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--leaf)]">
                            <ArrowUpRight className="h-3.5 w-3.5" /> up
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-rose-600">
                            <ArrowDownRight className="h-3.5 w-3.5" /> down
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Active CRM Leaderboard Card */}
        <div className="col-span-4 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
            Team leaderboard
          </div>
          <ul className="space-y-3">
            {leaderboard.map((m, i) => (
              <li key={m.n} className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 hover:border-border/80 transition-colors">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--leaf)]/15 text-sm font-semibold text-[var(--leaf)] select-none">
                  #{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{m.n}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {m.deals} won · <b>{m.rev}</b>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Channels Performance Response Velocity Card */}
        <div className="col-span-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
            Response time by channel
          </div>
          <ul className="space-y-4">
            {responseTimes.map((r) => {
              const meta = channelMeta[r.ch] || {};
              const pct = Math.min(100, (r.mins / 90) * 100);
              return (
                <li key={r.ch} className="group">
                  <div className="mb-1.5 flex justify-between text-sm select-none">
                    <span className="font-medium text-foreground">{meta.label}</span>
                    <span className="text-muted-foreground font-medium group-hover:text-foreground transition-colors">{r.mins} min</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${meta.chip || 'bg-primary'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Pipeline Analytics Sales Funnel Card */}
        <div className="col-span-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
            Conversion Funnel
          </div>
          <ul className="space-y-3.5">
            {funnelData.map((s) => (
              <li key={s.l}>
                <div className="mb-1 flex justify-between text-sm select-none">
                  <span className="font-medium text-foreground">{s.l}</span>
                  <span className="text-muted-foreground text-xs">
                    <b>{s.v}</b> leads · <span className="text-foreground/90 font-medium">{s.pct}%</span>
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-md bg-muted">
                  <div
                    className="h-full bg-[var(--leaf)] transition-all duration-500 rounded-l-md"
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

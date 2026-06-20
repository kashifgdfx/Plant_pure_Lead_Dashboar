import {
  Search,
  Filter,
  Plus,
  Clock,
  Phone,
  Mail,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Inbox,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { channelMeta } from "../../data/channelMeta";
import { statusMeta } from "../../data/statusMeta";

import Kpi from "../common/Kpi";
import IconBtn from "../common/IconBtn";
import Activity from "../common/Activity";
import Row from "../common/Row";

import type {
  Channel,
  Status,
  Lead,
} from "../../types/crm";


export default function InboxView({
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
  active: Lead | undefined; // Safe tracking if array filters out completely
  setActiveId: (id: string) => void;
  query: string;
  setQuery: (v: string) => void;
  draft: string;
  setDraft: (v: string) => void;
}) {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] overflow-hidden h-screen">
      
      {/* --- HEADER PANEL SECTION --- */}
      <header className="flex items-center justify-between gap-4 border-b border-border bg-card/60 px-6 py-4 backdrop-blur shrink-0">
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
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads, products…"
              className="h-10 w-72 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> New lead
          </button>
        </div>
      </header>

      {/* --- QUICK KPI MONITOR STRIP --- */}
      <section className="grid grid-cols-4 gap-4 border-b border-border bg-background px-6 py-4 shrink-0">
        <Kpi label="Total leads" value="1,284" delta="+12.4%" tone="leaf" icon={Users} />
        <Kpi label="Unread messages" value="37" delta="6 urgent" tone="clay" icon={Inbox} />
        <Kpi label="Conversion rate" value="18.6%" delta="+2.1%" tone="bark" icon={TrendingUp} />
        <Kpi label="Revenue (MTD)" value="₹4.82L" delta="+₹62k" tone="leaf" icon={CheckCircle2} />
      </section>

      {/* --- SPLIT GRID AREA PANEL --- */}
      <section className="grid grid-cols-[1.1fr_1.4fr] gap-0 overflow-hidden flex-1">
        
        {/* --- LEFT PANEL: LEADS LIST --- */}
        <div className="flex flex-col overflow-hidden border-r border-border bg-card/40">
          <div className="flex items-center justify-between px-5 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground border-b border-border/50 bg-background/50">
            <span>
              {filtered.length} leads · {activeChannel === "all" ? "All channels" : channelMeta[activeChannel]?.label}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Sorted by recent
            </span>
          </div>
          
          <ul className="flex-1 divide-y divide-border/60 overflow-y-auto">
            {filtered.map((lead) => {
              const ch = channelMeta[lead.channel] || {};
              const Icon = ch.icon;
              const isActive = lead.id === active?.id;
              
              return (
                <li key={lead.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(lead.id)}
                    className={`flex w-full gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40 ${isActive ? "bg-muted/80 font-medium" : ""}`}
                  >
                    <div className="relative shrink-0">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--leaf)]/15 font-display text-sm font-semibold text-[var(--leaf)]">
                        {lead.initials}
                      </div>
                      {Icon && (
                        <span className={`absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full ring-2 ring-card ${ch.tone || ''}`}>
                          <Icon className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-semibold text-foreground">{lead.name}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{lead.time}</span>
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {lead.handle} · {lead.product}
                      </div>
                      <p className="mt-1 line-clamp-1 text-sm text-foreground/80">
                        {lead.lastMessage}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusMeta[lead.status]?.cls || ''}`}>
                          {statusMeta[lead.status]?.label}
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

        {/* --- RIGHT WORKSPACE: CHAT THREAD & META CONTEXT --- */}
        {active ? (
          <div className="grid grid-cols-[1.6fr_1fr] overflow-hidden">
            
            {/* MIDDLE CHAT WINDOW WINDOW */}
            <div className="flex flex-col overflow-hidden bg-background">
              {/* Chat Header */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-6 py-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[var(--leaf)]/15 font-display font-semibold text-[var(--leaf)]">
                    {active.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{active.name}</span>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${channelMeta[active.channel]?.tone || ''}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${channelMeta[active.channel]?.chip || ''}`} />
                        {channelMeta[active.channel]?.label}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{active.handle} · {active.city}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <IconBtn icon={Phone} />
                  <IconBtn icon={Mail} />
                  <IconBtn icon={MoreHorizontal} />
                </div>
              </div>

              {/* Chat Thread message lists */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-[var(--muted)]/20 px-6 py-6">
                <div className="mx-auto w-fit rounded-full bg-card px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
                  Today
                </div>
                {active.messages?.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${m.from === "agent" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-card text-foreground"}`}>
                      <p className="leading-relaxed">{m.text}</p>
                      <div className={`mt-1 text-[10px] ${m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {m.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FIXED CHAT INPUT PANEL BAR (Controlled securely for quick suggestion triggers) */}
              <div className="border-t border-border bg-card p-4 shrink-0">
                <div className="flex items-center gap-2 rounded-xl border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
                  <button type="button" className="p-2 text-muted-foreground hover:text-foreground shrink-0 transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={`Reply via ${channelMeta[active.channel]?.label || 'channel'}…`}
                    className="h-9 flex-1 bg-transparent px-2 text-sm outline-none text-foreground"
                  />
                  
                  <button type="button" className="p-2 text-muted-foreground hover:text-foreground shrink-0 transition-colors">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 shrink-0 transition-opacity">
                    <Send className="h-4 w-4" /> Send
                  </button>
                </div>
                
                {/* Quick Action Suggestion Strip */}
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {["Share product link", "Send discount code", "Ask for pincode", "Schedule call"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setDraft(s)}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- RIGHT PANEL SUB-SIDEBAR: LEAD CONTEXT CONTEXT INFO --- */}
            <aside className="space-y-4 overflow-y-auto border-l border-border bg-background p-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Lead Profile</div>
                <div className="mt-1 font-display text-lg font-medium">{active.name}</div>
                <div className="text-xs text-muted-foreground">{active.id} · Active CRM session</div>
              </div>
              
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Lifecycle Stage</div>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(statusMeta || {}) as Status[]).map((s) => (
                    <span
                      key={s}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${s === active.status ? statusMeta[s].cls + " ring-1 ring-current" : "bg-muted text-muted-foreground opacity-60"}`}
                    >
                      {statusMeta[s].label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</div>
                <Row label="Channel Source" value={channelMeta[active.channel]?.label} />
                <Row label="Inquired Product" value={active.product} />
                <Row label="Geographic City" value={active.city} />
                <Row label="Est. Deal Value" value={`₹${active.value?.toLocaleString("en-IN")}`} />
                <Row label="Account Owner" value="Riya M." />
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Segment Tags</div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {["Hair care", "First-time", "Hot lead", "COD"].map((t) => (
                    <span key={t} className="rounded-md bg-[var(--leaf)]/12 px-2 py-1 text-[var(--leaf)] font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-4">
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Log Activity</div>
                <ul className="space-y-3 text-xs">
                  <Activity time="2m" text="New message received" />
                  <Activity time="1h" text="Lead viewed Hair Coloring Kit" />
                  <Activity time="3h" text="Captured from website form" />
                </ul>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty Fallback State View if no matching lead found */
          <div className="flex flex-col items-center justify-center text-muted-foreground bg-background gap-2">
            <Inbox className="h-8 w-8 opacity-40" />
            <p className="text-sm">No leads match your active filters or query.</p>
          </div>
        )}
      </section>

    </div>
  );
}

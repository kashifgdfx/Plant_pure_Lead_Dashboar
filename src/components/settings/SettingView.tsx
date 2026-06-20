import { useMemo, useState } from "react";
import type { Channel } from "@/types/crm";
import PageHeader from "../common/PageHeader";
import {
  UserCircle,
  Plug,
  Users,
  Bell,
  Zap,
  CreditCard,
  Shield,
  Leaf,
  Plus,
} from "lucide-react";

import { channelMeta } from "../../data/channelMeta";



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

function Toggle({ label, defaultOn }: { label?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between py-1 w-full">
      {label && <span className="text-sm font-medium text-foreground">{label}</span>}
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          on ? "bg-[color:var(--leaf)]" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export const SETTINGS_SECTIONS = [
  { 
    id: "profile", 
    label: "Profile", 
    description: "Manage your public profile and personal credentials", 
    icon: UserCircle 
  },
  { 
    id: "channels", 
    label: "Channels", 
    description: "Connect webhooks, social links & messaging channels", 
    icon: Plug 
  },
  { 
    id: "team", 
    label: "Team & roles", 
    description: "Invite your agents, members and customize permission rules", 
    icon: Users 
  },
  { 
    id: "notifications", 
    label: "Notifications", 
    description: "Configure system alerts and priority triggers", 
    icon: Bell 
  },
  { 
    id: "automations", 
    label: "Automations", 
    description: "Set up fast routing rules and automatic auto-replies", 
    icon: Zap 
  },
  { 
    id: "billing", 
    label: "Billing", 
    description: "Update invoices, card updates and active plans", 
    icon: CreditCard 
  },
  { 
    id: "security", 
    label: "Security", 
    description: "Two-factor authentication, audit logs and session locks", 
    icon: Shield 
  },
] as const;

export type SettingsSectionId = (typeof SETTINGS_SECTIONS)[number]["id"];

export default function SettingsView() {
  // Strongly-typed state mapping
  const [section, setSection] = useState<SettingsSectionId>("profile");
  const sections = SETTINGS_SECTIONS;

  // Structural Arrays Memoization
  const billingInvoices = useMemo(() => [
    { id: "INV-2026-06", date: "Jun 12", amount: "₹2,499", status: "Paid" },
    { id: "INV-2026-05", date: "May 12", amount: "₹2,499", status: "Paid" },
    { id: "INV-2026-04", date: "Apr 12", amount: "₹2,499", status: "Paid" },
  ], []);

  const teamMembers = useMemo(() => [
    { n: "Riya M.", e: "riya@plantpure.in", r: "Admin", s: "Active" },
    { n: "Arjun K.", e: "arjun@plantpure.in", r: "Agent", s: "Active" },
    { n: "Sneha P.", e: "sneha@plantpure.in", r: "Agent", s: "Invited" },
  ], []);

  const notificationToggles = useMemo(() => [
    "New lead from website",
    "New Instagram DM",
    "New WhatsApp message",
    "Facebook ad comment",
    "Lead converted",
    "Daily summary email",
  ], []);

  const automationsList = useMemo(() => [
    { t: "Auto-reply on WhatsApp", d: "Send greeting within 1 minute of new message." },
    { t: "Round-robin Instagram leads", d: "Distribute new DMs across active agents." },
    { t: "Follow-up reminder", d: "Ping owner if no reply in 24 hours." },
    { t: "Tag hot leads", d: "Auto-tag leads viewing pricing page twice." },
  ], []);

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Workspace, channel integrations, team and automations."
      />
      
      {/* Container Frame with Explicit Context Boundaries */}
      <div className="grid flex-1 grid-cols-[220px_1fr] overflow-hidden min-h-[500px]">
        
        {/* Left Interactive Sidebar Panel */}
        <nav className="space-y-1 overflow-y-auto border-r border-border bg-card/40 p-4 select-none">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                section === s.id 
                  ? "bg-muted font-medium text-foreground" 
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <s.icon className="h-4 w-4 shrink-0" /> {s.label}
            </button>
          ))}
        </nav>

        {/* Right Dynamic View Render Target */}
        <div className="overflow-y-auto p-6 max-h-[calc(100vh-140px)]">
          
          {/* PROFILE VIEW PANEL */}
          {section === "profile" && (
            <Card
              title="Workspace profile"
              desc="How PlantPure CRM appears to your team."
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--leaf)]/20 text-[var(--leaf)]">
                  <Leaf className="h-7 w-7" />
                </div>
                <button type="button" className="rounded-lg border border-input bg-background px-3 py-2 text-sm hover:bg-muted transition-colors">
                  Change logo
                </button>
              </div>
              <div className="space-y-3 max-w-xl">
                {[
                  { label: "Workspace Name", value: "PlantPure India" },
                  { label: "Website", value: "https://plantpure.in" },
                  { label: "Default Currency", value: "INR (₹)" },
                  { label: "Timezone", value: "Asia/Kolkata (IST)" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-background p-3">
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="mt-1 text-sm font-medium text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* CHANNELS INTEGRATIONS PANEL */}
          {section === "channels" && (
            <div className="space-y-4 max-w-3xl">
              {(Object.keys(channelMeta || {}) as Channel[]).map((c) => {
                const m = channelMeta[c];
                if (!m) return null;
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
                        <span className={`grid h-10 w-10 place-items-center rounded-xl shrink-0 ${m.tone || 'bg-muted'}`}>
                          {Icon && <Icon className="h-5 w-5" />}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {m.label} integration
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {connected ? "Connected · last sync 2 min ago" : "Not connected"}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          connected ? "border border-input bg-background hover:bg-muted text-foreground" : "bg-primary text-primary-foreground hover:opacity-90"
                        }`}
                      >
                        {connected ? "Manage" : "Connect"}
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* TEAM MANAGEMENT VIEW PANEL */}
          {section === "team" && (
            <Card
              title="Team & roles"
              desc="Invite teammates and assign permissions."
            >
              <div className="mb-3 flex justify-end">
                <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                  <Plus className="h-4 w-4" /> Invite member
                </button>
              </div>
              <div className="overflow-x-auto border border-border rounded-xl bg-background">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase tracking-wider text-muted-foreground bg-muted/40 border-b border-border">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Member</th>
                      <th className="px-4 py-2.5 font-semibold">Email</th>
                      <th className="px-4 py-2.5 font-semibold">Role</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {teamMembers.map((m) => (
                      <tr key={m.e} className="hover:bg-muted/5 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{m.n}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.e}</td>
                        <td className="px-4 py-3 text-foreground">{m.r}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            m.s === "Active" ? "bg-emerald-500/15 text-emerald-700" : "bg-amber-500/15 text-amber-700"
                          }`}>
                            {m.s}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* NOTIFICATIONS SETUP PANEL */}
          {section === "notifications" && (
            <Card
              title="Notifications"
              desc="Choose how you want to hear about new activity."
            >
              <div className="space-y-1 divide-y divide-border/40 max-w-2xl">
                {notificationToggles.map((n, i) => (
                  <div key={n} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <Toggle label={n} defaultOn={i % 2 === 0} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* AUTOMATIONS PREFERENCES PANEL */}
          {section === "automations" && (
            <Card
              title="Automations"
              desc="Auto-replies, assignment rules & follow-ups."
            >
              <div className="space-y-1 divide-y divide-border/50 max-w-3xl">
                {automationsList.map((a) => (
                  <div key={a.t} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="pr-4">
                      <div className="text-sm font-medium text-foreground">{a.t}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.d}</div>
                    </div>
                    <Toggle defaultOn />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* INVOICES AND BILLING STATEMENTS */}
          {section === "billing" && (
            <Card title="Billing" desc="Manage your plan and invoices.">
              <div className="mb-4 flex items-center justify-between rounded-xl border border-border bg-background p-4 max-w-3xl">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Current plan</div>
                  <div className="font-display text-xl text-foreground mt-0.5">Growth — ₹2,499 / month</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Renews Aug 12, 2026 · 5 of 10 seats used</div>
                </div>
                <button type="button" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
                  Upgrade
                </button>
              </div>
              <div className="overflow-x-auto border border-border rounded-xl max-w-3xl">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase text-muted-foreground bg-muted/40 border-b border-border">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Invoice</th>
                      <th className="px-4 py-2.5 font-semibold">Date</th>
                      <th className="px-4 py-2.5 font-semibold">Amount</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {billingInvoices.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/5 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-foreground">{r.id}</td>
                        <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{r.amount}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-700 font-medium">
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* WORKSPACE SECURITY ACCESS */}
          {section === "security" && (
            <Card
              title="Security"
              desc="Protect your workspace and team accounts."
            >
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-3 border-b border-border/40 pb-4">
                  <Toggle label="Require 2-factor authentication" defaultOn />
                  <Toggle label="Single sign-on (SSO)" />
                  <Toggle label="Auto-logout inactive sessions" defaultOn />
                </div>
                <div className="pt-1">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground select-none">
                    API keys
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm shadow-inner">
                    <span className="font-mono text-xs text-foreground select-all tracking-wider">
                      pp_live_••••••••8a21
                    </span>
                    <button type="button" className="text-xs font-medium text-destructive hover:underline">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
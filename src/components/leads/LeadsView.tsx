import { useState,useMemo } from "react";
import type { Lead, Status, Channel } from "../../types/crm";
import PageHeader from "../common/PageHeader";
import FilterPill from "../common/FilterPill";
import { LEADS } from "../../data/leads";
import { statusMeta } from "../../data/statusMeta";
import { channelMeta } from "../../data/channelMeta";

import {
  Search,
  Download,
  Plus,
  MoreHorizontal,
} from "lucide-react";


export default function LeadsView({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (v: string) => void;
}) {
  const [status, setStatus] = useState<Status | "all">("all");

  // 1. Memoized Filtering Loop Optimization
  const rows = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();
    return LEADS.filter((l) => {
      const matchesStatus = status === "all" || l.status === status;
      const matchesQuery = !lowerQuery || 
        l.name.toLowerCase().includes(lowerQuery) ||
        l.product.toLowerCase().includes(lowerQuery);
      
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  // 2. Pre-calculating Status Counts to prevent Nested Array Loops inside Map
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    LEADS.forEach((l) => {
      if (l.status) counts[l.status] = (counts[l.status] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      {/* Top Section Header Layout */}
      <PageHeader
        title="All Leads"
        subtitle="A unified table of every lead captured across channels."
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads…"
                className="h-10 w-64 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted transition-colors">
              <Download className="h-4 w-4" /> Export CSV
            </button>
            <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              <Plus className="h-4 w-4" /> New lead
            </button>
          </div>
        }
      />

      {/* Main Workspace Frame container */}
      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        
        {/* Filter Badges Strip */}
        <div className="mb-4 flex flex-wrap gap-2">
          <FilterPill
            active={status === "all"}
            onClick={() => setStatus("all")}
            label={`All (${LEADS.length})`}
          />
          {(Object.keys(statusMeta || {}) as Status[]).map((s) => {
            const meta = statusMeta[s];
            if (!meta) return null;
            return (
              <FilterPill
                key={s}
                active={status === s}
                onClick={() => setStatus(s)}
                label={`${meta.label} (${statusCounts[s] || 0})`}
              />
            );
          })}
        </div>

        {/* Unified Modern Responsive Table Grid layout */}
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground select-none border-b border-border">
                <tr>
                  <th className="p-4 w-10">
                    <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                  </th>
                  <th className="px-4 py-3.5 font-semibold">Lead Info</th>
                  <th className="px-4 py-3.5 font-semibold">Channel</th>
                  <th className="px-4 py-3.5 font-semibold">Product Inquired</th>
                  <th className="px-4 py-3.5 font-semibold">City Location</th>
                  <th className="px-4 py-3.5 font-semibold">Pipeline Status</th>
                  <th className="px-4 py-3.5 font-semibold">Est. Deal Value</th>
                  <th className="px-4 py-3.5 font-semibold">Last active</th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {rows.length > 0 ? (
                  rows.map((l) => {
                    const meta = channelMeta[l.channel] || {};
                    const Icon = meta.icon;
                    const sMeta = statusMeta[l.status] || {};

                    return (
                      <tr key={l.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="p-4">
                          <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--leaf)]/15 text-xs font-semibold text-[var(--leaf)] select-none">
                              {l.initials}
                            </div>
                            <div className="min-w-0 max-w-[180px]">
                              <div className="font-medium text-foreground truncate">{l.name}</div>
                              <div className="text-xs text-muted-foreground truncate">{l.handle}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {Icon && (
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${meta.tone || ''}`}>
                              <Icon className="h-3 w-3 opacity-90" /> {meta.label}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground max-w-[150px] truncate">{l.product}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{l.city}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {sMeta.label && (
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${sMeta.cls || ''}`}>
                              {sMeta.label}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                          ₹{l.value?.toLocaleString("en-IN") || "0"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{l.time} ago</td>
                        <td className="p-4">
                          <button type="button" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  /* Empty Fallback State inside the row layer */
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-sm text-muted-foreground">
                      No leads match the selected filter query criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Pagination Interface Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground select-none shrink-0">
          <span>
            Showing <b>{rows.length}</b> of <b>{LEADS.length}</b> records
          </span>
          <div className="flex gap-1.5">
            <button type="button" className="rounded-md border border-border px-3 py-1.5 font-medium hover:bg-muted transition-colors disabled:opacity-40">
              Previous
            </button>
            <button type="button" className="rounded-md border border-border px-3 py-1.5 font-medium hover:bg-muted transition-colors disabled:opacity-40">
              Next
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
import type { Status } from "../types/crm";

export const statusMeta: Record<Status, { label: string; cls: string }> = {
  new: {
    label: "New",
    cls: "bg-[var(--leaf)]/15 text-[var(--leaf)]",
  },
  contacted: {
    label: "Contacted",
    cls: "bg-[var(--clay)]/15 text-[var(--clay)]",
  },
  qualified: {
    label: "Qualified",
    cls: "bg-amber-500/15 text-amber-700",
  },
  converted: {
    label: "Converted",
    cls: "bg-emerald-600/15 text-emerald-700",
  },
  Won: {
    label: "Won",
    cls: "bg-emerald-600/15 text-emerald-700",
  },
  lost: {
    label: "Lost",
    cls: "bg-rose-500/15 text-rose-600",
  },
};
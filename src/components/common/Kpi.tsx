import { Globe } from "lucide-react";
export default function Kpi({
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

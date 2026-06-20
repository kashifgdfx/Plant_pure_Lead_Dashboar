import { Globe } from "lucide-react";

type ChannelNavProps = {
  icon: typeof Globe;
  label: string;
  count: number;
  active?: boolean;
  onClick: () => void;
  dot?: string;
};

export default function ChannelNav({
  icon: Icon,
  label,
  count,
  active,
  onClick,
  dot,
}: ChannelNavProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
      }`}
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
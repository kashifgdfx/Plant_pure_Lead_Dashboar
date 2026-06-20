import { Globe } from "lucide-react";

type NavItemProps = {
  icon: typeof Globe;
  label: string;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
};

export default function NavItem({
  icon: Icon,
  label,
  badge,
  active,
  onClick,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-sidebar-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60"
      }`}
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
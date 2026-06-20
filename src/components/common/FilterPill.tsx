export default function FilterPill({
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

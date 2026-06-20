export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border bg-card/60 px-6 py-3.5 backdrop-blur-md sticky top-0 z-40 shrink-0">
      <div className="space-y-0.5">
        <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-xs text-muted-foreground leading-normal max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2 shrink-0 sm:mt-0 mt-2">
          {action}
        </div>
      )}
    </header>
  );
}
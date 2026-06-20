export default function Activity({ time, text }: { time: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--leaf)]" />
      <div className="flex-1">
        <div>{text}</div>
        <div className="text-[10px] text-muted-foreground">{time} ago</div>
      </div>
    </li>
  );
}

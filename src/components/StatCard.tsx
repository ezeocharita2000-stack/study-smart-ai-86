import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "success" | "warning";

const toneMap: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-secondary text-secondary-foreground",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-card transition-shadow hover:shadow-lift sm:p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">{value}</p>
        </div>
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {hint ? <p className="mt-2 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

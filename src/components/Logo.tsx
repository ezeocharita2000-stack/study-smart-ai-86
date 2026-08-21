import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-xl",
          inverted ? "bg-background/15 text-primary-foreground" : "bg-primary text-primary-foreground",
        )}
      >
        <GraduationCap className="h-5 w-5" />
      </span>
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          inverted ? "text-primary-foreground" : "text-foreground",
        )}
      >
        StudySmart<span className="text-accent"> AI</span>
      </span>
    </Link>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { student } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learn", label: "Learn", icon: BookOpen },
  { to: "/quiz", label: "Quiz", icon: ClipboardList },
  { to: "/study-plan", label: "Study Plan", icon: CalendarDays },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-sidebar px-4 py-5 lg:flex">
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="rounded-2xl bg-soft-gradient p-4">
          <p className="font-display text-sm font-semibold">Free plan</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {student.studyStreakNote ?? "3 of 5 daily AI lessons used today."}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
            <div className="h-full w-3/5 rounded-full bg-primary" />
          </div>
        </div>
        <Link
          to="/login"
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4.5 w-4.5" />
          Log out
        </Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <div className="lg:hidden">
                <Logo />
              </div>
              <h1 className="mt-1 truncate font-display text-xl font-bold sm:text-2xl lg:mt-0">
                {title}
              </h1>
              {subtitle ? (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {action}
              <button
                aria-label="Notifications"
                className="relative grid h-10 w-10 place-items-center rounded-xl border bg-card text-muted-foreground transition-colors hover:text-foreground"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-warning" />
              </button>
              <Link
                to="/profile"
                className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
              >
                {student.initials}
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:pb-12">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-6">
          {nav.map((item) => {
            const active = pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate px-0.5">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

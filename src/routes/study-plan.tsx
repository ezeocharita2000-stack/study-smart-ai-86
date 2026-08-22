import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Circle, Loader2, Clock, CalendarDays, Plus, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { studyPlan } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan — StudySmart AI" },
      {
        name: "description",
        content: "Your personalised weekly study timetable with dates, times, subjects, topics and completion status.",
      },
      { property: "og:title", content: "Study Plan — StudySmart AI" },
      { property: "og:description", content: "A realistic weekly timetable built around your weak areas." },
    ],
  }),
  component: StudyPlanPage,
});

const subjectTone: Record<string, string> = {
  Biology: "bg-success-soft text-success",
  Mathematics: "bg-primary-soft text-primary",
  Chemistry: "bg-warning-soft text-warning",
  English: "bg-secondary text-secondary-foreground",
  Physics: "bg-muted text-foreground",
};

function StatusIcon({ status }: { status: string }) {
  if (status === "done") return <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />;
  if (status === "in-progress") return <Loader2 className="h-5 w-5 shrink-0 text-warning" />;
  return <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />;
}

function StudyPlanPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const allTasks = studyPlan.flatMap((d) => d.tasks);
  const doneCount =
    allTasks.filter((t) => t.status === "done").length + completed.length;
  const pct = Math.round((doneCount / allTasks.length) * 100);

  return (
    <AppShell
      title="Study Plan"
      subtitle="Week of 24 – 28 August · built around your weak areas"
      action={
        <Button className="hidden sm:inline-flex" variant="outline">
          <Plus className="mr-1.5 h-4 w-4" /> Add task
        </Button>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-4">
          {studyPlan.map((day) => (
            <section key={day.date} className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <CalendarDays className="h-4.5 w-4.5" />
                </span>
                <h2 className="min-w-0 truncate font-display text-base font-semibold">{day.date}</h2>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {day.tasks.length} session{day.tasks.length > 1 ? "s" : ""}
                </span>
              </div>

              <ol className="mt-4 space-y-3 border-l pl-4">
                {day.tasks.map((t) => {
                  const key = day.date + t.topic;
                  const done = t.status === "done" || completed.includes(key);
                  return (
                    <li key={key} className="relative">
                      <span className="absolute -left-[1.4rem] top-4 h-2 w-2 rounded-full bg-border" />
                      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 transition-shadow hover:shadow-card">
                        <button
                          aria-label="Toggle complete"
                          onClick={() =>
                            setCompleted((prev) =>
                              prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
                            )
                          }
                        >
                          <StatusIcon status={done ? "done" : t.status} />
                        </button>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                                subjectTone[t.subject] ?? "bg-muted",
                              )}
                            >
                              {t.subject}
                            </span>
                            <span
                              className={cn(
                                "truncate text-sm font-semibold",
                                done && "text-muted-foreground line-through",
                              )}
                            >
                              {t.topic}
                            </span>
                          </div>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" /> {t.time} · {t.duration}
                          </p>
                        </div>
                        <Button size="sm" variant={done ? "ghost" : "secondary"} className="shrink-0">
                          {done ? "Done" : "Start"}
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h3 className="font-display text-base font-semibold">This week</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {doneCount} of {allTasks.length} sessions completed
            </p>
            <Progress value={pct} className="mt-3 h-2" />
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-muted p-3">
                <p className="font-display text-xl font-bold">{pct}%</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
              <div className="rounded-xl bg-muted p-3">
                <p className="font-display text-xl font-bold">5h 20m</p>
                <p className="text-xs text-muted-foreground">Planned</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-hero-gradient p-5 text-primary-foreground shadow-lift">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5" />
              <p className="font-display text-base font-semibold">Why this plan?</p>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Mathematics gets the longest sessions this week because Simultaneous Equations is your
              weakest topic. Biology sessions are shorter revision blocks to protect what you already
              know.
            </p>
          </div>

          <Button variant="outline" className="w-full sm:hidden">
            <Plus className="mr-1.5 h-4 w-4" /> Add task
          </Button>
        </aside>
      </div>
    </AppShell>
  );
}

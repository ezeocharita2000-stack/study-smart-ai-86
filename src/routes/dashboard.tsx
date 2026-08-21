import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  Target,
  Flame,
  ArrowRight,
  CheckCircle2,
  Circle,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  student,
  stats,
  continueLearning,
  todayPlan,
  weakAreas,
  strongAreas,
  recentQuizzes,
  recentActivity,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — StudySmart AI" },
      {
        name: "description",
        content: "Your study dashboard: topics studied, quiz scores, today's plan, weak areas and recent activity.",
      },
      { property: "og:title", content: "Dashboard — StudySmart AI" },
      { property: "og:description", content: "Track topics, quizzes, streaks and today's study plan." },
    ],
  }),
  component: Dashboard,
});

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate font-display text-lg font-semibold">{title}</h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function scoreTone(score: number) {
  if (score >= 75) return "text-success";
  if (score >= 55) return "text-warning";
  return "text-destructive";
}

function Dashboard() {
  return (
    <AppShell
      title={`Welcome back, ${student.firstName} 👋`}
      subtitle={`${student.level} · ${student.school}`}
      action={
        <Button asChild className="hidden sm:inline-flex">
          <Link to="/learn">
            <Sparkles className="mr-1.5 h-4 w-4" /> Start a lesson
          </Link>
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Topics studied" value={stats.topicsStudied} icon={BookOpen} hint="+5 this week" />
        <StatCard
          label="Quizzes completed"
          value={stats.quizzesCompleted}
          icon={ClipboardList}
          tone="accent"
          hint="3 this week"
        />
        <StatCard
          label="Average score"
          value={`${stats.averageScore}%`}
          icon={Target}
          tone="success"
          hint="Up 6% from last month"
        />
        <StatCard
          label="Study streak"
          value={`${stats.studyStreak} days`}
          icon={Flame}
          tone="warning"
          hint="Keep it going today"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <Section
            title="Continue learning"
            action={
              <Link to="/learn" className="shrink-0 text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            }
          >
            <div className="space-y-3">
              {continueLearning.map((c) => (
                <div
                  key={c.topic}
                  className="rounded-xl border p-4 transition-shadow hover:shadow-card"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {c.subject}
                      </p>
                      <p className="truncate font-display text-base font-semibold">{c.topic}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Last studied {c.lastStudied}</p>
                    </div>
                    <Button asChild size="sm" variant="secondary" className="shrink-0">
                      <Link to="/learn">
                        Resume <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={c.progress} className="h-2" />
                    <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                      {c.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section
            title="Today's study plan"
            action={
              <Link to="/study-plan" className="shrink-0 text-sm font-medium text-primary hover:underline">
                Full plan
              </Link>
            }
          >
            <ul className="space-y-2">
              {todayPlan.map((t) => (
                <li
                  key={t.topic}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3"
                >
                  {t.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  ) : (
                    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "truncate text-sm font-semibold",
                        t.done && "text-muted-foreground line-through",
                      )}
                    >
                      {t.topic}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {t.subject} · {t.time} · {t.duration}
                    </p>
                  </div>
                  <Button asChild size="sm" variant={t.done ? "ghost" : "default"} className="shrink-0">
                    <Link to="/learn">{t.done ? "Review" : "Start"}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid gap-5 sm:grid-cols-2">
            <Section title="Weak areas">
              <ul className="space-y-3">
                {weakAreas.map((w) => (
                  <li key={w.topic}>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                      <span className="truncate text-sm font-medium">{w.topic}</span>
                      <span className="shrink-0 text-sm font-bold text-warning">{w.score}%</span>
                    </div>
                    <p className="ml-6 text-xs text-muted-foreground">{w.subject}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link to="/learn">Study a weak topic</Link>
              </Button>
            </Section>

            <Section title="Strong areas">
              <ul className="space-y-3">
                {strongAreas.map((s) => (
                  <li key={s.topic}>
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
                      <TrendingUp className="h-4 w-4 shrink-0 text-success" />
                      <span className="truncate text-sm font-medium">{s.topic}</span>
                      <span className="shrink-0 text-sm font-bold text-success">{s.score}%</span>
                    </div>
                    <p className="ml-6 text-xs text-muted-foreground">{s.subject}</p>
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                <Link to="/quiz">Take a challenge quiz</Link>
              </Button>
            </Section>
          </div>
        </div>

        <div className="space-y-5">
          <Section
            title="Recent quiz results"
            action={
              <Link to="/quiz-results" className="shrink-0 text-sm font-medium text-primary hover:underline">
                Details
              </Link>
            }
          >
            <ul className="space-y-3">
              {recentQuizzes.map((q) => (
                <li key={q.topic} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{q.topic}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {q.subject} · {q.total} questions · {q.date}
                    </p>
                  </div>
                  <span className={cn("shrink-0 font-display text-lg font-bold", scoreTone(q.score))}>
                    {q.score}%
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Recent activity">
            <ol className="space-y-4">
              {recentActivity.map((a) => (
                <li key={a.label} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{a.label}</p>
                    <p className="text-xs text-muted-foreground">{a.meta}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <div className="rounded-2xl bg-hero-gradient p-5 text-primary-foreground shadow-lift">
            <p className="font-display text-lg font-semibold">AI suggestion</p>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Simultaneous Equations is your lowest-scoring topic at 42%. A 30-minute session today
              could lift your Mathematics average by about 8%.
            </p>
            <Button asChild variant="secondary" size="sm" className="mt-4 font-semibold">
              <Link to="/learn">Fix it now</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

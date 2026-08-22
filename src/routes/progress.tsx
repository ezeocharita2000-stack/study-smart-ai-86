import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Target,
  BookOpen,
  ClipboardList,
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { Progress } from "@/components/ui/progress";
import { weeklyScores, subjectMastery, studyTimeSplit, strongAreas, weakAreas } from "@/lib/mock-data";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — StudySmart AI" },
      {
        name: "description",
        content: "Track average score, topics completed, questions answered, study time, streaks and subject mastery.",
      },
      { property: "og:title", content: "Progress — StudySmart AI" },
      { property: "og:description", content: "Charts and insights on how your studying is going." },
    ],
  }),
  component: ProgressPage,
});

const PIE_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "var(--color-card)",
  color: "var(--color-card-foreground)",
  fontSize: 12,
};

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-card">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-4 h-64 w-full">{children}</div>
    </section>
  );
}

function ProgressPage() {
  return (
    <AppShell title="Progress" subtitle="Last 6 weeks of study activity">
      <div className="rounded-2xl bg-hero-gradient p-6 text-primary-foreground shadow-lift">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="text-sm text-primary-foreground/80">Overall syllabus progress</p>
            <p className="font-display text-4xl font-extrabold">64%</p>
            <p className="mt-1 text-sm text-primary-foreground/85">
              47 of 73 SS2 topics covered across your 5 subjects.
            </p>
          </div>
          <div className="w-full sm:w-72">
            <Progress value={64} className="h-3 bg-background/25" />
            <p className="mt-2 text-xs text-primary-foreground/75">
              At your current pace you will finish the term syllabus by 14 October.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Average score" value="78%" icon={Target} tone="success" hint="+6% this month" />
        <StatCard label="Topics completed" value={47} icon={BookOpen} hint="Across 5 subjects" />
        <StatCard label="Questions answered" value={412} icon={ClipboardList} tone="accent" hint="23 quizzes" />
        <StatCard label="Correct answers" value={321} icon={CheckCircle2} tone="success" hint="78% accuracy" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Study time" value="19h 45m" icon={Clock} hint="This month" />
        <StatCard label="Study streak" value="12 days" icon={Flame} tone="warning" hint="Best: 18 days" />
        <StatCard label="Best subject" value="Biology" icon={TrendingUp} tone="success" hint="86% mastery" />
        <StatCard label="Needs work" value="Maths" icon={AlertTriangle} tone="warning" hint="52% mastery" />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard title="Average score trend" subtitle="Weekly quiz average (%)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyScores} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="var(--color-chart-1)"
                strokeWidth={3}
                fill="url(#scoreFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Subject mastery" subtitle="Estimated mastery per subject (%)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectMastery} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="subject" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="mastery" radius={[8, 8, 0, 0]}>
                {subjectMastery.map((s) => (
                  <Cell
                    key={s.subject}
                    fill={
                      s.mastery >= 75
                        ? "var(--color-success)"
                        : s.mastery >= 60
                          ? "var(--color-chart-2)"
                          : "var(--color-warning)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Study time split" subtitle="Share of minutes studied per subject">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={studyTimeSplit}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {studyTimeSplit.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {studyTimeSplit.map((s, i) => (
              <span key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {s.name} {s.value}%
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Weekly study minutes" subtitle="Total minutes studied per week">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyScores} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="minutes" radius={[8, 8, 0, 0]} fill="var(--color-chart-2)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold">Strong topics</h2>
          <ul className="mt-4 space-y-3">
            {strongAreas.map((s) => (
              <li key={s.topic}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-sm">
                  <span className="truncate font-medium">{s.topic}</span>
                  <span className="font-bold text-success">{s.score}%</span>
                </div>
                <Progress value={s.score} className="mt-1.5 h-1.5" />
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold">Weak topics</h2>
          <ul className="mt-4 space-y-3">
            {weakAreas.map((s) => (
              <li key={s.topic}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 text-sm">
                  <span className="truncate font-medium">{s.topic}</span>
                  <span className="font-bold text-warning">{s.score}%</span>
                </div>
                <Progress value={s.score} className="mt-1.5 h-1.5" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}

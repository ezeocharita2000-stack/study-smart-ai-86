import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Lightbulb,
  ListChecks,
  BookMarked,
  FlaskConical,
  AlertTriangle,
  Star,
  FileText,
  RefreshCw,
  Baby,
  Wand2,
  ClipboardList,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SUBJECTS, lesson } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "AI Tutor — Learn any topic | StudySmart AI" },
      {
        name: "description",
        content:
          "Enter a topic, choose your subject and difficulty, and get a clear AI lesson with key concepts, examples and common mistakes.",
      },
      { property: "og:title", content: "AI Tutor — Learn any topic | StudySmart AI" },
      {
        property: "og:description",
        content: "Clear explanations, key terms, worked examples and the mistakes to avoid.",
      },
    ],
  }),
  component: LearnPage,
});

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

function LessonBlock({
  icon: Icon,
  title,
  tone = "primary",
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  tone?: "primary" | "success" | "warning" | "accent";
  children: React.ReactNode;
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    accent: "bg-secondary text-secondary-foreground",
  };
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", tones[tone])}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        <h2 className="min-w-0 truncate font-display text-lg font-semibold">{title}</h2>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

function LearnPage() {
  const [topic, setTopic] = useState("Photosynthesis");
  const [subject, setSubject] = useState("Biology");
  const [difficulty, setDifficulty] = useState<string>("Intermediate");
  const [state, setState] = useState<"empty" | "loading" | "ready">("ready");
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  function start() {
    if (!topic.trim()) {
      setError("Type a topic first — for example “Photosynthesis” or “Quadratic Equations”.");
      return;
    }
    setError("");
    setNote("");
    setState("loading");
    setTimeout(() => setState("ready"), 1200);
  }

  function tutorAction(label: string) {
    setNote(label);
    setState("loading");
    setTimeout(() => setState("ready"), 900);
  }

  return (
    <AppShell title="AI Tutor" subtitle="Learn any topic in your own words and at your own pace">
      <div className="grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <div className="rounded-2xl border bg-card p-5 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold">What are we studying?</h2>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTIES.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={cn(
                      "rounded-xl border px-1 py-2 text-xs font-semibold transition-colors",
                      difficulty === d
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            {error ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            ) : null}
            <Button className="w-full" size="lg" onClick={start} disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing lesson…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Start Learning
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Suggested for you
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Simultaneous Equations", "Mole Concept", "Electric Circuits", "Transport in Plants"].map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {state === "empty" ? (
            <div className="grid place-items-center rounded-2xl border border-dashed bg-card p-12 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Sparkles className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">No lesson yet</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Enter a topic on the left and press Start Learning. Your lesson will appear here with
                explanations, examples and a quick summary.
              </p>
            </div>
          ) : null}

          {state === "loading" ? (
            <div className="space-y-4">
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {note ? `${note}…` : `Building your ${difficulty.toLowerCase()} lesson on ${topic}…`}
                </div>
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
              <div className="rounded-2xl border bg-card p-5">
                <Skeleton className="h-5 w-40" />
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          ) : null}

          {state === "ready" ? (
            <>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-hero-gradient p-5 text-primary-foreground shadow-lift">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                    {subject} · {difficulty}
                  </p>
                  <h2 className="truncate font-display text-2xl font-bold">{topic}</h2>
                  {note ? (
                    <p className="mt-1 text-xs text-primary-foreground/80">Adjusted: {note}</p>
                  ) : null}
                </div>
                <Button asChild variant="secondary" size="sm" className="shrink-0 font-semibold">
                  <Link to="/quiz">
                    <ClipboardList className="mr-1.5 h-4 w-4" /> Test me
                  </Link>
                </Button>
              </div>

              <LessonBlock icon={Lightbulb} title="Simple explanation">
                <p>{lesson.simpleExplanation}</p>
              </LessonBlock>

              <LessonBlock icon={ListChecks} title="Key concepts" tone="accent">
                <ul className="space-y-2">
                  {lesson.keyConcepts.map((k) => (
                    <li key={k} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </LessonBlock>

              <LessonBlock icon={BookMarked} title="Important terms" tone="accent">
                <dl className="grid gap-3 sm:grid-cols-2">
                  {lesson.terms.map((t) => (
                    <div key={t.term} className="rounded-xl bg-muted p-3">
                      <dt className="font-semibold">{t.term}</dt>
                      <dd className="mt-1 text-muted-foreground">{t.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </LessonBlock>

              <LessonBlock icon={FlaskConical} title="Examples" tone="success">
                <ol className="space-y-3">
                  {lesson.examples.map((e, i) => (
                    <li key={e} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success-soft text-xs font-bold text-success">
                        {i + 1}
                      </span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ol>
              </LessonBlock>

              <LessonBlock icon={AlertTriangle} title="Common mistakes" tone="warning">
                <ul className="space-y-2">
                  {lesson.mistakes.map((m) => (
                    <li key={m} className="rounded-xl bg-warning-soft p-3 text-foreground">
                      {m}
                    </li>
                  ))}
                </ul>
              </LessonBlock>

              <LessonBlock icon={Star} title="Remember this" tone="success">
                <p className="font-display text-base font-semibold">{lesson.remember}</p>
              </LessonBlock>

              <LessonBlock icon={FileText} title="Quick summary">
                <p>{lesson.summary}</p>
              </LessonBlock>

              <div className="sticky bottom-20 rounded-2xl border bg-card/95 p-3 shadow-lift backdrop-blur lg:bottom-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Button variant="outline" size="sm" onClick={() => tutorAction("Explaining again")}>
                    <RefreshCw className="mr-1.5 h-4 w-4" /> Explain Again
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => tutorAction("Made simpler")}>
                    <Baby className="mr-1.5 h-4 w-4" /> Make It Easier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => tutorAction("New example added")}>
                    <Wand2 className="mr-1.5 h-4 w-4" /> Give an Example
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/quiz">
                      <ClipboardList className="mr-1.5 h-4 w-4" /> Test Me
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Loader2,
  RefreshCw,
  Baby,
  Wand2,
  ClipboardList,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { LessonView } from "@/components/LessonView";
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
import { applyTutorAction, generateLesson, type Lesson, type TutorAction } from "@/lib/lesson-engine";
import { SUBJECTS } from "@/lib/mock-data";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearnPage,
});

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"] as const;

const ACTIONS: { key: TutorAction; label: string; note: string; icon: typeof RefreshCw }[] = [
  { key: "explain-again", label: "Explain Again", note: "Explaining it another way", icon: RefreshCw },
  { key: "simpler", label: "Make It Easier", note: "Made simpler", icon: Baby },
  { key: "example", label: "Give Me an Example", note: "New example added", icon: Wand2 },
];

function LearnPage() {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("Biology");
  const [difficulty, setDifficulty] = useState<string>("Intermediate");
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [exampleRound, setExampleRound] = useState(0);

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("Please enter a topic first — for example “Photosynthesis” or “Quadratic Equations”.");
      return;
    }
    setError("");
    setNote("");
    setLoading(true);
    try {
      const next = await generateLesson({ topic, subject, difficulty });
      setLesson(next);
      setExampleRound(0);
    } catch {
      setError("Something went wrong preparing your lesson. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(action: TutorAction, label: string) {
    if (!lesson) return;
    setNote(label);
    setLoading(true);
    try {
      const next = await applyTutorAction(lesson, action, exampleRound);
      setLesson(next);
      if (action === "example") setExampleRound((r) => r + 1);
      if (action === "simpler") setDifficulty(next.difficulty);
    } finally {
      setLoading(false);
    }
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
                maxLength={120}
                aria-invalid={Boolean(error)}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (error) setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleGenerate();
                }}
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
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button className="w-full" size="lg" onClick={() => void handleGenerate()} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing your lesson…
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Lesson
                </>
              )}
            </Button>
          </div>

          <div className="mt-6 border-t pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Suggested for you
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Photosynthesis", "Quadratic Equations", "Mole Concept", "Electric Circuits"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTopic(t);
                    setError("");
                  }}
                  className="rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              <div className="rounded-2xl border bg-card p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {note ? `${note}…` : `Preparing your lesson on ${topic}…`}
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

          {!loading && !lesson ? (
            <div className="grid place-items-center rounded-2xl border border-dashed bg-card p-12 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Sparkles className="h-6 w-6" />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">No lesson yet</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Enter a topic on the left and press Generate Lesson. Your lesson will appear here with
                explanations, examples and a quick summary.
              </p>
            </div>
          ) : null}

          {!loading && lesson ? (
            <>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-hero-gradient p-5 text-primary-foreground shadow-lift">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                    {lesson.subject} · {lesson.difficulty}
                  </p>
                  <h2 className="truncate font-display text-2xl font-bold">{lesson.topic}</h2>
                  {note ? (
                    <p className="mt-1 text-xs text-primary-foreground/80">Adjusted: {note}</p>
                  ) : null}
                </div>
                <Button asChild variant="secondary" size="sm" className="shrink-0 font-semibold">
                  <Link to="/quiz" search={{ topic: lesson.topic, subject: lesson.subject, difficulty: lesson.difficulty }}>
                    <ClipboardList className="mr-1.5 h-4 w-4" /> Test me
                  </Link>
                </Button>
              </div>

              <LessonView lesson={lesson} />

              <div className="sticky bottom-20 rounded-2xl border bg-card/95 p-3 shadow-lift backdrop-blur lg:bottom-4">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ACTIONS.map((a) => (
                    <Button
                      key={a.key}
                      variant="outline"
                      size="sm"
                      onClick={() => void handleAction(a.key, a.note)}
                    >
                      <a.icon className="mr-1.5 h-4 w-4" /> {a.label}
                    </Button>
                  ))}
                  <Button asChild size="sm">
                    <Link to="/quiz" search={{ topic: lesson.topic, subject: lesson.subject, difficulty: lesson.difficulty }}>
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

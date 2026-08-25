import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Target,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Eye,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { decodeAnswers, generateQuiz, markQuiz } from "@/lib/quiz-engine";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  topic: fallback(z.string(), "Photosynthesis").default("Photosynthesis"),
  subject: fallback(z.string(), "Biology").default("Biology"),
  difficulty: fallback(z.string(), "Intermediate").default("Intermediate"),
  answers: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/quiz-results")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Quiz Results — StudySmart AI" },
      {
        name: "description",
        content:
          "See your score, correct and incorrect answers, strong and weak areas, AI feedback and recommended revision.",
      },
      { property: "og:title", content: "Quiz Results — StudySmart AI" },
      { property: "og:description", content: "Score breakdown, AI feedback and a revision plan for your weak areas." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { topic, subject, difficulty, answers: encoded } = Route.useSearch();
  const [review, setReview] = useState(false);

  const questions = useMemo(() => generateQuiz({ topic, subject, difficulty }), [topic, subject, difficulty]);
  const given = useMemo(() => decodeAnswers(questions, encoded), [questions, encoded]);
  const result = useMemo(
    () => markQuiz(questions, given, topic, subject, "Chiamaka"),
    [questions, given, topic, subject],
  );

  return (
    <AppShell title="Quiz Results" subtitle={`${subject} · ${topic} · ${result.total} questions`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-5">
          <div className="grid gap-4 rounded-2xl bg-hero-gradient p-6 text-primary-foreground shadow-lift sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-8 border-background/20">
              <div className="text-center">
                <p className="font-display text-3xl font-extrabold">{result.score}%</p>
                <p className="text-[10px] uppercase tracking-wide text-primary-foreground/80">Score</p>
              </div>
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-2xl font-bold">
                {result.score >= 70 ? "Good job, Chiamaka!" : "Keep going, Chiamaka!"}
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/85">
                You answered {result.correct} of {result.total} questions on {topic} correctly.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-background/12 p-3">
                  <p className="text-xs text-primary-foreground/75">Correct</p>
                  <p className="font-display text-lg font-bold">{result.correct}</p>
                </div>
                <div className="rounded-xl bg-background/12 p-3">
                  <p className="text-xs text-primary-foreground/75">Incorrect</p>
                  <p className="font-display text-lg font-bold">{result.incorrect}</p>
                </div>
                <div className="rounded-xl bg-background/12 p-3">
                  <p className="text-xs text-primary-foreground/75">Time</p>
                  <p className="font-display text-lg font-bold">7:42</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4.5 w-4.5 text-success" />
                <h3 className="font-display text-base font-semibold">Strong areas</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {result.strong.map((s) => (
                  <li
                    key={s}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl bg-success-soft px-3 py-2 text-sm font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-warning" />
                <h3 className="font-display text-base font-semibold">Weak areas</h3>
              </div>
              <ul className="mt-3 space-y-2">
                {result.weak.map((s) => (
                  <li
                    key={s}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl bg-warning-soft px-3 py-2 text-sm font-medium"
                  >
                    <Target className="h-4 w-4 shrink-0 text-warning" />
                    <span className="truncate">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-primary" />
              <h3 className="font-display text-lg font-semibold">AI feedback</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed">{result.feedback}</p>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h3 className="truncate font-display text-lg font-semibold">Review answers</h3>
              <Button size="sm" variant="outline" onClick={() => setReview((v) => !v)}>
                <Eye className="mr-1.5 h-4 w-4" /> {review ? "Hide" : "Show"}
              </Button>
            </div>
            {review ? (
              <ul className="mt-4 space-y-3">
                {questions.map((q, i) => {
                  const wrong = given[q.id] !== q.answer;
                  return (
                    <li key={q.id} className="rounded-xl border p-4">
                      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                        {wrong ? (
                          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                        ) : (
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">
                            {i + 1}. {q.question}
                          </p>
                          {wrong ? (
                            <p className="mt-2 text-sm text-muted-foreground">
                              Your answer:{" "}
                              {given[q.id] === undefined ? "Not answered" : q.options[given[q.id]!]}
                            </p>
                          ) : null}
                          <p className={cn("mt-1 text-sm", wrong ? "text-destructive" : "text-success")}>
                            Correct answer: {q.options[q.answer]}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">{q.explanation}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Open the review to see every question with the correct answer and an explanation.
              </p>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <h3 className="font-display text-base font-semibold">Recommended revision</h3>
            <ul className="mt-3 space-y-3">
              {result.revision.map((r) => (
                <li key={r.title} className="rounded-xl border p-3">
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {r.minutes} min · {r.subject}
                  </p>
                  <Progress value={0} className="mt-2 h-1.5" />
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-2">
            <Button asChild size="lg">
              <Link to="/learn">
                <BookOpen className="mr-1.5 h-4 w-4" /> Study Weak Topic
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/quiz" search={{ topic, subject }}>
                <RotateCcw className="mr-1.5 h-4 w-4" /> Try Again
              </Link>
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setReview(true)}>
              <Eye className="mr-1.5 h-4 w-4" /> Review Answers
            </Button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

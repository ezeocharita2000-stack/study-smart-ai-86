import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Flag, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Practice Quiz — StudySmart AI" },
      {
        name: "description",
        content: "Practise with multiple-choice questions generated from the topic you just studied.",
      },
      { property: "og:title", content: "Practice Quiz — StudySmart AI" },
      { property: "og:description", content: "Multiple-choice practice with instant marking and explanations." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);

  const q = quizQuestions[index];
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / quizQuestions.length) * 100);

  function submit() {
    setSubmitting(true);
    setTimeout(() => navigate({ to: "/quiz-results" }), 900);
  }

  return (
    <AppShell title="Photosynthesis Quiz" subtitle="Biology · SS2 · 8 questions">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div className="rounded-2xl border bg-card p-5 shadow-card sm:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <p className="truncate text-sm font-semibold text-muted-foreground">
              Question {index + 1} of {quizQuestions.length}
            </p>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1 text-xs font-semibold text-warning">
              <Clock className="h-3.5 w-3.5" /> 07:42
            </span>
          </div>
          <Progress value={progress} className="mt-3 h-2" />

          <h2 className="mt-6 font-display text-xl font-semibold leading-snug sm:text-2xl">
            {q.question}
          </h2>

          <div className="mt-5 space-y-3">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers({ ...answers, [q.id]: i })}
                  className={cn(
                    "grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border p-4 text-left transition-all",
                    selected
                      ? "border-primary bg-primary-soft shadow-card"
                      : "hover:border-primary/40 hover:bg-muted",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold",
                      selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 text-sm font-medium sm:text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:items-center sm:justify-between">
            <Button
              variant="outline"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
            {index === quizQuestions.length - 1 ? (
              <Button onClick={submit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Marking…
                  </>
                ) : (
                  <>
                    <Flag className="mr-1.5 h-4 w-4" /> Submit Quiz
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={() => setIndex((i) => Math.min(quizQuestions.length - 1, i + 1))}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground sm:text-left">
            {answered} of {quizQuestions.length} answered. You can go back and change any answer before
            submitting.
          </p>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <p className="font-display text-sm font-semibold">Question navigator</p>
            <div className="mt-3 grid grid-cols-6 gap-2 lg:grid-cols-4">
              {quizQuestions.map((qq, i) => {
                const done = answers[qq.id] !== undefined;
                return (
                  <button
                    key={qq.id}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "aspect-square rounded-lg border text-sm font-semibold transition-colors",
                      i === index
                        ? "border-primary bg-primary text-primary-foreground"
                        : done
                          ? "border-success bg-success-soft text-success"
                          : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <Button className="mt-4 w-full" variant="outline" onClick={submit} disabled={submitting}>
              Submit Quiz
            </Button>
          </div>
          <div className="rounded-2xl bg-soft-gradient p-5">
            <p className="font-display text-sm font-semibold">Need a refresher?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Re-read the Photosynthesis lesson before you submit.
            </p>
            <Button asChild size="sm" variant="secondary" className="mt-3 w-full">
              <Link to="/learn">Open lesson</Link>
            </Button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

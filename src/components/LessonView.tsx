import {
  Lightbulb,
  ListChecks,
  BookMarked,
  FlaskConical,
  AlertTriangle,
  Star,
  FileText,
} from "lucide-react";
import type { Lesson } from "@/lib/lesson-engine";
import { cn } from "@/lib/utils";

export function LessonBlock({
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

export function LessonView({ lesson }: { lesson: Lesson }) {
  return (
    <>
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
    </>
  );
}

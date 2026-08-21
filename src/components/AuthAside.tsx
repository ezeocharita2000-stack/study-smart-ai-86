import { BookOpen, ClipboardList, Target, CalendarCheck } from "lucide-react";

const points = [
  { icon: BookOpen, title: "Clear AI explanations", body: "Any topic, pitched at your class level." },
  { icon: ClipboardList, title: "Instant quizzes", body: "Practise the topic you just studied." },
  { icon: Target, title: "Weak-area analysis", body: "Know exactly what to fix before the test." },
  { icon: CalendarCheck, title: "Personal study plan", body: "A realistic timetable around school." },
];

export function AuthAside() {
  return (
    <div className="hidden bg-hero-gradient p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-center">
      <h2 className="max-w-md font-display text-4xl font-extrabold leading-tight">
        Study Smarter. Understand Better. Achieve More.
      </h2>
      <p className="mt-4 max-w-md text-primary-foreground/85">
        Join over 12,400 secondary-school students using StudySmart AI to master their syllabus one
        topic at a time.
      </p>
      <div className="mt-10 grid max-w-md gap-3">
        {points.map((p) => (
          <div key={p.title} className="flex items-start gap-3 rounded-2xl bg-background/10 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background/15">
              <p.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold">{p.title}</p>
              <p className="text-sm text-primary-foreground/80">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Brain,
  ClipboardList,
  Target,
  CalendarCheck,
  TrendingUp,
  ShieldCheck,
  Wifi,
  Menu,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudySmart AI — Study Smarter, Understand Better" },
      {
        name: "description",
        content:
          "StudySmart AI helps Nigerian secondary-school students learn any topic with AI explanations, practice quizzes, weak-area analysis and personalised study plans.",
      },
      { property: "og:title", content: "StudySmart AI — Study Smarter, Understand Better" },
      {
        property: "og:description",
        content:
          "Learn any topic with clear AI explanations, practice quizzes and a personalised study plan built for JSS1–SS3 students.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: Sparkles,
    title: "Enter your topic",
    body: "Type any topic from your syllabus — Photosynthesis, Quadratic Equations, Balancing Chemical Equations — and pick your class and difficulty.",
  },
  {
    icon: Brain,
    title: "Learn with your AI tutor",
    body: "Get a simple explanation, key concepts, worked examples and the mistakes examiners punish most.",
  },
  {
    icon: ClipboardList,
    title: "Practise with a quiz",
    body: "Answer questions built from the exact topic you just studied, with instant marking and explanations.",
  },
  {
    icon: Target,
    title: "Fix your weak areas",
    body: "StudySmart AI spots what you keep missing and rebuilds your study plan around it.",
  },
];

const features = [
  {
    icon: Brain,
    title: "AI topic explanations",
    body: "Any topic explained three ways — beginner, intermediate or advanced — until it finally clicks.",
  },
  {
    icon: ClipboardList,
    title: "Auto-generated quizzes",
    body: "Fresh multiple-choice practice on demand, with explanations for every single answer.",
  },
  {
    icon: Target,
    title: "Weakness detection",
    body: "Your results are analysed topic by topic so you stop revising what you already know.",
  },
  {
    icon: CalendarCheck,
    title: "Personalised study plan",
    body: "A realistic daily timetable around school hours, exams and the subjects you actually offer.",
  },
  {
    icon: TrendingUp,
    title: "Progress tracking",
    body: "Scores, study time, streaks and subject mastery in one clear dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Syllabus aligned",
    body: "Content mapped to JSS1–SS3, WAEC and NECO subject requirements.",
  },
];

const faqs = [
  {
    q: "Which classes is StudySmart AI for?",
    a: "Every secondary-school level from JSS1 to SS3. You choose your class when you sign up and explanations are pitched at that level.",
  },
  {
    q: "Do I need data all the time?",
    a: "You need a connection to generate a new lesson or quiz, but lessons you have already opened stay saved to your account so you can revise them later.",
  },
  {
    q: "Can it help me prepare for WAEC and NECO?",
    a: "Yes. Quizzes follow the objective format used in national exams, and your study plan can be set to count down to your exam date.",
  },
  {
    q: "Is it free?",
    a: "There is a free plan with five AI lessons a day. Upgrading removes the limit and unlocks full past-question practice.",
  },
  {
    q: "Will it just give me answers?",
    a: "No. StudySmart AI explains the reasoning first, then tests you. The goal is understanding, not copying.",
  },
];

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "#how", label: "How it works" },
    { href: "#features", label: "Features" },
    { href: "#why", label: "Why StudySmart" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="ghost">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t bg-background px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button asChild variant="outline">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Built for JSS1 – SS3 students
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
              Study Smarter. Understand Better. Achieve More.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              Enter any topic or paste your study material and StudySmart AI explains it in plain
              language, sets a quiz to test you, shows exactly where you are weak, and builds a study
              plan that fixes it — subject by subject, week by week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/signup">
                  Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-background/15 hover:text-primary-foreground"
              >
                <Link to="/learn">Try a Topic</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["12,400+", "Students learning"],
                ["30+", "Subjects covered"],
                ["21%", "Average score lift"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold">{v}</dt>
                  <dd className="text-xs text-primary-foreground/75">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-3xl bg-background/10 p-3 shadow-lift ring-1 ring-primary-foreground/20">
            <div className="rounded-2xl bg-card p-5 text-card-foreground">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Biology · SS2 · Intermediate
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">Photosynthesis</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Photosynthesis is how green plants cook their own food. The leaf traps sunlight with
                chlorophyll, takes in carbon dioxide through the stomata and water from the roots, then
                turns them into glucose and oxygen.
              </p>
              <div className="mt-4 rounded-xl bg-success-soft p-3">
                <p className="text-xs font-semibold text-success">Remember this</p>
                <p className="mt-1 text-sm text-foreground">
                  CO₂ + H₂O → (light, chlorophyll) → Glucose + O₂
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border p-3">
                  <p className="text-xs text-muted-foreground">Quiz score</p>
                  <p className="font-display text-lg font-bold text-success">86%</p>
                </div>
                <div className="rounded-xl border p-3">
                  <p className="text-xs text-muted-foreground">Weak area</p>
                  <p className="text-sm font-semibold text-warning">Limiting factors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Four steps from confused to confident
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border bg-card p-5 shadow-card transition-transform hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-bold text-accent">STEP {i + 1}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-soft-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">Features</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Everything you need in one study platform
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-5 shadow-card">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Why StudySmart AI
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              A private tutor that knows your syllabus and your weak spots
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Extra lessons are expensive and a crowded classroom cannot slow down for one student.
              StudySmart AI gives every student a patient tutor that re-explains a topic as many times
              as needed, then proves the understanding with practice.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Aligned to WAEC & NECO", ShieldCheck],
                ["Light on data usage", Wifi],
                ["Tracks every topic", TrendingUp],
                ["Plans your week for you", CalendarCheck],
              ].map(([label, Icon]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-xl border bg-card p-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-success-soft text-success">
                      <I className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 text-sm font-medium">{label as string}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <p className="font-display text-lg font-semibold">What students say</p>
            <blockquote className="mt-4 rounded-2xl bg-muted p-4 text-sm leading-relaxed">
              “I used to cram Chemistry without understanding. The mole concept lesson broke it into
              steps and my last test went from 48 to 79.”
              <footer className="mt-3 text-xs font-semibold text-muted-foreground">
                — Tunde A., SS2, Ibadan
              </footer>
            </blockquote>
            <blockquote className="mt-3 rounded-2xl bg-muted p-4 text-sm leading-relaxed">
              “The study plan is the part I love. It tells me exactly what to revise after school
              instead of me guessing.”
              <footer className="mt-3 text-xs font-semibold text-muted-foreground">
                — Amara O., JSS3, Enugu
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-display text-base font-semibold">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-hero-gradient px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Your next test starts with one topic
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Create a free account and study your first topic in under two minutes.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/signup">Start Learning</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent font-semibold text-primary-foreground hover:bg-background/15 hover:text-primary-foreground"
            >
              <Link to="/learn">Try a Topic</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              An AI study companion for Nigerian secondary-school students. Learn any topic, test
              yourself, and always know what to revise next.
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/learn" className="hover:text-foreground">
                  AI Tutor
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-foreground">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link to="/study-plan" className="hover:text-foreground">
                  Study Plan
                </Link>
              </li>
              <li>
                <Link to="/progress" className="hover:text-foreground">
                  Progress
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/login" className="hover:text-foreground">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-foreground">
                  Create account
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground">
                  Help & FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          © 2026 StudySmart AI. Built for students, by students.
        </div>
      </footer>
    </div>
  );
}

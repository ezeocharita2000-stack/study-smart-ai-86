import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Save, LogOut, Trash2, Loader2, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { student, CLASS_LEVELS, SUBJECTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & Settings — StudySmart AI" },
      {
        name: "description",
        content: "Manage your student details, class, subjects, study preferences and account settings.",
      },
      { property: "og:title", content: "Profile & Settings — StudySmart AI" },
      { property: "og:description", content: "Update your class, subjects and how the AI explains topics." },
    ],
  }),
  component: ProfilePage,
});

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-card">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ProfilePage() {
  const [level, setLevel] = useState(student.level);
  const [subjects, setSubjects] = useState<string[]>(student.subjects);
  const [difficulty, setDifficulty] = useState(student.preferences.difficulty);
  const [goal, setGoal] = useState([student.preferences.dailyGoalMinutes]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function save() {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 900);
  }

  const toggle = (s: string) =>
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <AppShell
      title="Profile & Settings"
      subtitle="Keep your details up to date so lessons match your syllabus"
      action={
        <Button onClick={save} disabled={saving} className="hidden sm:inline-flex">
          {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
          Save
        </Button>
      }
    >
      {saved ? (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-success-soft px-4 py-3 text-sm font-medium text-success">
          <Check className="h-4 w-4" /> Your changes have been saved.
        </div>
      ) : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-5">
          <Card title="Student information">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full name</Label>
                <Input id="fullname" defaultValue={student.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mail">Email address</Label>
                <Input id="mail" type="email" defaultValue={student.email} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="school">School</Label>
                <Input id="school" defaultValue={student.school} />
              </div>
            </div>
          </Card>

          <Card title="Class / Level" description="Explanations and quizzes are pitched at this level.">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {CLASS_LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "rounded-xl border py-2.5 text-sm font-semibold transition-colors",
                    level === l ? "border-primary bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </Card>

          <Card title="Subjects" description="Only these subjects appear in your dashboard and study plan.">
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => {
                const active = subjects.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggle(s)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary-soft font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {active ? <Check className="h-3.5 w-3.5" /> : null}
                    {s}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card title="Study preferences">
            <div className="space-y-6">
              <div>
                <Label>Explanation difficulty</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm font-semibold transition-colors",
                        difficulty === d
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Beginner uses everyday language and more analogies. Advanced adds exam-level detail.
                </p>
              </div>

              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <Label>Daily study goal</Label>
                  <span className="text-sm font-semibold text-primary">{goal[0]} minutes</span>
                </div>
                <Slider className="mt-3" min={15} max={180} step={15} value={goal} onValueChange={setGoal} />
              </div>

              <div className="space-y-3">
                {[
                  ["Daily study reminders", "A nudge at 4:00 PM when a session is due."],
                  ["Weekly progress report", "A summary of scores and weak areas every Sunday."],
                  ["Quiz after every lesson", "Automatically suggest a quiz when a lesson ends."],
                ].map(([label, desc], i) => (
                  <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <Switch defaultChecked={i !== 2} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Account settings">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="pw">New password</Label>
                <Input id="pw" type="password" placeholder="At least 6 characters" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw2">Confirm password</Label>
                <Input id="pw2" type="password" placeholder="Repeat new password" />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" asChild>
                <Link to="/login">
                  <LogOut className="mr-1.5 h-4 w-4" /> Log out
                </Link>
              </Button>
              <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="mr-1.5 h-4 w-4" /> Delete account
              </Button>
            </div>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-2xl border bg-card p-5 text-center shadow-card">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-2xl font-bold text-primary-foreground">
              {student.initials}
            </div>
            <p className="mt-3 font-display text-lg font-semibold">{student.name}</p>
            <p className="text-sm text-muted-foreground">
              {level} · {student.school}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-muted p-2">
                <p className="font-display text-base font-bold">47</p>
                <p className="text-[10px] text-muted-foreground">Topics</p>
              </div>
              <div className="rounded-xl bg-muted p-2">
                <p className="font-display text-base font-bold">78%</p>
                <p className="text-[10px] text-muted-foreground">Average</p>
              </div>
              <div className="rounded-xl bg-muted p-2">
                <p className="font-display text-base font-bold">12</p>
                <p className="text-[10px] text-muted-foreground">Streak</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-soft-gradient p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-primary" />
              <p className="font-display text-sm font-semibold">Free plan</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              5 AI lessons a day. Upgrade for unlimited lessons and full past-question practice.
            </p>
            <Button size="sm" className="mt-3 w-full">
              Upgrade plan
            </Button>
          </div>

          <Button onClick={save} disabled={saving} className="w-full sm:hidden" size="lg">
            {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Save className="mr-1.5 h-4 w-4" />}
            Save changes
          </Button>
        </aside>
      </div>
    </AppShell>
  );
}

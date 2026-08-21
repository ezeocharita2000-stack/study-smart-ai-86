import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { Logo } from "@/components/Logo";
import { AuthAside } from "@/components/AuthAside";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CLASS_LEVELS, SUBJECTS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your free account — StudySmart AI" },
      {
        name: "description",
        content:
          "Sign up for StudySmart AI: choose your class from JSS1 to SS3, pick your subjects and start learning with an AI tutor.",
      },
      { property: "og:title", content: "Create your free account — StudySmart AI" },
      {
        property: "og:description",
        content: "Pick your class and subjects and start studying with an AI tutor today.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", level: "SS2" });
  const [subjects, setSubjects] = useState<string[]>(["Mathematics", "Biology"]);

  const toggle = (s: string) =>
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || form.password.length < 6) {
      setError("Fill in your name, email and a password of at least 6 characters.");
      return;
    }
    if (subjects.length === 0) {
      setError("Select at least one subject you offer.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1000);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto w-full max-w-md flex-1 py-10">
          <h1 className="font-display text-3xl font-bold">Create your free account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tell us your class and subjects so lessons match your syllabus.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Chiamaka Ezeocha"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 6 characters"
              />
            </div>

            <div className="space-y-2">
              <Label>Class / Level</Label>
              <div className="grid grid-cols-3 gap-2">
                {CLASS_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setForm({ ...form, level: lvl })}
                    className={cn(
                      "rounded-xl border py-2.5 text-sm font-semibold transition-colors",
                      form.level === lvl
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted",
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subjects you offer</Label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => {
                  const active = subjects.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "border-primary bg-primary-soft font-semibold text-primary"
                          : "bg-card text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {active ? <Check className="h-3.5 w-3.5" /> : null}
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {error ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By signing up you agree to our Terms of Use and Privacy Policy.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <AuthAside />
    </div>
  );
}

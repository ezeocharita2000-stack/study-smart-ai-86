import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthAside } from "@/components/AuthAside";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — StudySmart AI" },
      { name: "description", content: "Log in to StudySmart AI to continue your lessons, quizzes and study plan." },
      { property: "og:title", content: "Log in — StudySmart AI" },
      { property: "og:description", content: "Continue your lessons, quizzes and personalised study plan." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("chiamaka.e@student.ng");
  const [password, setPassword] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || password.length < 4) {
      setError("Enter your email and a password of at least 4 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 900);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-5 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to pick up your Photosynthesis lesson where you stopped.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {error ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            ) : null}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox defaultChecked /> Remember me
              </label>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in…
                </>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to StudySmart AI?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </p>
          <div className="mt-6 flex items-start gap-2 rounded-xl bg-secondary p-3 text-xs text-secondary-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
            Demo mode: any email and password takes you into the dashboard.
          </div>
        </div>
      </div>
      <AuthAside />
    </div>
  );
}

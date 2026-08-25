/**
 * Temporary quiz result storage.
 *
 * Backed by localStorage for now — swap the three functions below for real
 * database calls later and nothing else in the UI changes.
 */

export type PerformanceCategory = "Strong" | "Improving" | "Needs Revision";

export type StoredQuizResult = {
  id: string;
  topic: string;
  subject: string;
  difficulty: string;
  score: number;
  correct: number;
  incorrect: number;
  total: number;
  category: PerformanceCategory;
  weak: string[];
  takenAt: string;
};

const KEY = "studysmart.quiz-results";
const MAX = 50;

export function categorise(score: number): PerformanceCategory {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Improving";
  return "Needs Revision";
}

export function getQuizResults(): StoredQuizResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as StoredQuizResult[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveQuizResult(result: Omit<StoredQuizResult, "id" | "takenAt">): StoredQuizResult {
  const entry: StoredQuizResult = {
    ...result,
    id: `${result.topic}-${Date.now()}`,
    takenAt: new Date().toISOString(),
  };
  if (typeof window === "undefined") return entry;
  try {
    const next = [entry, ...getQuizResults()].slice(0, MAX);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — result stays in page state only */
  }
  return entry;
}

export function clearQuizResults() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

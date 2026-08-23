/**
 * Mock lesson engine.
 *
 * This module is the ONLY place that knows how a lesson is produced.
 * When a real AI API is added later, replace `generateLesson` with an async
 * call to the API and keep the `Lesson` shape — nothing in the UI changes.
 */

import { lesson as photosynthesisLesson } from "@/lib/mock-data";

export type LessonTerm = { term: string; meaning: string };

export type Lesson = {
  topic: string;
  subject: string;
  difficulty: string;
  simpleExplanation: string;
  keyConcepts: string[];
  terms: LessonTerm[];
  examples: string[];
  mistakes: string[];
  remember: string;
  summary: string;
};

export type LessonRequest = {
  topic: string;
  subject: string;
  difficulty: string;
};

export type TutorAction = "explain-again" | "simpler" | "example";

/** Curated sample lessons keyed by a normalised topic name. */
const LIBRARY: Record<string, Omit<Lesson, "topic" | "subject" | "difficulty">> = {
  photosynthesis: {
    simpleExplanation: photosynthesisLesson.simpleExplanation,
    keyConcepts: photosynthesisLesson.keyConcepts,
    terms: photosynthesisLesson.terms,
    examples: photosynthesisLesson.examples,
    mistakes: photosynthesisLesson.mistakes,
    remember: photosynthesisLesson.remember,
    summary: photosynthesisLesson.summary,
  },
  "quadratic equations": {
    simpleExplanation:
      "A quadratic equation is any equation you can write as ax² + bx + c = 0, where a is not zero. The x² term makes the graph a curve (a parabola) instead of a straight line, so there can be two answers, one repeated answer, or no real answer at all. Solving it means finding the x-values where that curve crosses the x-axis.",
    keyConcepts: [
      "Standard form: ax² + bx + c = 0 with a ≠ 0",
      "Three main methods: factorisation, completing the square, and the quadratic formula",
      "Quadratic formula: x = (−b ± √(b² − 4ac)) / 2a",
      "The discriminant b² − 4ac tells you how many real roots exist",
      "Sum of roots = −b/a and product of roots = c/a",
    ],
    terms: [
      { term: "Root", meaning: "A value of x that makes the equation equal to zero." },
      { term: "Discriminant", meaning: "The value b² − 4ac, which decides the nature of the roots." },
      { term: "Parabola", meaning: "The U-shaped curve you get when you plot a quadratic." },
      { term: "Factorisation", meaning: "Rewriting the quadratic as a product of two brackets." },
    ],
    examples: [
      "x² − 5x + 6 = 0 factorises to (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
      "For 2x² + 3x − 2 = 0 the formula gives x = 0.5 or x = −2.",
      "x² + 4x + 5 = 0 has discriminant 16 − 20 = −4, so there are no real roots.",
    ],
    mistakes: [
      "Forgetting to move everything to one side before solving, so the equation is not equal to zero.",
      "Dropping the ± sign in the quadratic formula and giving only one root.",
      "Dividing by x — that quietly throws away the root x = 0.",
      "Sign slips with −b when b is already negative.",
    ],
    remember: "Set it to zero, then factorise. If it will not factorise neatly, reach for x = (−b ± √(b² − 4ac)) / 2a.",
    summary:
      "Quadratics have the form ax² + bx + c = 0 and are solved by factorising, completing the square, or the formula. The discriminant tells you whether there are two, one, or no real roots.",
  },
};

function titleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Fallback lesson generator for any topic that is not in the curated library. */
function buildGenericLesson(req: LessonRequest): Omit<Lesson, "topic" | "subject" | "difficulty"> {
  const t = titleCase(req.topic);
  const s = req.subject;
  return {
    simpleExplanation: `${t} is one of the core ideas you meet in ${s}. Start by asking three questions: what is it, why does it happen, and where do you see it in real life? In simple words, ${t.toLowerCase()} describes a pattern that repeats in a predictable way, so once you understand the pattern you can apply it to new questions instead of memorising answers. Read the definition slowly, then say it back in your own words before moving on.`,
    keyConcepts: [
      `The core definition of ${t} and the exact words examiners expect`,
      `The conditions or inputs that ${t.toLowerCase()} depends on`,
      `The step-by-step process, in the right order`,
      `How ${t} connects to the other topics in ${s}`,
      `The typical ${req.difficulty.toLowerCase()}-level question style on this topic`,
    ],
    terms: [
      { term: t, meaning: `The main idea of this lesson — be able to define it in one clean sentence.` },
      { term: "Process", meaning: `The ordered steps that ${t.toLowerCase()} follows from start to finish.` },
      { term: "Application", meaning: `A real situation where ${t.toLowerCase()} is used or observed.` },
      { term: "Exception", meaning: `The special case where the usual rule for ${t.toLowerCase()} does not hold.` },
    ],
    examples: [
      `Classroom example: your teacher demonstrates ${t.toLowerCase()} and asks you to predict the result before it happens.`,
      `Exam-style example: a question gives you data and asks you to explain it using ${t.toLowerCase()}.`,
      `Everyday example: you can spot ${t.toLowerCase()} at work outside school once you know what to look for.`,
    ],
    mistakes: [
      `Mixing up ${t} with a similar-sounding topic in ${s}.`,
      "Writing a vague answer instead of using the exact keywords.",
      "Skipping the working and jumping straight to the final answer.",
      "Memorising the example instead of the underlying rule.",
    ],
    remember: `${t}: know the definition, know the steps, and know one solid example you can write from memory.`,
    summary: `This lesson covered what ${t} means in ${s}, the steps involved, worked examples and the mistakes that cost marks. Try a short quiz now to lock it in.`,
  };
}

/**
 * Produce a lesson for the request. Async so the call site already looks like
 * a real API call; the delay simulates generation latency.
 */
export async function generateLesson(req: LessonRequest, delayMs = 1100): Promise<Lesson> {
  const topic = req.topic.trim();
  if (!topic) throw new Error("Topic is required");

  await new Promise((r) => setTimeout(r, delayMs));

  const body = LIBRARY[topic.toLowerCase()] ?? buildGenericLesson({ ...req, topic });
  return { topic: titleCase(topic), subject: req.subject, difficulty: req.difficulty, ...body };
}

const EXTRA_EXAMPLES = [
  "Extra example: a past WAEC question on this topic asked students to explain the result of a simple experiment step by step.",
  "Extra example: try changing one condition and predicting what happens before you check the answer.",
  "Extra example: explain this topic out loud to a classmate — if they can repeat it back, you understand it.",
];

/**
 * Apply a tutor action to an existing lesson and return the adjusted lesson.
 * Mock behaviour today; a real API would re-prompt the model instead.
 */
export async function applyTutorAction(
  current: Lesson,
  action: TutorAction,
  round = 0,
  delayMs = 800,
): Promise<Lesson> {
  await new Promise((r) => setTimeout(r, delayMs));

  if (action === "explain-again") {
    return {
      ...current,
      simpleExplanation: `Let's go through ${current.topic} once more, differently. ${current.remember} Now the longer version: ${current.simpleExplanation}`,
    };
  }

  if (action === "simpler") {
    return {
      ...current,
      difficulty: current.difficulty === "Advanced" ? "Intermediate" : "Beginner",
      simpleExplanation: `In the simplest words: ${current.topic} is easier than it looks. ${current.simpleExplanation
        .split(". ")
        .slice(0, 2)
        .join(". ")}. That is really all the idea is — everything else is detail built on top of it.`,
      keyConcepts: current.keyConcepts.slice(0, 3),
    };
  }

  return {
    ...current,
    examples: [...current.examples, EXTRA_EXAMPLES[round % EXTRA_EXAMPLES.length] ?? EXTRA_EXAMPLES[0]!],
  };
}

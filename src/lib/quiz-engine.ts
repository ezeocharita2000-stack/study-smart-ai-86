/**
 * Mock quiz engine.
 *
 * The ONLY place that knows how quiz questions are produced. Swap
 * `generateQuizQuestions` for a real AI call later and the UI is unchanged.
 */

import { quizQuestions as photosynthesisQuestions } from "@/lib/mock-data";

export type QuizQuestion = {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type QuizResultSummary = {
  score: number;
  correct: number;
  incorrect: number;
  total: number;
  strong: string[];
  weak: string[];
  feedback: string;
  revision: { title: string; minutes: number; subject: string }[];
};

function titleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Curated question sets keyed by a normalised topic name. */
const LIBRARY: Record<string, QuizQuestion[]> = {
  photosynthesis: photosynthesisQuestions as QuizQuestion[],
  "quadratic equations": [
    {
      id: 1,
      topic: "Quadratic Equations",
      question: "Which of these is the standard form of a quadratic equation?",
      options: ["ax + b = 0", "ax² + bx + c = 0", "a/x + b = 0", "ax³ + bx = 0"],
      answer: 1,
      explanation: "A quadratic must have an x² term, written as ax² + bx + c = 0 with a ≠ 0.",
    },
    {
      id: 2,
      topic: "Quadratic Equations",
      question: "Solve x² − 5x + 6 = 0.",
      options: ["x = 1 or 6", "x = 2 or 3", "x = −2 or −3", "x = 5 or 6"],
      answer: 1,
      explanation: "It factorises to (x − 2)(x − 3) = 0, so x = 2 or x = 3.",
    },
    {
      id: 3,
      topic: "Quadratic Equations",
      question: "What is the discriminant of a quadratic?",
      options: ["b² − 4ac", "−b/2a", "4ac − b²", "b² + 4ac"],
      answer: 0,
      explanation: "b² − 4ac tells you whether there are two, one, or no real roots.",
    },
    {
      id: 4,
      topic: "Quadratic Equations",
      question: "If b² − 4ac < 0, the equation has:",
      options: ["Two real roots", "One repeated root", "No real roots", "Infinite roots"],
      answer: 2,
      explanation: "A negative discriminant means the parabola never crosses the x-axis.",
    },
    {
      id: 5,
      topic: "Quadratic Equations",
      question: "For ax² + bx + c = 0, the sum of the roots is:",
      options: ["c/a", "−b/a", "b/a", "−c/a"],
      answer: 1,
      explanation: "Sum of roots = −b/a and product of roots = c/a.",
    },
    {
      id: 6,
      topic: "Quadratic Equations",
      question: "The graph of a quadratic function is called a:",
      options: ["Hyperbola", "Straight line", "Parabola", "Circle"],
      answer: 2,
      explanation: "Quadratics always plot as a U-shaped (or inverted U) parabola.",
    },
    {
      id: 7,
      topic: "Quadratic Equations",
      question: "Which step must come first before factorising?",
      options: [
        "Divide every term by x",
        "Move all terms to one side so it equals zero",
        "Take the square root of both sides",
        "Replace x with zero",
      ],
      answer: 1,
      explanation: "The zero-product rule only works when one side of the equation is 0.",
    },
    {
      id: 8,
      topic: "Quadratic Equations",
      question: "The quadratic formula is:",
      options: [
        "x = (−b ± √(b² − 4ac)) / 2a",
        "x = (b ± √(b² + 4ac)) / 2a",
        "x = (−b ± √(4ac − b²)) / a",
        "x = −b / (2a + c)",
      ],
      answer: 0,
      explanation: "Keep the ± — dropping it loses one of the two roots.",
    },
  ],
};

/** Question templates used for any topic that is not in the curated library. */
function buildGenericQuestions(topic: string, subject: string): QuizQuestion[] {
  const t = titleCase(topic);
  const lower = t.toLowerCase();
  return [
    {
      id: 1,
      topic: t,
      question: `Which statement best defines ${lower}?`,
      options: [
        `A guess that cannot be tested in ${subject}`,
        `The accepted ${subject} definition of ${lower}, stated in one clear sentence`,
        `A word that only appears in ${subject} textbooks`,
        `An old idea that has been replaced`,
      ],
      answer: 1,
      explanation: `Start every answer on ${t} with the precise definition — examiners award the mark for the exact keywords.`,
    },
    {
      id: 2,
      topic: t,
      question: `In ${subject}, ${lower} is studied mainly because it:`,
      options: [
        "Explains and predicts what happens in related situations",
        "Is easy to memorise",
        "Only matters in the exam",
        "Has no link to other topics",
      ],
      answer: 0,
      explanation: `${t} is useful because the pattern it describes lets you predict new cases.`,
    },
    {
      id: 3,
      topic: `${t} — process`,
      question: `Which of these correctly describes the order of steps in ${lower}?`,
      options: [
        "The last step first, then the first step",
        "The steps in the order they actually happen, from start to finish",
        "Any order, the order does not matter",
        "Only the final result matters",
      ],
      answer: 1,
      explanation: "Marks are usually given per step, in sequence, so keep the order.",
    },
    {
      id: 4,
      topic: `${t} — process`,
      question: `What happens to the outcome of ${lower} if one of its required conditions is removed?`,
      options: [
        "Nothing changes",
        "It speeds up",
        "It slows down or stops",
        "It reverses completely",
      ],
      answer: 2,
      explanation: `Every required condition is limiting: remove it and ${lower} slows or stops.`,
    },
    {
      id: 5,
      topic: `${t} — terms`,
      question: `Which word is a key term you must be able to define when writing about ${lower}?`,
      options: ["Process", "Random", "Maybe", "Ordinary"],
      answer: 0,
      explanation: `The process — the ordered steps ${lower} follows — is core vocabulary for this topic.`,
    },
    {
      id: 6,
      topic: `${t} — terms`,
      question: `An "exception" in the context of ${lower} means:`,
      options: [
        "A mistake in the textbook",
        "The special case where the usual rule does not hold",
        "The same as the definition",
        "A question that cannot be answered",
      ],
      answer: 1,
      explanation: "Knowing the exception shows the examiner you understand the rule's limits.",
    },
    {
      id: 7,
      topic: `${t} — application`,
      question: `A question gives you data and asks you to explain it using ${lower}. The best approach is to:`,
      options: [
        "Copy the data into your answer",
        "State the rule, then link each piece of data to it",
        "Give the final answer only",
        "Describe an unrelated example",
      ],
      answer: 1,
      explanation: "Application marks come from linking the rule to the specific data given.",
    },
    {
      id: 8,
      topic: `${t} — application`,
      question: `Which is the most common mistake students make with ${lower}?`,
      options: [
        "Writing too much detail",
        "Memorising one example instead of the underlying rule",
        "Using a diagram",
        "Showing their working",
      ],
      answer: 1,
      explanation: `Memorising an example fails as soon as the question changes. Learn the rule behind ${lower}.`,
    },
  ];
}

/**
 * Produce a set of questions for a topic. Async so the call site already looks
 * like a real API call.
 */
export function generateQuizQuestions(topic: string, subject = "General"): QuizQuestion[] {
  const clean = topic.trim();
  if (!clean) return buildGenericQuestions("Your Topic", subject);
  return LIBRARY[clean.toLowerCase()] ?? buildGenericQuestions(clean, subject);
}

/** Mark a set of answers and build topic-aware feedback. */
export function markQuiz(
  questions: QuizQuestion[],
  answers: Record<number, number>,
  topic: string,
  subject: string,
  studentName = "there",
): QuizResultSummary {
  const total = questions.length;
  const correctQs = questions.filter((q) => answers[q.id] === q.answer);
  const wrongQs = questions.filter((q) => answers[q.id] !== q.answer);
  const correct = correctQs.length;
  const score = total ? Math.round((correct / total) * 100) : 0;

  const uniq = (list: QuizQuestion[]) => Array.from(new Set(list.map((q) => q.topic)));
  const strong = uniq(correctQs).slice(0, 3);
  const weak = uniq(wrongQs).slice(0, 3);
  const t = titleCase(topic);

  const feedback =
    wrongQs.length === 0
      ? `Excellent, ${studentName}. You answered every question on ${t} correctly, which shows you know both the definitions and how to apply them. Push yourself next with a harder ${subject} topic, or revisit ${t} in two weeks so it stays fresh.`
      : `Good effort, ${studentName}. You scored ${score}% on ${t}. You are solid on ${
          strong[0] ?? "the basics"
        }, but the questions you missed cluster around ${weak.join(", ")}. Re-read those parts of the lesson, then explain them out loud in your own words before trying the quiz again — that is the fastest way to turn a missed mark into a secure one.`;

  const revision =
    weak.length > 0
      ? weak.map((w, i) => ({ title: `Revise: ${w}`, minutes: 15 + i * 5, subject }))
      : [{ title: `Extend: harder ${t} questions`, minutes: 20, subject }];

  return {
    score,
    correct,
    incorrect: wrongQs.length,
    total,
    strong: strong.length ? strong : ["Keep practising"],
    weak: weak.length ? weak : ["No weak areas found"],
    feedback,
    revision: [...revision, { title: `Practice: 10 more ${t} questions`, minutes: 25, subject }],
  };
}

/** Encode/decode answers so they survive the jump to the results route. */
export function encodeAnswers(questions: QuizQuestion[], answers: Record<number, number>) {
  return questions.map((q) => (answers[q.id] === undefined ? "-" : String(answers[q.id]))).join(",");
}

export function decodeAnswers(questions: QuizQuestion[], encoded: string): Record<number, number> {
  const parts = encoded.split(",");
  const out: Record<number, number> = {};
  questions.forEach((q, i) => {
    const raw = parts[i];
    if (raw && raw !== "-") {
      const n = Number(raw);
      if (Number.isInteger(n)) out[q.id] = n;
    }
  });
  return out;
}

/**
 * Preferred entry point, mirroring the lesson-engine signature so it can be
 * swapped for a real AI quiz API later.
 */
export function generateQuiz({
  topic,
  subject = "General",
  difficulty = "Intermediate",
}: {
  topic: string;
  subject?: string;
  difficulty?: string;
}): QuizQuestion[] {
  void difficulty;
  return generateQuizQuestions(topic, subject);
}

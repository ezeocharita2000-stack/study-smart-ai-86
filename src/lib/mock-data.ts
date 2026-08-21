export const student = {
  name: "Chiamaka Ezeocha",
  firstName: "Chiamaka",
  email: "chiamaka.e@student.ng",
  level: "SS2",
  school: "Grace Height College, Lagos",
  initials: "CE",
  subjects: ["Mathematics", "Biology", "Chemistry", "Physics", "English"],
  preferences: {
    difficulty: "Intermediate",
    dailyGoalMinutes: 45,
    reminders: true,
    weeklyReport: true,
  },
};

export const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"];

export const SUBJECTS = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "English",
  "Geography",
  "Economics",
  "Government",
  "Agricultural Science",
  "Further Mathematics",
];

export const stats = {
  topicsStudied: 47,
  quizzesCompleted: 23,
  averageScore: 78,
  studyStreak: 12,
};

export const continueLearning = [
  {
    subject: "Biology",
    topic: "Photosynthesis",
    progress: 65,
    lastStudied: "Yesterday, 6:20 PM",
  },
  {
    subject: "Mathematics",
    topic: "Quadratic Equations",
    progress: 40,
    lastStudied: "2 days ago",
  },
  {
    subject: "Chemistry",
    topic: "Atomic Structure",
    progress: 85,
    lastStudied: "3 days ago",
  },
];

export const todayPlan = [
  {
    time: "4:00 PM",
    subject: "Biology",
    topic: "Photosynthesis — Light Reactions",
    duration: "30 min",
    done: true,
  },
  {
    time: "5:00 PM",
    subject: "Mathematics",
    topic: "Algebra — Simultaneous Equations",
    duration: "45 min",
    done: false,
  },
  {
    time: "6:15 PM",
    subject: "Chemistry",
    topic: "Atomic Structure — Electron Configuration",
    duration: "25 min",
    done: false,
  },
];

export const weakAreas = [
  { subject: "Mathematics", topic: "Simultaneous Equations", score: 42 },
  { subject: "Chemistry", topic: "Mole Concept", score: 51 },
  { subject: "Physics", topic: "Electric Circuits", score: 55 },
];

export const strongAreas = [
  { subject: "Biology", topic: "Cell Structure", score: 94 },
  { subject: "English", topic: "Comprehension", score: 89 },
  { subject: "Biology", topic: "Photosynthesis", score: 86 },
];

export const recentQuizzes = [
  { subject: "Biology", topic: "Photosynthesis", score: 86, total: 10, date: "Aug 20" },
  { subject: "Chemistry", topic: "Atomic Structure", score: 70, total: 10, date: "Aug 18" },
  { subject: "Mathematics", topic: "Simultaneous Equations", score: 42, total: 12, date: "Aug 17" },
  { subject: "English", topic: "Comprehension", score: 89, total: 15, date: "Aug 15" },
];

export const recentActivity = [
  { label: "Completed quiz on Photosynthesis", meta: "Scored 86% · 2 hours ago", kind: "quiz" },
  { label: "Studied Electron Configuration", meta: "25 minutes · Yesterday", kind: "learn" },
  { label: "Study streak reached 12 days", meta: "Yesterday", kind: "streak" },
  { label: "Added Further Mathematics to subjects", meta: "3 days ago", kind: "profile" },
];

export const quizQuestions = [
  {
    id: 1,
    topic: "Photosynthesis",
    question: "In which part of the plant cell does photosynthesis mainly take place?",
    options: ["Mitochondrion", "Chloroplast", "Ribosome", "Nucleus"],
    answer: 1,
    explanation:
      "Chloroplasts contain chlorophyll, the green pigment that traps light energy for photosynthesis.",
  },
  {
    id: 2,
    topic: "Photosynthesis",
    question: "Which gas is taken in by plants during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: 2,
    explanation:
      "Carbon dioxide enters through the stomata and is combined with water to form glucose.",
  },
  {
    id: 3,
    topic: "Photosynthesis",
    question: "The word equation for photosynthesis produces glucose and which other product?",
    options: ["Water", "Oxygen", "Carbon dioxide", "Starch"],
    answer: 1,
    explanation: "Oxygen is released as a by-product through the stomata.",
  },
  {
    id: 4,
    topic: "Photosynthesis",
    question: "Which of these is NOT a limiting factor of photosynthesis?",
    options: ["Light intensity", "Carbon dioxide concentration", "Temperature", "Soil colour"],
    answer: 3,
    explanation:
      "Soil colour has no direct effect. Light, CO₂ and temperature are the three classic limiting factors.",
  },
  {
    id: 5,
    topic: "Leaf structure",
    question: "Where does most photosynthesis occur in a leaf?",
    options: ["Upper epidermis", "Palisade mesophyll", "Xylem", "Lower epidermis"],
    answer: 1,
    explanation: "Palisade mesophyll cells are packed with chloroplasts and sit near the surface.",
  },
  {
    id: 6,
    topic: "Leaf structure",
    question: "What is the function of the stomata?",
    options: [
      "Transport water upward",
      "Allow gas exchange",
      "Store starch",
      "Protect against insects",
    ],
    answer: 1,
    explanation: "Stomata open and close to control the exchange of CO₂, O₂ and water vapour.",
  },
  {
    id: 7,
    topic: "Plant nutrition",
    question: "Glucose made in the leaf is usually stored as:",
    options: ["Protein", "Starch", "Lipid", "Cellulose"],
    answer: 1,
    explanation: "Starch is insoluble, so it does not affect the water balance of the cell.",
  },
  {
    id: 8,
    topic: "Plant nutrition",
    question: "A destarched leaf is used in experiments because it:",
    options: [
      "Contains extra chlorophyll",
      "Has no stored starch to confuse results",
      "Absorbs more light",
      "Loses less water",
    ],
    answer: 1,
    explanation: "Any starch found afterwards must have been made during the experiment.",
  },
];

export const studyPlan = [
  {
    date: "Mon, 24 Aug",
    tasks: [
      { time: "4:00 PM", subject: "Biology", topic: "Photosynthesis", duration: "30 min", status: "done" },
      { time: "5:00 PM", subject: "Mathematics", topic: "Algebra", duration: "45 min", status: "done" },
    ],
  },
  {
    date: "Tue, 25 Aug",
    tasks: [
      { time: "4:30 PM", subject: "Chemistry", topic: "Atomic Structure", duration: "40 min", status: "in-progress" },
      { time: "6:00 PM", subject: "English", topic: "Summary Writing", duration: "25 min", status: "todo" },
    ],
  },
  {
    date: "Wed, 26 Aug",
    tasks: [
      { time: "4:00 PM", subject: "Mathematics", topic: "Simultaneous Equations", duration: "50 min", status: "todo" },
      { time: "5:30 PM", subject: "Physics", topic: "Electric Circuits", duration: "35 min", status: "todo" },
    ],
  },
  {
    date: "Thu, 27 Aug",
    tasks: [
      { time: "4:15 PM", subject: "Biology", topic: "Transport in Plants", duration: "30 min", status: "todo" },
      { time: "6:00 PM", subject: "Chemistry", topic: "Mole Concept", duration: "45 min", status: "todo" },
    ],
  },
  {
    date: "Fri, 28 Aug",
    tasks: [
      { time: "4:00 PM", subject: "Mathematics", topic: "Revision Quiz", duration: "30 min", status: "todo" },
    ],
  },
];

export const weeklyScores = [
  { week: "Wk 1", score: 54, minutes: 120 },
  { week: "Wk 2", score: 61, minutes: 180 },
  { week: "Wk 3", score: 58, minutes: 150 },
  { week: "Wk 4", score: 70, minutes: 210 },
  { week: "Wk 5", score: 74, minutes: 240 },
  { week: "Wk 6", score: 78, minutes: 265 },
];

export const subjectMastery = [
  { subject: "Biology", mastery: 86 },
  { subject: "English", mastery: 81 },
  { subject: "Chemistry", mastery: 68 },
  { subject: "Physics", mastery: 59 },
  { subject: "Maths", mastery: 52 },
];

export const studyTimeSplit = [
  { name: "Biology", value: 32 },
  { name: "Mathematics", value: 26 },
  { name: "Chemistry", value: 20 },
  { name: "Physics", value: 12 },
  { name: "English", value: 10 },
];

export const lesson = {
  topic: "Photosynthesis",
  subject: "Biology",
  difficulty: "Intermediate",
  simpleExplanation:
    "Photosynthesis is how green plants cook their own food. The leaf collects sunlight with a green pigment called chlorophyll, pulls in carbon dioxide from the air through tiny holes called stomata, and draws up water from the soil through the roots. Using the energy from sunlight, the plant rearranges water and carbon dioxide into glucose (its food) and releases oxygen as a by-product. Think of the leaf as a small solar-powered kitchen.",
  keyConcepts: [
    "Word equation: carbon dioxide + water → (light energy, chlorophyll) → glucose + oxygen",
    "Chlorophyll inside chloroplasts traps light energy",
    "Light-dependent stage happens in the grana; light-independent stage in the stroma",
    "Limiting factors: light intensity, carbon dioxide concentration and temperature",
    "Glucose is converted to starch for storage because starch is insoluble",
  ],
  terms: [
    { term: "Chlorophyll", meaning: "Green pigment that absorbs light energy, mostly red and blue light." },
    { term: "Stomata", meaning: "Tiny pores on the leaf surface that let gases in and out." },
    { term: "Palisade mesophyll", meaning: "Column-shaped cells packed with chloroplasts near the leaf surface." },
    { term: "Limiting factor", meaning: "The factor in shortest supply that slows down the rate of a process." },
  ],
  examples: [
    "A potted plant kept in a dark cupboard for two days tests negative to iodine — no light means no starch is made.",
    "A farmer in Ogun State grows tomatoes inside a greenhouse and burns a paraffin lamp: the extra CO₂ and warmth raise the rate of photosynthesis.",
    "Pondweed in a beaker releases more bubbles of oxygen when the lamp is moved closer, showing light intensity as a limiting factor.",
  ],
  mistakes: [
    "Writing that plants take in oxygen and release carbon dioxide — that is respiration, not photosynthesis.",
    "Saying photosynthesis happens in the mitochondria instead of the chloroplast.",
    "Forgetting that plants respire day and night, even while photosynthesising.",
    "Leaving out 'light energy' and 'chlorophyll' above the arrow in the equation — examiners take marks for that.",
  ],
  remember: "Sunlight + CO₂ + Water → Glucose + Oxygen. Light is the fuel, chlorophyll is the cooker, glucose is the meal.",
  summary:
    "Photosynthesis converts light energy into chemical energy stored in glucose. It happens in chloroplasts, needs carbon dioxide and water, releases oxygen, and slows down when light, CO₂ or temperature is in short supply.",
};

export const quizResult = {
  score: 75,
  correct: 6,
  incorrect: 2,
  total: 8,
  timeTaken: "7 min 42 s",
  strong: ["Photosynthesis basics", "Leaf structure"],
  weak: ["Limiting factors", "Plant nutrition"],
  feedback:
    "Strong work, Chiamaka. You clearly understand where photosynthesis happens and the role of the chloroplast. The two questions you missed both involved limiting factors and starch storage — you are recognising definitions but not yet applying them to experiment scenarios. Spend the next session on practical experiments (destarched leaves, pondweed and light intensity) and try to explain each result in your own words before checking the answer.",
  revision: [
    { title: "Limiting factors of photosynthesis", minutes: 20, subject: "Biology" },
    { title: "Starch storage and testing for starch", minutes: 15, subject: "Biology" },
    { title: "Practice: 10 experiment-based questions", minutes: 25, subject: "Biology" },
  ],
};

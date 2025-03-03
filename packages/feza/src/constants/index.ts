export const DEFAULT_COLORS = [
  // Slate
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
  "#0f172a",
  "#020617",

  // Red
  "#fef2f2",
  "#fee2e2",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",
  "#450a0a",

  // Orange
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#c2410c",
  "#9a3412",
  "#7c2d12",
  "#431407",

  // Green
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e",
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",
  "#052e16",

  // Blue
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",
  "#172554",

  // Pink
  "#fce7f3",
  "#fbcfe8",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#9d174d",
  "#831843",
  "#500724",

  // Yellow
  "#fef9c3",
  "#fef08a",
  "#fde047",
  "#facc15",
  "#eab308",
  "#ca8a04",
  "#a16207",
  "#854d0e",
  "#713f12",
  "#422006",

  // Teal
  "#ccfbf1",
  "#99f6e4",
  "#5eead4",
  "#2dd4bf",
  "#14b8a6",
  "#0d9488",
  "#0f766e",
  "#115e59",
  "#134e4a",
  "#042f2e",

  // Rose
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
  "#fb7185",
  "#f43f5e",
  "#e11d48",
  "#be123c",
  "#9f1239",
  "#881337",
  "#4c0519",

  // Indigo
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  "#1e1b4b",
];

export const DEFAULT_CODE_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "html", label: "HTML/XML" },
  { value: "css", label: "CSS" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
  { value: "c", label: "C" },
  { value: "c++", label: "C++" },
  { value: "c#", label: "C#" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "lua", label: "Lua" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "perl", label: "Perl" },
  { value: "scala", label: "Scala" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "clojure", label: "Clojure" },
  { value: "json", label: "JSON" },
  { value: "sass", label: "SASS" },
  { value: "dart", label: "Dart" },
  { value: "brainfuck", label: "Brainfu*k" },
  { value: "markdown", label: "Markdown" },
  { value: "elixir", label: "Elixir" },
  { value: "gradle", label: "Gradle" },
];

export const DEFAULT_FONT_FAMILIES = [
  `"Arial"`,
  `"cursive"`,
  `"Comic Sans MS, Comic Sans"`,
  `"Exo 2"`,
  `"Inter"`,
  `"monospace"`,
  `"serif"`,
  `"Tahoma"`,
  `"Verdana"`,
];

/** Minimum image size in px */
export const IMAGE_MIN_SIZE = 40 as const;

/** Maximum image size in px */
export const IMAGE_MAX_SIZE = 1000 as const;

export const IMAGE_SIZE = {
  "size-small": 300,
  "size-medium": 640,
  "size-large": "100%",
};

export const VIDEO_SIZE = {
  "size-small": 300,
  "size-medium": 640,
  "size-large": "100%",
};

export const NODE_MENU_TYPE = {
  image: [
    "divider",
    "small",
    "medium",
    "large",
    "divider",
    "left",
    "center",
    "right",
    "divider",
    "remove",
  ],
  text: [
    "divider",
    "text-bubble",
    "divider",
    "bold",
    "italic",
    "underline",
    "strike",
    "code",
    "link",
    "divider",
    "color",
    "highlight",
    "textAlign",
  ],
  video: ["size-small", "size-medium", "size-large"],
};

export const BUBBLE_TEXT_LIST = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "link",
  "divider",
  "color",
  "highlight",
  "textAlign",
  "mathematics",
];

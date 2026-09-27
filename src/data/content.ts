export const profile = {
  name: "Purva Jagtap",
  role: "Full Stack Software Engineer",
  location: "Charlotte, NC",
  status: "Available for opportunities",
  tagline:
    "I ship production backend services, distributed data pipelines, and LLM-powered applications end to end.",
  email: "pjagtap1@uncc.edu",
  phone: "+1 (704) 248-1900",
  github: "https://github.com/purva115",
  linkedin: "https://www.linkedin.com/in/purva-jagtap-7646621b3/",
  resume: "/Purva_Jagtap_Resume.pdf",
};

export const about = [
  "Full stack software engineer with 3+ years shipping production backend services, distributed data pipelines, and LLM-powered applications across Python, Java, React/TypeScript, PostgreSQL, and AWS/Azure.",
  "Most recently I built AI governance and GenAI cost tooling at Auditrol. I'm finishing my M.S. in Computer Science at UNC Charlotte (Dec 2026).",
];

export const experience = [
  {
    role: "Full Stack Engineer",
    org: "Auditrol",
    place: "Charlotte, NC",
    date: "Feb 2026 — Sep 2026",
    points: [
      "Shipped the AI Governance lineage graph across FastAPI and React, so auditors can trace any finding to the model and prompt that produced it.",
      "Built GenAI Usage & Cost and NIST control-coverage backends joining live AWS Cost Explorer spend with per-model and per-use-case telemetry, with hermetic CI tests.",
      "Fixed contradictory control statuses across two screens by sourcing verdicts from the ml-service system of record over server-to-server HTTP.",
      "Cut peak memory on risk exports to one batch by streaming rows through an async generator with batched verdict lookups.",
      "Landed daily SAS Viya data quality snapshots from S3 into PostgreSQL via a four-stage Airflow pipeline, surfacing 453 breaches across 26 attributes with z-score and PSI drift detection.",
    ],
  },
  {
    role: "Graduate Teaching Assistant",
    org: "UNC Charlotte",
    place: "Charlotte, NC",
    date: "Aug 2025 — May 2026",
    points: [
      "Automated peer-review assignment and grading workflows in Python against the Canvas API for Software Engineering (ITCS 3155) and Physics labs serving 30 students.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Amdocs Ltd",
    place: "Pune, India",
    date: "Jul 2022 — Dec 2024",
    points: [
      "Cut deployment time 40% (10 hrs to 6 hrs) and mean incident resolution 60% (45 to 18 min) across 12 engineering teams with Java Spring Boot microservices and REST APIs.",
      "Delivered real-time deployment visibility to 5,000+ global users with the GenAI Deployment Tracker (Python, Azure, REST webhooks). AT&T Radiant Recognition Award.",
      "Remediated 400+ security vulnerabilities in a production infrastructure microservice; supported on-call triage and incident resolution.",
    ],
  },
];

export const projects = [
  {
    title: "PharmaLLM Medicine Prescriber Chatbot",
    body: "Fine-tuned TinyLlama-1.1B with LoRA and 4-bit quantization on 11,000 samples, reproducing published Springer research. Multimodal stack: Whisper speech-to-text, gTTS, Flask inference API, React frontend.",
    tags: ["Python", "PyTorch", "LoRA", "Flask", "React"],
    stat: "92%",
    statLabel: "F1 score",
    kind: "LLM Fine-tuning",
  },
  {
    title: "CareLess: AI Patient Advocate",
    body: "Agentic AI assistant for healthcare cost transparency, combining voice, blockchain payments, and financial APIs. Built in 24 hours. 3rd Place overall and Best Use of Solana at Pearl Hacks 2026.",
    tags: ["Gemini", "ElevenLabs", "Solana", "Capital One API"],
    stat: "3rd",
    statLabel: "Pearl Hacks 2026",
    kind: "Agentic AI",
  },
  {
    title: "Smart Attendance Monitoring System",
    body: "Computer vision attendance system with 90% face detection accuracy, deployed across 10+ institutes serving 100+ professors. 1st Prize, TECHCULT 2022.",
    tags: ["Python", "OpenCV", "MySQL"],
    stat: "10+",
    statLabel: "institutes",
    kind: "Computer Vision",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "Bash"],
  Backend: ["FastAPI", "Spring Boot", "REST APIs", "Microservices", "Webhooks", "Redis", "pytest"],
  Frontend: ["React", "Streamlit", "Flask", "HTML/CSS"],
  "Data & Cloud": ["PostgreSQL", "MySQL", "Airflow", "AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
  "AI / ML": ["LLMs", "RAG", "Agentic workflows", "LangChain", "PGVector", "PyTorch", "Hugging Face", "LoRA"],
};

export const education = [
  {
    degree: "M.S. Computer Science",
    school: "University of North Carolina at Charlotte",
    date: "Expected Dec 2026",
    grade: "GPA 3.88 / 4.0",
  },
  {
    degree: "B.E. (Honors) Computer Engineering, Data Science",
    school: "Savitribai Phule Pune University",
    date: "Apr 2022",
    grade: "GPA 8.74 / 10.0",
  },
];

export const awards = [
  {
    title: "AT&T Radiant Recognition",
    note: "For the GenAI Deployment Tracker used by 5,000+ engineers.",
  },
  {
    title: "3rd Place + Best Use of Solana",
    note: "Pearl Hacks 2026, for CareLess: AI Patient Advocate.",
  },
  {
    title: "1st Prize, TECHCULT 2022",
    note: "National level project competition, for Smart Attendance.",
  },
];

// "Nutrition facts" for the About label. Percentages are illustrative, not measured.
export const nutrition = {
  serving: "1 engineer",
  calories: { label: "Years shipping", value: 3, suffix: "+" },
  rows: [
    { label: "Backend (Python/Java)", value: 95 },
    { label: "Data pipelines", value: 90 },
    { label: "Cloud (AWS/Azure)", value: 88 },
    { label: "GenAI & LLMs", value: 86 },
    { label: "Frontend (React/TS)", value: 80 },
  ],
  facts: [
    { label: "Faster deployments", value: 40, suffix: "%" },
    { label: "Faster incident resolution", value: 60, suffix: "%" },
    { label: "Engineers served", value: 5000, suffix: "+" },
    { label: "Vulnerabilities fixed", value: 400, suffix: "+" },
  ],
  ingredients:
    "Python, Java, FastAPI, Spring Boot, React, PostgreSQL, Airflow, AWS, Azure, LLMs, curiosity.",
  warning: "May contain traces of coffee.",
};

// Each snack in the machine maps to one section of the page.
export const snacks = [
  { code: "A1", id: "about", label: "About", color: "#FF5A36" },
  { code: "A2", id: "experience", label: "Work", color: "#F2B705" },
  { code: "A3", id: "projects", label: "Projects", color: "#1FA67A" },
  { code: "B1", id: "skills", label: "Skills", color: "#3B6EF5" },
  { code: "B2", id: "education", label: "Awards", color: "#9B6BF2" },
  { code: "B3", id: "contact", label: "Contact", color: "#F25CA2" },
] as const;

export type Snack = (typeof snacks)[number];

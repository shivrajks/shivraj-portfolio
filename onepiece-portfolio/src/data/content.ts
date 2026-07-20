export const SITE = {
  title: "Shivraj Sonwane - Software Engineer",
  description:
    "Portfolio of Shivraj Sonwane, a Java-focused software engineer from Pune building Spring Boot backends, full-stack applications, SQL systems and software-testing workflows.",
  url: "https://shivraj-portfolio-nine.vercel.app/",
  email: "sonawaneshivrajk@gmail.com",
  location: "Pune, Maharashtra, India",
};

export const LINKS = {
  github: "https://github.com/shivrajks",
  linkedin: "https://www.linkedin.com/in/shivraj-sonawane-9437882aa/",
  resume: "/Resume.pdf",
};

export const NAV = [
  { label: "Crew", href: "#crew" },
  { label: "Adventures", href: "#adventures" },
  { label: "Devil Fruits", href: "#devils-fruit" },
  { label: "Voyage", href: "#voyage" },
  { label: "Join Crew", href: "#join-crew" },
];

export const BOUNTY = {
  name: "Shivraj Sonwane",
  epithet: "The Backend Pirate",
  amount: "¥???",
  crime:
    "Building dependable software from API to test case. Java backend systems, full-stack products and testing workflows that make software easier to trust.",
  origin: "Pune, Grand Line",
  skills: [
    "Java Backend",
    "Full-Stack",
    "QA Automation",
    "Software Testing",
  ],
};

export const PROJECTS = [
  {
    id: "copilot",
    chapter: 1,
    title: "AI Job Copilot",
    subtitle: "Full-stack job-search platform",
    description:
      "A full-stack platform for managing resumes, comparing them with job descriptions, generating application material, practising interviews and tracking job applications.",
    links: {
      live: "https://ai-job-copilot-frontend.onrender.com",
      source: "https://github.com/shivrajks/ai-job-copilot",
    },
    island: "East Blue",
    stats: [
      { label: "Backend", value: "Java 21, Spring Boot, Security, JWT" },
      { label: "Data", value: "PostgreSQL, Redis, Neon, Upstash" },
      { label: "Frontend", value: "Next.js, React, TypeScript, Zustand" },
      { label: "Status", value: "Live on Render" },
    ],
    narrative: [
      {
        step: "Problem",
        text: "Job seekers split resumes, job descriptions, interview practice and application tracking across separate tools.",
      },
      {
        step: "Product",
        text: "One workflow connects resume upload, ATS-style matching, tailoring, cover letters, interviews and applications.",
      },
      {
        step: "Architecture",
        text: "Next.js frontend talks to Spring Boot APIs backed by PostgreSQL, Redis and protected user-owned records.",
      },
      {
        step: "Verification",
        text: "Backend tests completed; frontend lint, type-check and production build verified.",
      },
    ],
    details: [
      {
        title: "Backend Engineering",
        text: "Authentication uses access and refresh tokens, password hashing, logout flows and ownership checks. Resume upload supports PDF and DOCX parsing connected to job-description analysis.",
      },
      {
        title: "Frontend Experience",
        text: "Dashboard for managing resumes, jobs, ATS reports, interview prep, analytics and application stages with responsive views and clear empty states.",
      },
      {
        title: "Testing & Deployment",
        text: "Backend test suite, frontend linting, type-checking and production build checks. Deployed with Render, Neon and Upstash.",
      },
    ],
  },
  {
    id: "payment",
    chapter: 2,
    title: "Payment Integration System",
    subtitle: "Backend workflow / Payment states",
    description:
      "A Spring Boot payment workflow with validation, processing, a Stripe-style checkout provider, webhook-style status updates and API testing through a React dashboard.",
    links: {
      source: "https://github.com/shivrajks/payment-integration-system",
    },
    island: "Paradise",
    stats: [
      { label: "Stack", value: "Java, Spring Boot, React" },
      { label: "Flow", value: "Request → Process → Checkout → Confirm" },
    ],
    flow: [
      "Validate payload and card details",
      "Create and store a payment record",
      "Generate a simulated checkout session",
      "Update state through webhook-style endpoints",
    ],
  },
  {
    id: "finance",
    chapter: 3,
    title: "Finance & Expense Tracker",
    subtitle: "Database system / Oracle SQL",
    description:
      "An Oracle SQL financial tracking system with users, categories, transactions, budgets, savings goals, triggers, procedures, views and monthly analysis.",
    links: {},
    island: "New World",
    stats: [
      { label: "Stack", value: "Oracle SQL" },
      { label: "Features", value: "Triggers, Procedures, Views, Analysis" },
    ],
    bullets: [
      "Models income, expenses, categories and budgets as related records",
      "Uses sequences, triggers and stored procedures for database behavior",
      "Includes budget alerts and monthly analysis queries",
    ],
  },
];

export const SKILLS = {
  paramecia: {
    type: "Paramecia",
    description: "Superhuman abilities that alter the body or environment",
    fruits: [
      {
        name: "Gomu Gomu no Build",
        skill: "Java, Spring Boot, REST APIs, React, Next.js, TypeScript",
        icon: "build",
      },
      {
        name: "Bara Bara no Store",
        skill: "PostgreSQL, Oracle SQL, MySQL, Redis, Schema Design",
        icon: "store",
      },
    ],
  },
  zoan: {
    type: "Zoan",
    description: "Transformation into animals — adaptability and instinct",
    fruits: [
      {
        name: "Hito Hito no Verify",
        skill: "Selenium, TestNG, Postman, Manual Testing, API Testing",
        icon: "verify",
      },
    ],
  },
  logia: {
    type: "Logia",
    description: "Control over natural elements — power at scale",
    fruits: [
      {
        name: "Mera Mera no Ship",
        skill: "Git, GitHub, Docker, Render, Vercel, Neon, Upstash",
        icon: "ship",
      },
    ],
  },
};

export const VOYAGE = [
  {
    year: "2022 - 2025",
    title: "Setting Sail — Bachelor of Computer Science",
    text: "Vivekanand College. CGPA: 7.67. The journey begins.",
    island: "home",
  },
  {
    year: "Training",
    title: "Learning the Ropes — Testing Practice",
    text: "Manual, API and automation checks. Test-case writing, expected vs actual results, defect reproduction, Postman, Selenium WebDriver and TestNG.",
    island: "training",
  },
  {
    year: "Building",
    title: "First Voyages — Project Work",
    text: "Built payment workflow, Oracle SQL finance tracker and AI Job Copilot with Java, Spring Boot, frontend workflows, databases and deployment tooling.",
    island: "building",
  },
  {
    year: "Now",
    title: "Chasing the One Piece — Entry-Level Role Search",
    text: "Looking for teams where backend implementation and software quality both matter. The adventure continues.",
    island: "current",
  },
];

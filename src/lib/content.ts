export const EMAIL = "fabian.spiri@gmx.ch";

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fabian-spiri-297969338/" },
  { label: "GitHub", href: "https://github.com/Fababum" },
  { label: "E-Mail", href: `mailto:${EMAIL}` },
];

export const navItems = [
  { id: "home", label: "Home", image: "/images/PB_Fabian.png" },
  { id: "about", label: "Über mich", image: "/images/portraits/portrait-hiking.jpg" },
  { id: "experience", label: "Erfahrung", image: "/images/landscapes/landscape-ridge.jpg" },
  { id: "moments", label: "Momente", image: "/images/landscapes/landscape-ocean-sunset.jpg" },
  { id: "contact", label: "Kontakt", image: "/images/dog/dog-face.jpg" },
];

export type Photo = { src: string; alt: string; caption: string; position?: string };

export const photos: Photo[] = [
  { src: "/images/portraits/portrait-hiking.jpg", alt: "Fabian beim Wandern in den Bergen", caption: "Alpen, Wandern", position: "50% 25%" },
  { src: "/images/landscapes/landscape-ridge.jpg", alt: "Felsgrat in den Alpen", caption: "Felsgrat", position: "50% 45%" },
  { src: "/images/dog/dog-face.jpg", alt: "Nahaufnahme meines Hundes", caption: "Bester Freund", position: "50% 40%" },
  { src: "/images/landscapes/landscape-ocean-sunset.jpg", alt: "Sonnenuntergang über dem Meer", caption: "Sunset am Meer", position: "50% 60%" },
  { src: "/images/portraits/portrait-prom.jpg", alt: "Fabian am Abschlussball", caption: "Abschlussball", position: "50% 15%" },
  { src: "/images/landscapes/landscape-cove.jpg", alt: "Türkise Felsbucht am Meer", caption: "Felsbucht", position: "50% 50%" },
  { src: "/images/dog/dog-hand.jpg", alt: "Mein Hund", caption: "Pfote drauf", position: "50% 35%" },
  { src: "/images/landscapes/landscape-garden-ruins.jpg", alt: "Gartenruine mit Blumen", caption: "Gartenruine", position: "50% 40%" },
  { src: "/images/landscapes/landscape-night-beach.jpg", alt: "Nachtstrand mit Mond", caption: "Strand bei Nacht", position: "50% 65%" },
  { src: "/images/landscapes/landscape-peak-sun.jpg", alt: "Bergspitze mit Sonne", caption: "Gipfel", position: "50% 55%" },
  { src: "/images/landscapes/landscape-mountain-lake.jpg", alt: "Bergsee-Panorama", caption: "Bergsee", position: "50% 55%" },
];

export const skillGroups: { category: string; items: string[]; featured?: boolean; note?: string }[] = [
  { category: "Frontend", items: ["React", "Next.js", "Vue 3", "TypeScript", "Tailwind CSS"] },
  { category: "Mobile Apps", featured: true, note: "Eigene Handy-App für iOS & Android mit freetly entwickelt.", items: ["React Native", "Expo & Expo Router", "NativeWind", "Secure Storage", "iOS & Android"] },
  { category: "Backend", items: ["NestJS", "Node.js / Express", "FastAPI (Python)", "WebSockets / Socket.IO", "REST APIs", "Java"] },
  { category: "Datenbanken", items: ["MySQL / MariaDB", "PostgreSQL / Supabase", "Prisma ORM", "Redis", "SQLite"] },
  { category: "KI & LLM", items: ["OpenAI SDK / Swiss AI", "MCP Server", "AWS Bedrock", "Ollama", "Prompt Engineering"] },
  { category: "DevOps & Cloud", items: ["Docker / Compose", "GitLab CI/CD", "Cloud Foundry", "AWS + Terraform", "Kubernetes", "Fly.io / Vercel"] },
  { category: "Security & Auth", items: ["SSO / OIDC", "JWT Auth", "OWASP Top 10", "Rate Limiting"] },
];

export const marqueeWords = [
  "React", "Next.js", "Vue", "TypeScript", "NestJS", "FastAPI", "Node.js", "Python",
  "React Native", "Expo", "Docker", "MySQL", "Prisma", "Redis", "AWS", "Terraform", "MCP", "GitLab CI",
];

export const certifications: { name: string; issuer: string; note: string; inProgress?: boolean }[] = [
  { name: "SPARC-Kurs", issuer: "Schweizer Armee", note: "Cybersecurity-Ausbildung der Armee, aktuell noch in Absolvierung.", inProgress: true },
  { name: "OWASP Top 10", issuer: "Immersive Labs", note: "Web-Sicherheitslücken & Gegenmassnahmen." },
  { name: "Security Fundamentals & Tooling", issuer: "Immersive Labs", note: "Secure Fundamentals, Secure Testing, Secure Tooling, Browser Developer Tools." },
];

export const projects: { name: string; tag: string; description: string; stack: string[]; href?: string; image: string }[] = [
  {
    name: "Human or AI?",
    tag: "Team Halo · Multiplayer-Game",
    description: "Echtzeit-Chatgame: Zwei Spieler chatten 90 Sekunden und raten, ob ein Mensch oder eine KI antwortet. Inkl. SSO-Login.",
    stack: ["Vue 3", "Socket.IO", "Redis", "Swiss AI", "Cloud Foundry"],
    href: "https://humanorai.dev-scapp.swisscom.com/",
    image: "/images/landscapes/landscape-night-beach.jpg",
  },
  {
    name: "SpTrack",
    tag: "Full-Stack · KI",
    description: "Kalorien- und Ernährungstracker mit KI-Chatbot, der das Tagebuch per MCP-Tools liest und bearbeitet. Infrastruktur als Code auf AWS.",
    stack: ["React", "FastAPI", "Prisma", "MySQL", "AWS Bedrock", "Terraform"],
    image: "/images/landscapes/landscape-peak-sun.jpg",
  },
  {
    name: "freetly",
    tag: "Startup · Web & Handy-App",
    description: "Social-Planning-App, um Freunde zu finden, die gerade Zeit haben. Web-App, eigene Handy-App für iOS & Android und API in einem Monorepo.",
    stack: ["React Native", "Expo", "NestJS", "Next.js", "Prisma", "Kubernetes"],
    image: "/images/landscapes/landscape-ocean-sunset.jpg",
  },
  {
    name: "Osterweg Wyland",
    tag: "Website · Buchungssystem",
    description: "Website und Online-Reservationssystem für den Osterweg einer Kirchgemeinde, mit Admin-Bereich und Excel-Export.",
    stack: ["React", "Express", "SQLite", "Leaflet", "Fly.io"],
    href: "https://osterweg-wyland.com",
    image: "/images/landscapes/landscape-garden-ruins.jpg",
  },
  {
    name: "Hack the AI",
    tag: "Team Halo · Prompt-Game",
    description: "Prompt-Engineering-Spiel: Bring die KI SENTINEL in drei Schwierigkeitsstufen dazu, ihre Zugangscodes zu verraten.",
    stack: ["Vue 3", "Express", "Redis", "Swiss AI", "Docker"],
    image: "/images/landscapes/landscape-cove.jpg",
  },
  {
    name: "Team Halo Website",
    tag: "Team Halo · Web-App",
    description: "Öffentliche Team-Website plus Admin-Bereich zur Verwaltung von Lernenden-Feedback, ersetzt eine Excel-Liste.",
    stack: ["Next.js", "Express", "Prisma", "MariaDB", "OIDC"],
    image: "/images/landscapes/landscape-ridge.jpg",
  },
  {
    name: "AI Report Engine",
    tag: "Team Halo · KI",
    description: "Erstellt mit KI Entwürfe für Bildungsberichte von Lernenden, inklusive Bearbeitung und PDF-Export.",
    stack: ["FastAPI", "SQLModel", "Swiss AI", "pytest", "GitLab CI"],
    image: "/images/landscapes/landscape-mountain-lake.jpg",
  },
];

export const timeline = [
  { period: "2026 – heute", role: "Host, Team Halo", company: "Swisscom", description: "Aktuelles Ausbildungsprojekt als Host im Team Halo.", isOngoing: true },
  { period: "2026", role: "Mitglied, Team Halo", company: "Swisscom", description: "Mitarbeit im Ausbildungsprojekt Team Halo." },
  { period: "2025 – 2026", role: "Apps Team", company: "Swisscom", description: "API-Entwicklung mit NestJS, Datenbankintegration via Prisma ORM und React-Frontend." },
  { period: "2025", role: "CodemiX2", company: "Swisscom", description: "Vertiefung in JavaScript, TypeScript, React und Software-Engineering-Grundlagen." },
  { period: "2024 – 2025", role: "Abuse Team", company: "Swisscom Cyber Security", description: "Spam- und Phishing-Erkennung, Sicherheitsmassnahmen, Java und Python." },
  { period: "2024", role: "Start Lehre Informatik EFZ", company: "Swisscom", description: "Beginn der vierjährigen Ausbildung zum Informatiker EFZ, aktuell im 3. Lehrjahr." },
];

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

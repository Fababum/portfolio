export const EMAIL = "fabian.spiri@gmx.ch";

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fabian-spiri" },
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

export const skillGroups = [
  { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML / CSS"] },
  { category: "Backend", items: ["NestJS", "Node.js", "Java", "Python", "Docker"] },
  { category: "Datenbanken", items: ["Prisma ORM", "PostgreSQL", "SQL"] },
  { category: "Tools", items: ["Git", "REST APIs", "Agile / Scrum"] },
  { category: "Security", items: ["OWASP Top 10", "Secure Coding", "Phishing-Erkennung"] },
];

export const marqueeWords = [
  "React", "TypeScript", "NestJS", "Node.js", "Java", "Python", "Docker",
  "PostgreSQL", "Prisma", "REST APIs", "Git", "Scrum",
];

export const certifications = [
  { name: "SPARC-Kurs", issuer: "Schweizer Armee", note: "Vertiefte Cybersecurity-Ausbildung." },
  { name: "OWASP Top 10", issuer: "Immersive Labs", note: "Web-Sicherheitslücken & Gegenmassnahmen." },
  { name: "Security Fundamentals & Tooling", issuer: "Immersive Labs", note: "Secure Fundamentals, Secure Testing, Secure Tooling, Browser Developer Tools." },
];

export const projects: { name: string; tag: string; description: string; href?: string; image: string }[] = [
  {
    name: "Security Awareness Game",
    tag: "SSO · Security · Web-App",
    description: "Ein spielerisches Tool zur Sensibilisierung für Cybersecurity-Themen, inkl. SSO-Integration.",
    href: "https://humanorai.dev-scapp.swisscom.com/",
    image: "/images/landscapes/landscape-night-beach.jpg",
  },
  {
    name: "Startup",
    tag: "Nebenprojekt",
    description: "Mitarbeit an einem eigenen Startup-Projekt neben der Ausbildung.",
    image: "/images/landscapes/landscape-peak-sun.jpg",
  },
  {
    name: "Webseite Kirche",
    tag: "Webdesign · Ehrenamt",
    description: "Unterstützung beim Webdesign und Aufbau einer Webseite für eine Kirchgemeinde.",
    image: "/images/landscapes/landscape-garden-ruins.jpg",
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

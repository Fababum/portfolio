import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const skills = [
  { category: "Frontend",    items: ["React", "TypeScript", "JavaScript", "HTML/CSS"] },
  { category: "Backend",     items: ["NestJS", "Node.js", "Java", "Python", "Docker"] },
  { category: "Datenbanken", items: ["Prisma ORM", "PostgreSQL", "SQL"] },
  { category: "Tools",       items: ["Git", "REST APIs", "Agile / Scrum"] },
  { category: "Security",    items: ["Cybersecurity", "Phishing Detection", "Threat Analysis"] },
];

const timeline = [
  {
    period: "Feb 2026 – heute",
    role: "Halo",
    company: "Swisscom",
    description: "Entwicklung interner Web-Applikationen mit React und TypeScript. Fokus auf moderne Frontend-Architektur und kollaborative agile Prozesse.",
    isOngoing: true,
  },
  {
    period: "Aug 2025 – Feb 2026",
    role: "Apps Team",
    company: "Swisscom",
    description: "API-Entwicklung mit NestJS, Datenbankintegration via Prisma ORM und React-Frontend.",
  },
  {
    period: "Feb 2025 – Aug 2025",
    role: "CodemiX2",
    company: "Swisscom",
    description: "Vertiefung in JavaScript, TypeScript, React und Software-Engineering-Grundlagen.",
  },
  {
    period: "Aug 2024 – Feb 2025",
    role: "Abuse Team",
    company: "Swisscom Cyber Security",
    description: "Spam- und Phishing-Erkennung, Sicherheitsmassnahmen, Java und Python.",
  },
  {
    period: "Aug 2024",
    role: "Start Berufslehre Informatik EFZ",
    company: "Swisscom",
    description: "Beginn der vierjährigen Ausbildung zum Informatiker EFZ.",
  },
];

function About() {
  return (
    <div className="min-h-screen text-foreground px-6 pt-10 pb-24">
      <div className="max-w-3xl mx-auto space-y-4">

        {/* ── Profile header ── */}
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <Avatar className="h-24 w-24 border-2 border-border shadow-md">
            <AvatarImage src="/PB_Fabian.png" alt="Fabian Spiri" />
            <AvatarFallback>FS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-foreground mb-1.5" style={{ textShadow: "var(--title-shadow)" }}>
              Fabian Spiri
            </h1>
            <p className="text-muted-foreground font-medium text-base mb-1">
              Full-Stack Developer in Ausbildung · Swisscom
            </p>
            <p className="text-muted-foreground text-sm">Zürich, Schweiz</p>
          </div>
        </div>

        {/* ── Bio ── */}
        <Card>
          <CardHeader className="pb-2 pt-5 px-6">
            <SectionLabel>Über mich</SectionLabel>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            <p className="text-sm text-muted-foreground leading-7">
              Ich bin Fabian Spiri, leidenschaftlicher Full-Stack-Entwickler in der Ausbildung bei Swisscom.
              Ich baue robuste Frontend- und Backend-Lösungen und erkunde kontinuierlich neue Technologien.
            </p>
            <p className="text-sm text-muted-foreground leading-7">
              Ausserhalb der Arbeit gehe ich regelmässig ins Gym und spiele gerne Souls-like Games.
            </p>
          </CardContent>
        </Card>

        {/* ── Skills ── */}
        <Card>
          <CardHeader className="pb-2 pt-5 px-6">
            <SectionLabel>Skills & Technologien</SectionLabel>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2.5">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs font-medium">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Timeline ── */}
        <Card>
          <CardHeader className="pb-2 pt-5 px-6">
            <SectionLabel>Erfahrung & Ausbildung</SectionLabel>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="grid grid-cols-[20px_1fr] gap-x-4">
                  {/* Dot + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1.5 border-2 shrink-0 ${
                        item.isOngoing
                          ? "border-green-500 bg-green-500 shadow-[0_0_8px_#22c55e]"
                          : "border-border bg-transparent"
                      }`}
                    />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-border min-h-[28px] my-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={i < timeline.length - 1 ? "pb-5" : ""}>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-sm text-foreground">{item.role}</span>
                      {item.isOngoing && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 border-green-500/30 bg-green-500/10 text-green-500 dark:text-green-400 gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
                          Aktuell
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.company} · {item.period}
                    </p>
                    <p className="text-sm text-muted-foreground leading-6">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase text-primary mb-0">
      {children}
    </p>
  );
}

export default About;

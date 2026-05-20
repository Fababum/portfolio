import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowDown, ChevronDown } from "lucide-react";

const projects = [
  {
    title: "Halo",
    company: "Swisscom",
    date: "Feb 2026 – heute",
    description:
      "Im Halo-Team entwickle ich interne Web-Applikationen und trage zur Weiterentwicklung der Swisscom-Plattform bei. Der Fokus liegt auf moderner Frontend-Architektur, sauberen APIs und der Zusammenarbeit in einem agilen Team.",
    tags: ["React", "TypeScript", "REST APIs", "Agile", "Full-Stack"],
    isOngoing: true,
  },
  {
    title: "Apps Team",
    company: "Swisscom",
    date: "Aug 2025 – Feb 2026",
    description:
      "API-Entwicklung mit NestJS, Datenbankintegration via Prisma ORM und Aufbau skalierbarer Backend-Services. Dieses Projekt festigte mein Verständnis für professionelle Full-Stack-Entwicklung.",
    tags: ["NestJS", "Prisma ORM", "PostgreSQL", "React", "API Design", "TypeScript"],
  },
  {
    title: "CodemiX2",
    company: "Swisscom",
    date: "Feb 2025 – Aug 2025",
    description:
      "Vertiefung in mehrere Programmiersprachen und Erarbeitung eines soliden Fundaments in Software-Engineering-Grundsätzen — die wesentliche Basis für alle folgenden Projekte.",
    tags: ["JavaScript", "TypeScript", "React", "Java", "HTML", "CSS"],
  },
  {
    title: "Abuse Team",
    company: "Swisscom Cyber Security",
    date: "Aug 2024 – Feb 2025",
    description:
      "Tiefgehende Kenntnisse in Cybersecurity und Phishing-Erkennung. Entwicklung von Lösungen zur Spam-Erkennung und Konzeption von Sicherheitsmassnahmen mit Java und Python.",
    tags: ["Cybersecurity", "Phishing Detection", "Java", "Python", "Threat Analysis"],
  },
];

const ROLES = [
  "Full-Stack Developer",
  "React & TypeScript",
  "API Engineer",
  "Security Enthusiast",
];

function useTypingEffect(words: string[], speed = 65, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: number;
    if (!deleting && charIdx < current.length) {
      timeout = window.setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = window.setTimeout(() => setCharIdx((c) => c - 1), speed / 2.2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function Home() {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const typedRole = useTypingEffect(ROLES);

  return (
    <div className="min-h-screen text-foreground">

      {/* ── Hero ── */}
      <div className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 pb-20 pt-16 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "var(--hero-glow, rgba(99,102,241,0.08))", filter: "blur(100px)" }}
        />

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 dark:text-green-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
          Verfügbar für neue Projekte
        </div>

        {/* Name */}
        <h1 className="mb-4 text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
          Fabian Spiri
        </h1>

        {/* Typed subtitle */}
        <p className="text-lg text-muted-foreground mb-5 min-h-[1.6em] font-medium tracking-tight">
          {typedRole}
          <span
            className="inline-block w-0.5 h-[1em] bg-primary ml-0.5 align-middle rounded-sm"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </p>

        {/* Bio */}
        <p className="max-w-md text-muted-foreground leading-7 mb-10 text-sm">
          Lernender Full-Stack-Entwickler bei{" "}
          <strong className="text-foreground font-semibold">Swisscom</strong>.
          Ich baue robuste Web-Applikationen mit modernen Technologien.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="#contact"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center h-9 gap-1.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-opacity hover:opacity-85"
          >
            Kontakt aufnehmen
          </a>
          <Button
            variant="outline"
            size="lg"
            onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Projekte ansehen
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ── Projects ── */}
      <div id="projects" ref={projectsRef} className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
              Lehrjahr-Projekte
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-1.5">
              Meine Projekte
            </h2>
            <p className="text-sm text-muted-foreground">
              Projekte aus meiner Ausbildung bei Swisscom — chronologisch von aktuell zu früher.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Project {
  title: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
  isOngoing?: boolean;
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      onClick={() => setExpanded((e) => !e)}
    >
      <CardHeader className="pb-0 pt-5 px-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-0.5">
              <span className="font-bold text-base text-foreground">{project.title}</span>
              {project.isOngoing && (
                <Badge
                  variant="outline"
                  className="text-xs border-green-500/30 bg-green-500/10 text-green-500 dark:text-green-400 gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-green-500 shadow-[0_0_4px_#22c55e]" />
                  Aktuell
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{project.company}</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{project.date}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                expanded && "rotate-180"
              )}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-3 pb-5 px-5">
        {/* Tags always visible */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Expandable description */}
        {expanded && (
          <>
            <Separator className="my-3" />
            <p className="text-sm text-muted-foreground leading-7">
              {project.description}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Home;

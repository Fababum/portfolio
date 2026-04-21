import { useState, useEffect, useRef } from "react";

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
  const [showProjects, setShowProjects] = useState(false);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const typedRole = useTypingEffect(ROLES);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowProjects(!entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "var(--text)" }}>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        style={{
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            background: "var(--hero-glow)",
            borderRadius: "50%",
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />

        {/* Status pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "5px 14px 5px 10px",
            borderRadius: "999px",
            border: "1px solid var(--badge-ongoing-border)",
            background: "var(--badge-ongoing-bg)",
            fontSize: "12px",
            fontWeight: 500,
            color: "var(--badge-ongoing-color)",
            marginBottom: "32px",
            letterSpacing: "0.01em",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "var(--badge-dot)",
              flexShrink: 0,
              boxShadow: "0 0 6px var(--badge-dot)",
            }}
          />
          Verfügbar für neue Projekte
        </div>

        {/* Name */}
        <h1
          style={{
            marginBottom: "16px",
            color: "var(--text)",
            textShadow: "var(--title-shadow)",
          }}
        >
          Fabian Spiri
        </h1>

        {/* Typed subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.2rem)",
            color: "var(--text-secondary)",
            marginBottom: "20px",
            minHeight: "1.6em",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {typedRole}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "1em",
              background: "var(--accent)",
              marginLeft: "3px",
              verticalAlign: "middle",
              borderRadius: "1px",
              animation: "blink 1s step-end infinite",
            }}
          />
        </p>

        {/* Bio */}
        <p
          style={{
            maxWidth: "480px",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            marginBottom: "40px",
            fontSize: "0.95rem",
          }}
        >
          Lernender Full-Stack-Entwickler bei{" "}
          <strong style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
            Swisscom
          </strong>
          . Ich baue robuste Web-Applikationen mit modernen Technologien.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/contact"
            style={{
              textDecoration: "none",
              color: "#fff",
              background: "var(--accent)",
              border: "1px solid var(--accent)",
              padding: "11px 26px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.01em",
              transition: "opacity 180ms ease, transform 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Kontakt aufnehmen
          </a>
          <button
            type="button"
            onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid var(--card-border)",
              color: "var(--text-secondary)",
              padding: "11px 26px",
              borderRadius: "10px",
              fontWeight: 500,
              fontSize: "0.9rem",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "border-color 180ms ease, color 180ms ease, transform 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border-hover)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Projekte ansehen ↓
          </button>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <button
        type="button"
        onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Zu den Projekten scrollen"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "28px",
          transform: showProjects
            ? "translateX(-50%) translateY(12px)"
            : "translateX(-50%) translateY(0)",
          border: "1px solid var(--arrow-border)",
          background: "var(--arrow-bg)",
          color: "var(--text-muted)",
          borderRadius: "999px",
          padding: "7px 16px",
          cursor: "pointer",
          boxShadow: "var(--arrow-shadow)",
          opacity: showProjects ? 0 : 1,
          pointerEvents: showProjects ? "none" : "auto",
          transition: "opacity 280ms ease, transform 280ms ease",
          fontSize: "13px",
          fontWeight: 500,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        ↓ Scroll
      </button>

      {/* ── Projects ── */}
      <div
        id="projects"
        ref={projectsRef}
        style={{
          padding: "0 24px 100px",
          opacity: showProjects ? 1 : 0,
          transform: showProjects ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 500ms ease, transform 500ms ease",
          pointerEvents: showProjects ? "auto" : "none",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Section heading */}
          <div style={{ marginBottom: "32px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              Lehrjahr-Projekte
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                marginBottom: "6px",
              }}
            >
              Meine Projekte
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
              Projekte aus meiner Ausbildung bei Swisscom — chronologisch von aktuell zu früher.
            </p>
          </div>

          {/* Project list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
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
    <div
      className="card-hover"
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: "14px",
        padding: "20px 22px",
        background: "var(--card-bg)",
        boxShadow: "var(--card-shadow)",
        cursor: "pointer",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "3px" }}>
            <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
              {project.title}
            </span>
            {project.isOngoing && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "2px 9px",
                  borderRadius: "999px",
                  border: "1px solid var(--badge-ongoing-border)",
                  background: "var(--badge-ongoing-bg)",
                  color: "var(--badge-ongoing-color)",
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--badge-dot)",
                    boxShadow: "0 0 5px var(--badge-dot)",
                  }}
                />
                Aktuell
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {project.company}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              whiteSpace: "nowrap",
            }}
          >
            {project.date}
          </span>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "16px",
              lineHeight: 1,
              transition: "transform 200ms ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              display: "inline-block",
            }}
          >
            ↓
          </span>
        </div>
      </div>

      {/* Tags always visible */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: "1px solid var(--chip-border)",
              borderRadius: "6px",
              padding: "2px 9px",
              fontSize: "0.72rem",
              background: "var(--chip-bg)",
              color: "var(--text-muted)",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expandable description */}
      {expanded && (
        <p
          style={{
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: "1px solid var(--divider)",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          {project.description}
        </p>
      )}
    </div>
  );
}

export default Home;

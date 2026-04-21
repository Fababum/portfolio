import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "Abuse Team",
    company: "Swisscom Cyber Security",
    date: "Aug 2024 – Feb 2025",
    description:
      "Im Abuse-Team bei Swisscom Cyber Security gewann ich tiefgehende Kenntnisse in den Bereichen Cybersecurity und Phishing-Erkennung. Ich erweiterte mein Wissen in Java und Python und lernte, Spam-Angriffe effektiv zu erkennen und Sicherheitsmassnahmen zu konzipieren.",
    tags: [
      "Cybersecurity",
      "Phishing Detection",
      "Java",
      "Python",
      "Threat Analysis",
      "Incident Response",
    ],
  },
  {
    title: "CodemiX2",
    company: "Swisscom",
    date: "Feb 2025 – Aug 2025",
    description:
      "In diesem Projekt erarbeitete ich mir fundierte Kenntnisse in mehreren Programmiersprachen und entwickelte ein solides Verständnis für Software-Engineering-Grundsätze – eine wesentliche Basis für alle weiteren Projekte.",
    tags: [
      "JavaScript",
      "TypeScript",
      "React",
      "Java",
      "HTML",
      "CSS",
      "Software Fundamentals",
    ],
  },
  {
    title: "Apps Team",
    company: "Swisscom",
    date: "Aug 2025 – Feb 2026",
    description:
      "Hier konnte ich neue Fähigkeiten wie die API-Entwicklung mit NestJS, die Anbindung von Datenbanken und den Einsatz von Prisma ORM erwerben. Dieses Projekt bot grosses Lernpotenzial.",
    tags: [
      "Full-Stack Development",
      "API Design",
      "NestJS",
      "Prisma ORM",
      "Database Integration",
      "React",
    ],
  },
];

const ROLES = [
  "Full-Stack Developer",
  "React & TypeScript Enthusiast",
  "API Engineer",
  "Cybersecurity Learner",
];

function useTypingEffect(words: string[], speed = 70, pause = 1800) {
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
      timeout = window.setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
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
  const [titleShrunk, setTitleShrunk] = useState(false);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const typedRole = useTypingEffect(ROLES);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;
        setShowProjects(shouldShow);
        setTitleShrunk(shouldShow);
      },
      { threshold: 0.5 },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "var(--text)", paddingBottom: "80px" }}>

      {/* ── Hero ── */}
      <div
        ref={heroRef}
        style={{
          minHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "0",
          padding: "0 20px",
          position: "relative",
        }}
      >
        {/* Accent glow behind title */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "520px",
            height: "260px",
            background: "var(--hero-accent)",
            borderRadius: "50%",
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        {/* Greeting badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 14px",
            borderRadius: "999px",
            border: "1px solid var(--chip-border)",
            background: "var(--chip-bg)",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "10px" }}>●</span>
          Verfügbar für neue Projekte
        </div>

        <h1
          style={{
            fontSize: titleShrunk ? "28px" : "clamp(2.2rem, 6vw, 3.5rem)",
            margin: titleShrunk ? "4px 0 0" : "0 0 6px",
            transition: "font-size 420ms ease, margin 420ms ease, transform 420ms ease",
            transform: titleShrunk ? "translateY(-10px)" : "translateY(0)",
            color: "var(--text)",
            textShadow: "var(--title-shadow)",
            letterSpacing: "-0.5px",
          }}
        >
          Fabian Spiri
        </h1>

        {!titleShrunk && (
          <>
            {/* Typed role */}
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "var(--text-muted)",
                margin: "0 0 28px",
                minHeight: "1.6em",
                fontWeight: 500,
              }}
            >
              {typedRole}
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.1em",
                  background: "var(--text)",
                  marginLeft: "2px",
                  verticalAlign: "middle",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </p>

            {/* Short intro */}
            <p
              style={{
                maxWidth: "520px",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: "32px",
                fontSize: "0.97rem",
              }}
            >
              Ich bin Lernender Full-Stack-Entwickler bei{" "}
              <strong style={{ color: "var(--text)" }}>Swisscom</strong> und baue
              robuste, sichere Web-Applikationen mit modernen Technologien.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href="/contact"
                style={{
                  textDecoration: "none",
                  color: "var(--text)",
                  background: "var(--nav-active)",
                  border: "1px solid var(--card-border)",
                  padding: "11px 24px",
                  borderRadius: "999px",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "transform 180ms ease, opacity 180ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Kontakt aufnehmen →
              </a>
              <button
                type="button"
                onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "transparent",
                  border: "1px solid var(--chip-border)",
                  color: "var(--text-muted)",
                  padding: "11px 24px",
                  borderRadius: "999px",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  transition: "color 180ms ease, border-color 180ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--card-border-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--chip-border)";
                }}
              >
                Projekte ansehen ↓
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Scroll arrow ── */}
      <button
        type="button"
        onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to projects"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "22px",
          border: "1px solid var(--arrow-border)",
          background: "var(--arrow-bg)",
          color: "var(--text)",
          borderRadius: "999px",
          padding: "8px 14px",
          cursor: "pointer",
          boxShadow: "var(--arrow-shadow)",
          opacity: showProjects ? 0 : 1,
          pointerEvents: showProjects ? "none" : "auto",
          transition: "opacity 240ms ease, transform 240ms ease",
          transform: showProjects ? "translateX(-50%) translateY(8px)" : "translateX(-50%)",
          fontSize: "16px",
        }}
      >
        ↓
      </button>

      {/* ── Projects ── */}
      <div
        id="projects"
        ref={projectsRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "10px 20px 60px",
          opacity: showProjects ? 1 : 0,
          transform: showProjects ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 420ms ease, transform 420ms ease",
          pointerEvents: showProjects ? "auto" : "none",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.3px" }}>Meine Projekte</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Projekte, in denen ich bei Swisscom mitgearbeitet habe oder aktuell arbeite.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "16px",
            width: "min(960px, 100%)",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-hover"
              style={{
                border: "1px solid var(--card-border)",
                borderRadius: "18px",
                padding: "22px 24px",
                textAlign: "left",
                background: "var(--card-bg)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "4px",
                }}
              >
                <div>
                  <h2 style={{ margin: "0 0 2px", fontSize: "1.2rem" }}>{project.title}</h2>
                  <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {project.company}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      background: "var(--chip-bg)",
                      border: "1px solid var(--chip-border)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.date}
                  </span>

                </div>
              </div>

              <p style={{ margin: "12px 0", lineHeight: 1.65, color: "var(--text)", opacity: 0.85, fontSize: "0.93rem" }}>
                {project.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    style={{
                      border: "1px solid var(--chip-border)",
                      borderRadius: "999px",
                      padding: "3px 10px",
                      fontSize: "0.75rem",
                      background: "var(--chip-bg)",
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
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

export default Home;

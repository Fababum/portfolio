const skills = [
  { category: "Frontend",       items: ["React", "TypeScript", "JavaScript", "HTML/CSS"] },
  { category: "Backend",        items: ["NestJS", "Node.js", "Java", "Python"] },
  { category: "Datenbanken",    items: ["Prisma ORM", "PostgreSQL", "SQL"] },
  { category: "Tools",          items: ["Git", "REST APIs", "Agile / Scrum"] },
  { category: "Security",       items: ["Cybersecurity", "Phishing Detection", "Threat Analysis"] },
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
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* ── Profile header ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "18px",
            marginBottom: "52px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid var(--card-border)",
              boxShadow: "var(--card-shadow)",
              flexShrink: 0,
            }}
          >
            <img
              src="/PB_Fabian.png"
              alt="Fabian Spiri"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                marginBottom: "6px",
                textShadow: "var(--title-shadow)",
              }}
            >
              Fabian Spiri
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontWeight: 500,
                fontSize: "1rem",
                marginBottom: "4px",
              }}
            >
              Full-Stack Developer in Ausbildung · Swisscom
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              Zürich, Schweiz
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* ── Bio ── */}
          <section
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <SectionLabel>Über mich</SectionLabel>
            <p style={{ lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "12px", fontSize: "0.95rem" }}>
              Ich bin Fabian Spiri, leidenschaftlicher Full-Stack-Entwickler in der Ausbildung bei Swisscom.
              Ich baue robuste Frontend- und Backend-Lösungen und erkunde kontinuierlich neue Technologien.
            </p>
            <p style={{ lineHeight: 1.8, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Ausserhalb der Arbeit gehe ich regelmässig ins Gym und spiele gerne Souls-like Games.
            </p>
          </section>

          {/* ── Skills ── */}
          <section
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <SectionLabel>Skills & Technologien</SectionLabel>
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              }}
            >
              {skills.map((group) => (
                <div key={group.category}>
                  <p
                    style={{
                      margin: "0 0 10px",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      letterSpacing: "0.09em",
                    }}
                  >
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          border: "1px solid var(--chip-border)",
                          borderRadius: "6px",
                          padding: "3px 10px",
                          fontSize: "0.78rem",
                          background: "var(--chip-bg)",
                          fontWeight: 500,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Timeline ── */}
          <section
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "14px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <SectionLabel>Erfahrung & Ausbildung</SectionLabel>
            <div>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "16px 1fr",
                    gap: "0 16px",
                  }}
                >
                  {/* Dot + line */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        border: `2px solid ${item.isOngoing ? "var(--badge-dot)" : "var(--chip-border)"}`,
                        background: item.isOngoing ? "var(--badge-dot)" : "transparent",
                        flexShrink: 0,
                        marginTop: "6px",
                        boxShadow: item.isOngoing ? "0 0 8px var(--badge-dot)" : "none",
                      }}
                    />
                    {i < timeline.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          background: "var(--divider)",
                          minHeight: "28px",
                          margin: "5px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: i < timeline.length - 1 ? "22px" : 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "2px",
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text)" }}>
                        {item.role}
                      </span>
                      {item.isOngoing && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "10px",
                            fontWeight: 600,
                            padding: "2px 8px",
                            borderRadius: "999px",
                            border: "1px solid var(--badge-ongoing-border)",
                            background: "var(--badge-ongoing-bg)",
                            color: "var(--badge-ongoing-color)",
                            letterSpacing: "0.04em",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              background: "var(--badge-dot)",
                              boxShadow: "0 0 4px var(--badge-dot)",
                            }}
                          />
                          Aktuell
                        </span>
                      )}
                    </div>
                    <p style={{ margin: "0 0 4px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      {item.company} · {item.period}
                    </p>
                    <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color: "var(--accent)",
        marginBottom: "16px",
      }}
    >
      {children}
    </p>
  );
}

export default About;

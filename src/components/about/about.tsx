const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML/CSS"] },
  { category: "Backend", items: ["NestJS", "Node.js", "Java", "Python"] },
  { category: "Datenbanken & Tools", items: ["Prisma ORM", "SQL", "Git", "API Design"] },
  { category: "Security", items: ["Cybersecurity", "Phishing Detection", "Threat Analysis"] },
];

const timeline = [
  {
    period: "Aug 2025 – Feb 2026",
    role: "Apps Team – Full-Stack Developer",
    company: "Swisscom",
    description: "API-Entwicklung mit NestJS, Datenbankintegration via Prisma ORM und React-Frontend.",
  },
  {
    period: "Feb 2025 – Aug 2025",
    role: "CodemiX2 – Software Developer",
    company: "Swisscom",
    description: "Vertiefung in JavaScript, TypeScript, React und Software-Engineering-Grundlagen.",
  },
  {
    period: "Aug 2024 – Feb 2025",
    role: "Abuse Team – Cyber Security Developer",
    company: "Swisscom Cyber Security",
    description: "Spam- und Phishing-Erkennung, Sicherheitsmassnahmen, Java und Python.",
  },
  {
    period: "Aug 2024",
    role: "Start Berufslehre Informatik",
    company: "Swisscom",
    description: "Beginn der vierjährigen Ausbildung zum Informatiker EFZ bei Swisscom.",
  },
];

function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        padding: "10px 20px 60px",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* ── Profile header ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
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
            <h1 style={{ margin: "0 0 4px", textShadow: "var(--title-shadow)" }}>
              Fabian Spiri
            </h1>
            <p style={{ margin: "0 0 6px", color: "var(--text-muted)", fontWeight: 500, fontSize: "1.05rem" }}>
              Full-Stack Developer · Swisscom
            </p>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Zürich, Schweiz
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: "24px" }}>

          {/* ── Who I Am ── */}
          <div
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "18px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h2 style={{ margin: "0 0 12px" }}>Über mich</h2>
            <p style={{ lineHeight: 1.75, color: "var(--text)", opacity: 0.85, marginBottom: "10px" }}>
              Ich bin Fabian Spiri, ein leidenschaftlicher Full-Stack-Entwickler in der Ausbildung bei
              Swisscom. Ich baue robuste Frontend- und Backend-Lösungen für anspruchsvolle Projekte und
              liebe es, neue Technologien zu erkunden und meine Fähigkeiten kontinuierlich weiterzuentwickeln.
            </p>
            <p style={{ lineHeight: 1.75, color: "var(--text)", opacity: 0.85 }}>
              Ausserhalb des Codings gehe ich regelmässig ins Gym und spiele gerne Souls-like Games.
            </p>
          </div>

          {/* ── What I Do ── */}
          <div
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "18px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h2 style={{ margin: "0 0 12px" }}>Was ich mache</h2>
            <p style={{ lineHeight: 1.75, color: "var(--text)", opacity: 0.85 }}>
              Als Full-Stack-Entwickler bei Swisscom arbeite ich an komplexen Projekten – von Cybersecurity
              und Phishing-Erkennung bis hin zu API-Entwicklung und Datenbankintegration. Ich spezialisiere
              mich auf die Entwicklung skalierbarer, sicherer und benutzerfreundlicher Applikationen mit
              modernen Technologien.
            </p>
          </div>

          {/* ── Skills ── */}
          <div
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "18px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h2 style={{ margin: "0 0 16px" }}>Skills & Technologien</h2>
            <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {skills.map((group) => (
                <div key={group.category}>
                  <p style={{ margin: "0 0 8px", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          border: "1px solid var(--chip-border)",
                          borderRadius: "999px",
                          padding: "4px 11px",
                          fontSize: "0.8rem",
                          background: "var(--chip-bg)",
                          fontWeight: 500,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div
            className="card-hover"
            style={{
              border: "1px solid var(--card-border)",
              borderRadius: "18px",
              padding: "24px",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <h2 style={{ margin: "0 0 20px" }}>Erfahrung & Ausbildung</h2>
            <div style={{ display: "grid", gap: "0" }}>
              {timeline.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "20px 1fr",
                    gap: "0 14px",
                  }}
                >
                  {/* Line + dot */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        border: "2px solid var(--card-border-hover)",
                        background: "var(--chip-bg)",
                        flexShrink: 0,
                        marginTop: "5px",
                      }}
                    />
                    {i < timeline.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          flex: 1,
                          background: "var(--divider)",
                          minHeight: "32px",
                          margin: "4px 0",
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: i < timeline.length - 1 ? "20px" : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "2px" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.role}</span>

                    </div>
                    <p style={{ margin: "0 0 2px", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                      {item.company} · {item.period}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text)", opacity: 0.75, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;

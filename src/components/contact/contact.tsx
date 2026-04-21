import { useState } from "react";

const contacts = [
  {
    icon: "✉",
    label: "Email",
    value: "fabian.spiri@gmx.ch",
    sub: "Swisscom: fabian.spiri@swisscom.com",
    href: "mailto:fabian.spiri@gmx.ch",
    cta: "Nachricht senden",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "Fabian Spiri",
    sub: "linkedin.com/in/fabian-spiri",
    href: "https://www.linkedin.com/in/fabian-spiri",
    cta: "Profil ansehen",
  },
  {
    icon: "</> ",
    label: "GitHub",
    value: "@Fababum",
    sub: "github.com/Fababum",
    href: "https://github.com/Fababum",
    cta: "Code ansehen",
  },
];

function ContactLink({
  icon,
  label,
  value,
  sub,
  href,
  cta,
}: {
  icon: string;
  label: string;
  value: string;
  sub: string;
  href: string;
  cta: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        textDecoration: "none",
        color: "inherit",
        padding: "20px",
        borderRadius: "14px",
        border: `1px solid ${hovered ? "var(--card-border-hover)" : "var(--card-border)"}`,
        background: "var(--card-bg)",
        boxShadow: "var(--card-shadow)",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            border: "1px solid var(--accent-border)",
            background: "var(--accent-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--accent)",
            flexShrink: 0,
            fontFamily: "monospace",
          }}
        >
          {icon}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)", marginBottom: "2px" }}>
            {label}
          </p>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{sub}</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 500 }}>
          {value}
        </span>
        <span
          style={{
            fontSize: "0.78rem",
            color: "var(--accent)",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {cta} →
        </span>
      </div>
    </a>
  );
}

function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        padding: "40px 24px 80px",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "10px",
            }}
          >
            Kontakt
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              marginBottom: "12px",
              textShadow: "var(--title-shadow)",
            }}
          >
            Lass uns reden
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Melde dich für Kollaborationen, Fragen oder ein kurzes Gespräch. Ich
            antworte in der Regel innerhalb eines Tages.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* ── Contact links ── */}
          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            }}
          >
            {contacts.map((c) => (
              <ContactLink key={c.label} {...c} />
            ))}
          </div>

          {/* ── Details row ── */}
          <div
            style={{
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {/* What I can help with */}
            <div
              className="card-hover"
              style={{
                padding: "22px",
                borderRadius: "14px",
                border: "1px solid var(--card-border)",
                background: "var(--card-bg)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  marginBottom: "10px",
                }}
              >
                Womit ich helfen kann
              </p>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "14px" }}>
                Web-Apps, APIs, sicherheitsorientierte Features und Verbesserungen bestehender Produkte.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {["Frontend", "Backend", "APIs", "Security", "UI"].map((tag) => (
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
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="card-hover"
              style={{
                padding: "22px",
                borderRadius: "14px",
                border: "1px solid var(--card-border)",
                background: "var(--card-bg)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.09em",
                  marginBottom: "10px",
                }}
              >
                Verfügbarkeit
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Geschäftlich</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "monospace" }}>07:00 – 15:00</span>
                </div>
                <div
                  style={{
                    height: "1px",
                    background: "var(--divider)",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Privat</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "monospace" }}>18:00 – 22:00</span>
                </div>
                <div
                  style={{
                    height: "1px",
                    background: "var(--divider)",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Reaktionszeit</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--badge-ongoing-color)", fontWeight: 600 }}>≤ 1 Tag</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA banner ── */}
          <div
            className="card-hover"
            style={{
              padding: "28px",
              borderRadius: "14px",
              border: "1px solid var(--accent-border)",
              background: "var(--accent-muted)",
              boxShadow: "var(--card-shadow)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "4px" }}>
                Bereit für ein Projekt?
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                Ich bin offen für neue Kooperationen und Herausforderungen.
              </p>
            </div>
            <a
              href="mailto:fabian.spiri@gmx.ch"
              style={{
                textDecoration: "none",
                color: "#fff",
                background: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "10px 22px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
                transition: "opacity 180ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              E-Mail senden →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;

import { useState } from "react";

const contactCards = [
  {
    title: "Email",
    description: (
      <>
        Swisscom / Geschäftlich: fabian.spiri@swisscom.com
        <br />
        Privat: fabian.spiri@gmx.ch
      </>
    ),
    cta: "Nachricht senden →",
    href: "mailto:fabian.spiri@gmx.ch",
  },
  {
    title: "LinkedIn",
    description: "Fabian Spiri",
    cta: "Vernetzen →",
    href: "https://www.linkedin.com/in/fabian-spiri",
  },
  {
    title: "GitHub",
    description: "@Fababum",
    cta: "Projekte ansehen →",
    href: "https://github.com/Fababum",
  },
];

const helpTags = ["Frontend", "Backend", "APIs", "Security", "UI Polish"];
const availabilityTags = [
  "Kurzzeitprojekte",
  "Langfristige Arbeit",
  "Produkt-Verbesserungen",
  "Security Features",
];

function ContactCard({
  title,
  description,
  cta,
  href,
}: {
  title: string;
  description: React.ReactNode;
  cta: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover"
      style={{
        textDecoration: "none",
        color: "inherit",
        padding: "18px",
        borderRadius: "16px",
        border: `1px solid ${hovered ? "var(--card-border-hover)" : "var(--card-border)"}`,
        background: "var(--card-bg)",
        boxShadow: "var(--card-shadow)",
        display: "grid",
        gap: "8px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ margin: "4px 0 0", fontSize: "22px" }}>{title}</h2>
      <p style={{ margin: 0, opacity: 0.75 }}>{description}</p>
      <div style={{ marginTop: "10px", fontWeight: 600 }}>{cta}</div>
    </a>
  );
}

function Contact() {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        padding: "10px 16px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "grid",
            gap: "8px",
            textAlign: "center",
            margin: "20px 0 24px",
          }}
        >
          <h1 style={{ margin: 0, textShadow: "var(--title-shadow)" }}>
            Kontakt aufnehmen
          </h1>
          <p style={{ margin: 0, opacity: 0.75 }}>Lass uns etwas aufbauen</p>
          <p style={{ margin: "0 auto", maxWidth: "620px", opacity: 0.75 }}>
            Melde dich für Kollaborationen, Projekte oder ein kurzes Gespräch.
            Ich antworte in der Regel innerhalb eines Tages.
          </p>
        </div>

        {/* ── Contact cards ── */}
        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {contactCards.map((card) => (
            <ContactCard key={card.title} {...card} />
          ))}
        </div>

        {/* ── Info cards ── */}
        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <div
            className="card-hover"
            style={{
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              display: "grid",
              gap: "10px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px" }}>Womit ich helfen kann</h2>
            <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>
              Web-Apps, APIs, sicherheitsorientierte Features und die
              Verbesserung bestehender Produkte. Knifflige Probleme interessieren
              mich besonders.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {helpTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid var(--chip-border)",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    background: "var(--chip-bg)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="card-hover"
            style={{
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              display: "grid",
              gap: "10px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "22px" }}>Verfügbarkeit</h2>
            <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>
              Werktags erreichbar von 07:00–15:00 Uhr. Für private Angelegenheiten
              bin ich ab 18:00–22:00 Uhr verfügbar.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {availabilityTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    border: "1px solid var(--chip-border)",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    background: "var(--chip-bg)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div
          className="card-hover"
          style={{
            padding: "22px",
            borderRadius: "18px",
            border: "1px solid var(--card-border)",
            background: "var(--card-bg)",
            boxShadow: "var(--card-shadow)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: "22px" }}>
              Bereit, ein Projekt zu starten?
            </h2>
            <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
              Ich bin offen für neue Projekte und Kooperationen.
            </p>
          </div>
          <a
            href="mailto:fabian.spiri@gmx.ch"
            style={{
              textDecoration: "none",
              color: "var(--text)",
              border: "1px solid var(--chip-border)",
              background: "var(--chip-bg)",
              padding: "10px 16px",
              borderRadius: "999px",
              fontWeight: 600,
            }}
          >
            E-Mail senden →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

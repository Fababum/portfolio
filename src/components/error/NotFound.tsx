import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        {/* 404 number */}
        <div
          style={{
            fontSize: "clamp(5rem, 18vw, 9rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-4px",
            color: "var(--text-muted)",
            opacity: 0.25,
            marginBottom: "8px",
            userSelect: "none",
          }}
        >
          404
        </div>

        <h1
          style={{
            margin: "0 0 12px",
            textShadow: "var(--title-shadow)",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
          }}
        >
          Seite nicht gefunden
        </h1>
        <p
          style={{
            opacity: 0.7,
            lineHeight: 1.65,
            marginBottom: "32px",
            fontSize: "0.97rem",
          }}
        >
          Die gesuchte Seite existiert nicht. Sie wurde möglicherweise
          verschoben, gelöscht oder die URL wurde falsch eingegeben.
        </p>

        {/* Primary actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              textDecoration: "none",
              color: "var(--text)",
              background: "var(--nav-active)",
              border: "1px solid var(--card-border)",
              padding: "11px 24px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              transition: "opacity 180ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Zur Startseite →
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
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
            ← Zurück
          </button>
        </div>

        {/* Quick links */}
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Oder besuche eine dieser Seiten
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "About", href: "/about" },
              { label: "Kontakt", href: "/contact" },
              { label: "Chat", href: "/chatBot" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  border: "1px solid var(--chip-border)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontSize: "0.82rem",
                  background: "var(--chip-bg)",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 180ms ease, border-color 180ms ease",
                  fontWeight: 500,
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
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

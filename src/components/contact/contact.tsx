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
        <div
          style={{
            display: "grid",
            gap: "8px",
            textAlign: "center",
            margin: "20px 0 24px",
          }}
        >
          <h1 style={{ margin: 0, textShadow: "var(--title-shadow)" }}>
            Get In Touch
          </h1>
          <p style={{ margin: 0, opacity: 0.75 }}>
            Let&apos;s build something
          </p>
          <p style={{ margin: "0 auto", maxWidth: "620px", opacity: 0.75 }}>
            Reach out for collaborations, opportunities, or a quick friendly
            chat. I usually reply within a day.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <a
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              display: "grid",
              gap: "8px",
              transition: "transform 200ms ease, border-color 200ms ease",
            }}
            href="mailto:fabian.spiri@gmx.ch"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 style={{ margin: "4px 0 0", fontSize: "22px" }}>Email</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>
              Swisscom / Business: fabian.spiri@swisscom.com
              <br />
              Privat: fabian.spiri@gmx.ch
            </p>
            <div style={{ marginTop: "10px", fontWeight: 600 }}>
              Send a message →
            </div>
          </a>

          <a
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              display: "grid",
              gap: "8px",
              transition: "transform 200ms ease, border-color 200ms ease",
            }}
            href="https://www.linkedin.com/in/fabian-spiri-221253363/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 style={{ margin: "4px 0 0", fontSize: "22px" }}>LinkedIn</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>Fabian Spiri</p>
            <div style={{ marginTop: "10px", fontWeight: 600 }}>
              Connect with me →
            </div>
          </a>

          <a
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "18px",
              borderRadius: "16px",
              border: "1px solid var(--card-border)",
              background: "var(--card-bg)",
              boxShadow: "var(--card-shadow)",
              display: "grid",
              gap: "8px",
              transition: "transform 200ms ease, border-color 200ms ease",
            }}
            href="https://github.com/Fababum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 style={{ margin: "4px 0 0", fontSize: "22px" }}>GitHub</h2>
            <p style={{ margin: 0, opacity: 0.75 }}>@Fababum</p>
            <div style={{ marginTop: "10px", fontWeight: 600 }}>
              See my projects →
            </div>
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          <div
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
            <h2 style={{ margin: 0, fontSize: "22px" }}>What I can help with</h2>
            <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>
              Web apps, APIs, security-focused features, and polishing existing
              products. If it&apos;s a tricky problem, I&apos;m interested.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {["Frontend", "Backend", "APIs", "Security", "UI Polish"].map(
                (tag) => (
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
                ),
              )}
            </div>
          </div>

          <div
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
            <h2 style={{ margin: 0, fontSize: "22px" }}>Availability</h2>
            <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>
              Available every day for business between 07:00–15:00. For private
              matters, I am available from 18:00–22:00.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {[
                "Short engagements",
                "Long-term work",
                "Product polish",
                "Security features",
              ].map((tag) => (
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

        <div
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
              Ready to start a project?
            </h2>
            <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
              I&apos;m open to new opportunities and collaborations.
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
            Email me →
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

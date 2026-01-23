function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        padding: "10px 16px 40px",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              overflow: "hidden",
              border: "1px solid var(--card-border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <img
              src="/PB_Fabian.png"
              alt="Fabian Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h1 style={{ margin: 0, textShadow: "var(--title-shadow)" }}>
              About Me
            </h1>
            <p style={{ margin: "6px 0 0", opacity: 0.75 }}>
              Full‑stack developer with a focus on practical, secure solutions.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <h2 style={{ margin: "0 0 8px" }}>Who I Am</h2>
            <p style={{ margin: "0 0 10px", lineHeight: 1.7, opacity: 0.85 }}>
              Hi, I'm Fabian Spiri, a passionate full-stack developer currently
              working at Swisscom, where I build robust frontend and backend
              solutions for challenging projects. I love exploring new
              technologies and continuously refining my skills to stay at the
              cutting edge of development.
            </p>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.85 }}>
              Outside of coding, I enjoy going to the gym and playing Souls-like
              games.
            </p>
          </div>

          <div
            style={{
              height: "1px",
              background: "var(--card-border)",
              width: "100%",
            }}
          />

          <div>
            <h2 style={{ margin: "0 0 8px" }}>What I Do</h2>
            <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.85 }}>
              As a full-stack developer at Swisscom, I work on complex projects
              ranging from cybersecurity and phishing detection to API
              development and database integration. I specialize in building
              scalable, secure, and user-friendly applications with modern
              technologies.
            </p>
          </div>

          <div
            style={{
              height: "1px",
              background: "var(--card-border)",
              width: "100%",
            }}
          />

          <div>
            <h2 style={{ margin: "0 0 12px" }}>Skills & Technologies</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                "React",
                "TypeScript",
                "JavaScript",
                "NestJS",
                "SQL",
                "Java",
                "Python",
                "HTML/CSS",
                "Node.js",
                "Git",
                "API Design",
                "Cybersecurity",
              ].map((skill) => (
                <span
                  key={skill}
                  style={{
                    border: "1px solid var(--chip-border)",
                    borderRadius: "999px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    background: "var(--chip-bg)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

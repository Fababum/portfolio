import { useState, useEffect, useRef } from "react";

const projects = [
  {
    title: "Abuse Team",
    date: "Aug 2024 – Feb 2025",
    description:
      "In the Abuse team at Swisscom Cyber Security, I gained many new skills in the areas of security and phishing and expanded my knowledge of Java and Python. I also learned how to detect spam effectively and how to design security measures to prevent it.",
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
    date: "Feb 2025 – Aug 2025",
    description:
      "In this project, I learned the fundamentals of several programming languages. It helped me develop a strong understanding of programming principles and provided essential foundational skills for my future work.",
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
    date: "Aug 2025 – Feb 2026",
    description:
      "Here, I was able to acquire many new skills, such as developing APIs with NestJS, connecting databases to projects, and learning Prisma. There is still much more to learn in this ongoing project.",
    tags: [
      "Full-Stack Development",
      "API Design",
      "NestJS",
      "Prisma ORM",
      "Database Integration",
      "React",
    ],
    isOngoing: true,
  },
];

function Home() {
  const [isLocked, setIsLocked] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [, setProgress] = useState(0);
  const [, setShowLockAnimation] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [, setTextFading] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showYouTubeMessage, setShowYouTubeMessage] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [titleShrunk, setTitleShrunk] = useState(false);
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (isLocked) return;

    setIsHovering(true);
    setProgress(0);

    // Clear any existing timer
    if (hoverTimer) {
      clearTimeout(hoverTimer);
    }

    // Set a new timer to lock after 2 seconds
    const timer = window.setTimeout(() => {
      setProgress(100);
      setShowLockAnimation(true);

      // Hide progress bar and lock animation after animation completes
      setTimeout(() => {
        setIsHovering(false);
        setIsLocked(true);
        setTimeout(() => {
          setShowLockAnimation(false);

          // Start text transition
          setTimeout(() => {
            setTextFading(true);
            setTimeout(() => {
              setShowWelcome(true);
              setTextFading(false);
              // Trigger explosion instantly when welcome text appears
              setShowExplosion(true);
              // Show YouTube message after explosion starts
              setTimeout(() => {
                setShowYouTubeMessage(true);
                // After 20 seconds, fade everything back to original
                setTimeout(() => {
                  setShowYouTubeMessage(false);
                  setTextFading(true);
                  setTimeout(() => {
                    setShowWelcome(false);
                    setTextFading(false);
                    setIsLocked(false); // Allow triggering again
                  }, 500);
                }, 20000);
              }, 500);

              // After explosion completes (2 seconds), just hide explosion effects
              setTimeout(() => {
                setShowExplosion(false);
                // Keep welcome text and locked state temporarily
              }, 2000);
            }, 500);
          }, 300);
        }, 100);
      }, 600);
    }, 2000);

    setHoverTimer(timer);

    // Animate progress bar
    const startTime = Date.now();
    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 2000) * 100, 100);
      setProgress(newProgress);

      if (elapsed < 2000) {
        requestAnimationFrame(animateProgress);
      }
    };
    requestAnimationFrame(animateProgress);
  };

  const handleMouseLeave = () => {
    if (isLocked) return;

    setIsHovering(false);
    setProgress(0);

    // Clear the timer if mouse leaves before locking
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;
        setShowProjects(shouldShow);
        setTitleShrunk(shouldShow);
      },
      { threshold: 0.6 },
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: "var(--text)",
        paddingBottom: "80px",
      }}
    >
      <div
        ref={heroRef}
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "14px",
          position: "relative",
          padding: "0 16px",
        }}
      >
        <h1
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            fontSize: titleShrunk ? "30px" : "72px",
            margin: titleShrunk ? "6px 0 0" : "0",
            transition:
              "font-size 420ms ease, margin 420ms ease, transform 420ms ease, opacity 420ms ease",
            transform: titleShrunk ? "translateY(-12px)" : "translateY(0)",
            opacity: 1,
            color: "var(--text)",
            textShadow: "var(--title-shadow)",
            letterSpacing: "0.6px",
          }}
        >
          {showWelcome ? "Welcome to my Website" : "Fabian's Portfolio Website"}
        </h1>
      </div>
      <button
        type="button"
        onClick={() => {
          if (projectsRef.current) {
            projectsRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }}
        aria-label="Scroll to projects"
        style={{
          position: "fixed",
          left: "50%",
          bottom: "20px",
          transform: "translateX(-50%)",
          border: "1px solid var(--arrow-border)",
          background: "var(--arrow-bg)",
          color: "var(--text)",
          borderRadius: "999px",
          padding: "8px 12px",
          cursor: "pointer",
          boxShadow: "var(--arrow-shadow)",
          opacity: showProjects ? 0 : 1,
          pointerEvents: showProjects ? "none" : "auto",
          transition: "opacity 240ms ease, transform 240ms ease",
          transform: showProjects
            ? "translateX(-50%) translateY(8px)"
            : "translateX(-50%)",
        }}
      >
        ↓
      </button>
      {isHovering && !isLocked && (
        <div>
          <div />
        </div>
      )}
      {showExplosion && (
        <>
          {[...Array(20)].map((_, i) => (
            <div key={i} />
          ))}
          <div />
          <div />
        </>
      )}
      {showYouTubeMessage && (
        <div>
          <p>Please Follow me!</p>
          <a
            href="https://www.youtube.com/@Fababum"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.youtube.com/@Fababum
          </a>
        </div>
      )}

      <div
        id="projects"
        ref={projectsRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "10px 16px 40px",
          color: "var(--text)",
          opacity: showProjects ? 1 : 0,
          transform: showProjects ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 420ms ease, transform 420ms ease",
          pointerEvents: showProjects ? "auto" : "none",
        }}
      >
        <h1 style={{ margin: "0 0 4px", color: "var(--text)" }}>My Projects</h1>
        <p style={{ margin: "0 0 10px", opacity: 0.75 }}>
          Meine Projekte, in denen ich aktuell arbeite oder gearbeitet habe.
        </p>
        <div
          style={{
            display: "grid",
            gap: "18px",
            width: "min(980px, 94%)",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              style={{
                border: "1px solid var(--card-border)",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "left",
                background: "var(--card-bg)",
                boxShadow: "var(--card-shadow)",
                transition: "transform 200ms ease, border-color 200ms ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <h2 style={{ margin: "6px 0", fontSize: "22px" }}>
                  {project.title}
                </h2>
                {project.isOngoing && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(77, 255, 154, 0.6)",
                      background: "rgba(77, 255, 154, 0.12)",
                      color: "#b8ffcf",
                      boxShadow: "0 0 12px rgba(77, 255, 154, 0.6)",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    ● Ongoing
                  </div>
                )}
              </div>
              <p style={{ margin: "4px 0", opacity: 0.75 }}>{project.date}</p>
              <p style={{ margin: "10px 0", lineHeight: 1.6 }}>
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "flex-start",
                }}
              >
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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
  const typedRole = useTypingEffect(ROLES);

  return (
    <div className="min-h-screen text-foreground">
      <div className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 pb-20 pt-16 overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "var(--hero-glow, rgba(99,102,241,0.08))", filter: "blur(100px)" }}
        />

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]" />
          Verfügbar für neue Projekte
        </div>

        {/* Name */}
        <h1 className="mb-4 text-foreground" style={{ textShadow: "var(--title-shadow)" }}>
          Fabian Spiri
        </h1>

        {/* Typed subtitle */}
        <p className="text-lg text-muted-foreground mb-5 min-h-[1.6em] font-medium tracking-tight">
          {typedRole}
          <span
            className="inline-block w-0.5 h-[1em] bg-primary ml-0.5 align-middle rounded-sm"
            style={{ animation: "blink 1s step-end infinite" }}
          />
        </p>

        {/* Bio */}
        <p className="max-w-md text-muted-foreground leading-7 mb-10 text-sm">
          Lernender Full-Stack-Entwickler bei{" "}
          <strong className="text-foreground font-semibold">Swisscom</strong>.
          Ich baue robuste Web-Applikationen mit modernen Technologien.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="#contact"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold transition-opacity hover:opacity-85"
          >
            Kontakt aufnehmen
          </a>
          <a
            href="#about"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium transition-colors",
              "border border-border bg-background text-foreground hover:bg-muted"
            )}
          >
            Mehr über mich
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import Reveal from "@/components/reveal/Reveal";

const ROLES = ["Full-Stack Developer", "Security Enthusiast"];

function useTypingEffect(words: string[], speed = 55, pause = 2600) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(words[0]);
      return;
    }
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
    <div className="relative min-h-[100svh] flex items-end text-foreground">
      {/* Local scrim behind the text column for legibility on bright photos */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full lg:w-[70%] pointer-events-none"
        style={{ background: "var(--hero-scrim)" }}
      />
      <div
        className="relative w-full mx-auto max-w-content pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-10 lg:gap-16 items-end"
        style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}
      >
        {/* Text block */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Fabian Spiri / Portfolio</p>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="text-hero font-medium text-foreground mb-6"
              style={{ textShadow: "var(--title-shadow)" }}
            >
              Applikations-
              <br />
              entwickler.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p
              className="text-base sm:text-lg text-muted-foreground mb-2 min-h-[1.6em] font-medium"
              style={{ textShadow: "var(--label-shadow)" }}
            >
              {typedRole}
              <span
                className="inline-block w-0.5 h-[1em] bg-white/60 ml-0.5 align-middle"
                style={{ animation: "blink 1.1s step-end infinite" }}
              />
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p
              className="max-w-md text-muted-foreground leading-7 text-sm sm:text-base mt-4 mb-8"
              style={{ textShadow: "var(--label-shadow)" }}
            >
              Lernender Full-Stack-Entwickler bei{" "}
              <strong className="text-foreground font-semibold">Swisscom</strong>, mit
              Fokus auf Cybersecurity. Ich baue robuste Web-Applikationen mit modernen
              Technologien.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex items-center gap-8 flex-wrap">
              <a
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
                style={{ textShadow: "var(--label-shadow)" }}
              >
                Kontakt aufnehmen
                <span className="inline-block transition-transform duration-200 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  →
                </span>
              </a>
              <a
                href="#about"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                style={{ textShadow: "var(--label-shadow)" }}
              >
                Mehr über mich
                <span className="inline-block transition-transform duration-200 ease-editorial group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Editorial portrait block */}
        <Reveal delay={200} className="hidden lg:block">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md ring-1 ring-white/10 shadow-2xl">
            <img
              src="/images/portraits/portrait-prom.jpg"
              alt="Fabian Spiri"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Home;

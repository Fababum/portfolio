import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/content";

const ROLES = ["Full-Stack Developer", "React & TypeScript", "APIs mit NestJS", "Host · Team Halo"];

function useTyping(words: string[], speed = 70, pause = 1600) {
  const [wordIdx, setWordIdx] = useState(0);
  const [len, setLen] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let t: number;
    if (!deleting && len < word.length) t = window.setTimeout(() => setLen(len + 1), speed);
    else if (!deleting) t = window.setTimeout(() => setDeleting(true), pause);
    else if (len > 0) t = window.setTimeout(() => setLen(len - 1), speed / 2);
    else {
      t = window.setTimeout(() => {
        setDeleting(false);
        setWordIdx((w) => (w + 1) % words.length);
      }, 0);
    }
    return () => clearTimeout(t);
  }, [len, deleting, wordIdx, words, speed, pause]);

  return words[wordIdx].slice(0, len);
}

function Home({ ready }: { ready: boolean }) {
  const typed = useTyping(ROLES);
  const [offset, setOffset] = useState(0);

  // leichter Parallax auf dem Hero-Bild
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(Math.min(window.scrollY, window.innerHeight)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const lineStyle = (delay: number) => ({
    transform: ready ? "none" : "translateY(110%)",
    transition: `transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  const fade = (delay: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(20px)",
    transition: `opacity 1s ease ${delay}ms, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  return (
    <div className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-cream">
      {/* Unscharfe Fläche als Hintergrund (füllt breite Screens) */}
      <img
        src="/images/portraits/profil_bild.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-125 blur-2xl opacity-40"
        style={{ objectPosition: "50% 40%" }}
      />

      {/* Titelbild: scharf, zoomt beim Laden rein und beim Scrollen weiter */}
      <div
        className="absolute inset-0 lg:left-auto lg:w-[58%] overflow-hidden lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_28%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_28%)]"
      >
        <div
          className="h-full w-full"
          style={{
            transform: `translateY(${offset * 0.25}px) scale(${1 + offset / 2500})`,
            transformOrigin: "50% 32%",
          }}
        >
          <img
            src="/images/portraits/profil_bild.jpg"
            alt="Fabian Spiri"
            fetchPriority="high"
            className="h-full w-full object-cover"
            style={{
              objectPosition: "50% 30%",
              transformOrigin: "50% 35%",
              animation: ready ? "hero-zoom-in 2.6s cubic-bezier(0.22, 1, 0.36, 1) both" : undefined,
              transform: ready ? undefined : "scale(1.35)",
            }}
          />
        </div>
      </div>

      {/* Abdunkeln für Lesbarkeit */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(19,21,15,0.6) 0%, rgba(19,21,15,0.25) 30%, rgba(19,21,15,0.55) 65%, rgba(19,21,15,0.98) 100%), linear-gradient(90deg, rgba(19,21,15,0.7) 0%, rgba(19,21,15,0.1) 60%)",
        }}
      />
      <div className="absolute inset-0 grain" />

      {/* Vertikaler Seitentext */}
      <div className="hidden md:block absolute left-[clamp(20px,4vw,64px)] top-1/2 z-10" style={fade(900)}>
        <p
          className="eyebrow text-cream/70"
          style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
        >
          Swisscom seit 2024
        </p>
      </div>

      {/* Inhalt */}
      <div className="relative z-10 container-x h-full flex flex-col justify-end pb-10 sm:pb-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <p className="eyebrow text-lime mb-4 flex items-center gap-2" style={fade(500)}>
              <span className="h-2 w-2 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
              Informatik Applikationsentwickler EFZ
            </p>
            <h1 className="font-display" style={{ fontSize: "clamp(4.5rem, 17vw, 17rem)" }}>
              <span className="line-mask"><span style={lineStyle(0)}>Fabian</span></span>
              <span className="line-mask"><span style={lineStyle(120)}>Spiri</span></span>
            </h1>
            <p className="font-sign text-lime text-3xl sm:text-5xl mt-3 min-h-[1.2em]" style={fade(700)}>
              {typed}
              <span className="inline-block w-[3px] h-[0.8em] bg-lime ml-1 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
            </p>
          </div>

          {/* "Next Race"-Karte */}
          <div style={fade(800)} className="w-full max-w-[320px] self-start lg:self-end">
          <button
            type="button"
            onClick={() => scrollToId("experience")}
            className="group text-left w-full rounded-2xl bg-cream/10 backdrop-blur-xl border border-cream/15 p-5 hover:bg-lime hover:text-ink transition-colors duration-500"
          >
            <p className="eyebrow opacity-70 mb-3">Aktuell</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-4xl">Team Halo</p>
                <p className="text-sm opacity-80 mt-1">Host · Swisscom</p>
              </div>
              <span className="grid place-items-center h-11 w-11 rounded-full bg-lime text-ink group-hover:bg-ink group-hover:text-lime transition-all duration-500 group-hover:-rotate-45">
                →
              </span>
            </div>
          </button>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-cream/15 pt-5" style={fade(1000)}>
          <p className="eyebrow text-cream/70">Zürich, Schweiz</p>
          <button
            type="button"
            onClick={() => scrollToId("about")}
            className="eyebrow flex items-center gap-3 text-cream/70 hover:text-lime transition-colors"
          >
            Scrollen
            <span className="relative block h-8 w-[1px] bg-cream/25 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-1/2 bg-lime" style={{ animation: "scroll-line 1.8s cubic-bezier(0.76,0,0.24,1) infinite" }} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

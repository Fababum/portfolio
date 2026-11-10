import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Magnetic from "@/components/ui/magnetic";
import Streams from "@/components/ui/streams";

const REAL_SRC = "/images/portraits/profil_bild_hd.jpg";
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

/**
 * Text, der exakt die volle Breite des Elternelements füllt (21st.dev "fit text").
 * Misst nach dem Laden der Schriften und bei jeder Grössenänderung neu.
 */
function FitLine({ text, base, animate, spot = false, className }: { text: string; base: number; animate: boolean; spot?: boolean; className?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i) return;
    const fit = () => {
      i.style.fontSize = "100px";
      const natural = i.scrollWidth;
      const avail = w.clientWidth;
      if (natural > 0 && avail > 0) {
        const px = (avail / natural) * 100 * 0.995;
        i.style.fontSize = `${px}px`;
        setSize(px);
      }
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(w);
    return () => ro.disconnect();
  }, [text]);

  return (
    <span ref={wrap} className="line-mask w-full">
      <span
        ref={inner}
        className={"relative block w-max whitespace-nowrap " + (className ?? "")}
        style={{ transform: "none", fontSize: size ? `${size}px` : "100px", visibility: size ? "visible" : "hidden" }}
      >
        {text.split("").map((c, i) =>
          animate ? (
            <span key={i} className="hero-char" style={{ "--d": `${base + i * 50}ms` } as CSSProperties}>
              {c === " " ? "\u00a0" : c}
            </span>
          ) : (
            <span key={i} className="inline-block">{c === " " ? "\u00a0" : c}</span>
          )
        )}
        {/* Lime-Kopie im selben Box-Kontext: gleiche Schriftgrösse, gleiche Position */}
        {spot && (
          <span
            aria-hidden="true"
            className="name-spot absolute inset-0 text-lime pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500"
            style={{ WebkitMaskImage: "linear-gradient(transparent, transparent)", maskImage: "linear-gradient(transparent, transparent)" }}
          >
            {text.split("").map((c, i) => (
              <span key={i} className="inline-block">{c === " " ? "\u00a0" : c}</span>
            ))}
          </span>
        )}
      </span>
    </span>
  );
}

function Name({ animate, spot }: { animate: boolean; spot: boolean }) {
  return (
    <>
      {/* Desktop: eine Zeile */}
      <span className="hidden sm:block">
        <FitLine text="Fabian Spiri" base={0} animate={animate} spot={spot} />
      </span>
      {/* Mobile: zwei Zeilen, jede volle Breite */}
      <span className="block sm:hidden">
        <FitLine text="Fabian" base={0} animate={animate} spot={spot} />
        <FitLine text="Spiri" base={200} animate={animate} spot={spot} />
      </span>
    </>
  );
}

function Home({ ready }: { ready: boolean }) {
  const typed = useTyping(ROLES);
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [offset, setOffset] = useState(0);
  const [spot, setSpot] = useState(false);

  // Parallax beim Scrollen
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

  // Lime-Spotlight im Namen: folgt der Maus mit derselben Verzögerung wie der Bild-Reveal
  useEffect(() => {
    const name = nameRef.current;
    if (!name) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = -9999, ty = -9999, x = -9999, y = -9999, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (x < -999) {
        x = tx;
        y = ty;
      }
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (tx < -999) return;
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      // Maske direkt auf der Lime-Kopie setzen (relativ zu genau diesem Element,
      // ohne CSS-Variablen, die manche Browser in mask-image nicht neu zeichnen)
      name.querySelectorAll<HTMLElement>(".name-spot").forEach((overlay) => {
        const r = overlay.getBoundingClientRect();
        if (!r.width) return;
        const m = `radial-gradient(150px circle at ${(x - r.left).toFixed(1)}px ${(y - r.top).toFixed(1)}px, #000 0%, #000 55%, transparent 100%)`;
        overlay.style.webkitMaskImage = m;
        overlay.style.maskImage = m;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    setSpot(true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const fade = (delay: number): CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(16px)",
    transition: `opacity 1s ease ${delay}ms, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });


  return (
    <div
      ref={rootRef}
      className={"group/hero relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-cream" + (ready ? " is-ready" : "")}
    >
      {/* Fullscreen-Foto */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.3}px) scale(${1 + offset / 3000})`, transformOrigin: "50% 30%" }}
      >
        <img
          src={REAL_SRC}
          alt="Fabian Spiri"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{
            objectPosition: "50% 28%",
            transform: ready ? "scale(1.04)" : "scale(1.3)",
            filter: ready ? "brightness(1)" : "brightness(0.3)",
            transition: "transform 3s cubic-bezier(0.22, 1, 0.36, 1), filter 2s ease",
          }}
        />
      </div>

      {/* Abdunkeln: oben für den Namen, unten für die Buttons */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(19,21,15,0.8) 0%, rgba(19,21,15,0.45) 25%, rgba(19,21,15,0) 48%, rgba(19,21,15,0) 70%, rgba(19,21,15,0.85) 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 grain" />
      {/* Grüne Lichtstreifen, weichen dem Cursor aus */}
      <Streams
        className="absolute inset-0 h-full w-full pointer-events-none mix-blend-screen transition-opacity duration-[2s]"
        count={9}
      />

      {/* Name oben */}
      <div className="absolute inset-x-0 top-[13%] sm:top-[12%] z-10">
        <div className="container-x">
          {/* Riesen-Name über dem Kopf */}
          <h1 ref={nameRef} className="relative font-display leading-[0.8]" style={{ transform: `translateY(${offset * 0.2}px)` }}>
            <span className="sr-only">Fabian Spiri</span>
            <span aria-hidden="true" className="block">
              <Name animate spot={spot && ready} />
            </span>
          </h1>
        </div>
      </div>

      {/* Inhalt unten */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x pb-5 sm:pb-8">
          {/* Meta-Zeile */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <p className="text-lg sm:text-2xl font-medium tracking-tight min-h-[1.5em]" style={fade(1000)}>
              <span className="text-lime font-mono mr-2">&gt;</span>
              {typed}
              <span className="inline-block w-[2px] h-[1em] bg-lime ml-1 align-[-0.15em]" style={{ animation: "blink 1s step-end infinite" }} />
            </p>
            <div className="flex items-center gap-5" style={fade(1150)}>
              <button
                type="button"
                onClick={() => scrollToId("skills")}
                className="eyebrow text-cream/80 hover:text-lime transition-colors link-line"
              >
                Skills anzeigen
              </button>
              <Magnetic>
                <button type="button" onClick={() => scrollToId("experience")} className="btn-pill btn-lime">
                  Projekte ansehen <span aria-hidden="true">→</span>
                </button>
              </Magnetic>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

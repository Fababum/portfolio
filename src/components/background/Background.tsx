import { useEffect, useRef, useState } from "react";

/**
 * Landschaftsfotos für die Hintergrund-Slideshow.
 * object-position ist pro Bild individuell gesetzt, damit der
 * jeweils interessanteste Bildausschnitt sichtbar bleibt.
 */
const IMAGES: { src: string; position: string }[] = [
  { src: "/images/landscapes/landscape-mountain-lake.jpg", position: "50% 55%" },
  { src: "/images/landscapes/landscape-ocean-sunset.jpg", position: "50% 60%" },
  { src: "/images/landscapes/landscape-garden-ruins.jpg", position: "50% 40%" },
  { src: "/images/landscapes/landscape-peak-sun.jpg", position: "50% 55%" },
  { src: "/images/landscapes/landscape-ridge.jpg", position: "50% 45%" },
  { src: "/images/landscapes/landscape-night-beach.jpg", position: "50% 65%" },
  { src: "/images/landscapes/landscape-cove.jpg", position: "50% 50%" },
];

const INTERVAL_MS = 9000;
const FADE_MS = 1600;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function Background() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (IMAGES.length < 2) return;
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (IMAGES.length === 0) {
    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(160deg, var(--bg-fallback-1), var(--bg-fallback-2))",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--bg-fallback-1), var(--bg-fallback-2))" }}
    >
      {IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: i === index ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        >
          <img
            src={img.src}
            alt=""
            className={cnKen(i === index, reducedMotion)}
            style={{ objectPosition: img.position }}
            loading="eager"
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      {/* Flat, even dimmer across the whole photo, moderate so it stays vivid */}
      <div className="absolute inset-0" style={{ background: "var(--bg-flat-dim)" }} />
      {/* Top gradient: readability for nav */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, var(--bg-overlay-top), transparent)" }}
      />
      {/* Bottom gradient: readability for footer/content edges */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{ background: "linear-gradient(to top, var(--bg-overlay-bottom), transparent)" }}
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 40%, transparent 30%, var(--bg-vignette) 100%)",
        }}
      />
    </div>
  );
}

function cnKen(active: boolean, reducedMotion: boolean) {
  const base = "h-full w-full object-cover";
  if (reducedMotion || !active) return base;
  return base + " kenburns";
}

export default Background;

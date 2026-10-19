import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { photos } from "@/lib/content";

type Item =
  | { kind: "photo"; index: number }
  | { kind: "quote"; text: string; dark?: boolean };

// Fotos mit eingestreuten Zitaten, wie die Horizontal-Galerie auf landonorris.com
const items: Item[] = [
  { kind: "photo", index: 0 },
  { kind: "photo", index: 1 },
  { kind: "quote", text: "Es zählt nicht, wo du startest, sondern wie du dich von dort aus entwickelst." },
  { kind: "photo", index: 2 },
  { kind: "photo", index: 3 },
  { kind: "photo", index: 4 },
  { kind: "quote", text: "Die besten Ideen kommen mir nicht am Bildschirm, sondern unterwegs.", dark: true },
  { kind: "photo", index: 5 },
  { kind: "photo", index: 6 },
  { kind: "photo", index: 7 },
  { kind: "photo", index: 8 },
  { kind: "photo", index: 9 },
  { kind: "photo", index: 10 },
];

function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [x, setX] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pinned, setPinned] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Strecke messen, die horizontal gescrollt werden muss
  useLayoutEffect(() => {
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned(desktop && !reduced);
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!pinned) {
      setX(0);
      return;
    }
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress(p);
      setX(-p * distance);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, distance]);

  const next = useCallback(() => setLightbox((i) => (i === null ? i : (i + 1) % photos.length)), []);
  const prev = useCallback(() => setLightbox((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [lightbox, next, prev]);

  const heights = ["h-[62vh]", "h-[48vh]", "h-[56vh]", "h-[44vh]", "h-[60vh]"];

  return (
    <div
      ref={sectionRef}
      className="relative bg-cream text-ink"
      style={{ height: pinned ? `calc(100vh + ${distance}px)` : undefined }}
    >
      <div className={pinned ? "sticky top-0 h-screen overflow-hidden flex flex-col justify-center" : "py-24"}>
        <div className="container-x flex items-end justify-between gap-6 mb-8">
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}>
            Momente <span className="text-outline">abseits</span>
          </h2>
          <p className="eyebrow text-[var(--muted-light)] hidden sm:block tabular-nums">
            {String(Math.round(progress * 100)).padStart(2, "0")} / 100
          </p>
        </div>

        <div
          ref={trackRef}
          className={
            "flex items-center gap-5 sm:gap-8 px-[clamp(20px,4vw,64px)] " +
            (pinned ? "w-max" : "w-full overflow-x-auto snap-x snap-mandatory pb-4")
          }
          style={pinned ? { transform: `translate3d(${x}px,0,0)`, willChange: "transform" } : undefined}
        >
          {items.map((item, i) => {
            if (item.kind === "quote") {
              return (
                <div
                  key={`q${i}`}
                  className={
                    "snap-center shrink-0 w-[78vw] sm:w-[34vw] max-w-[460px] h-[44vh] min-h-[300px] rounded-3xl p-8 flex flex-col justify-between " +
                    (item.dark ? "bg-olive text-cream" : "bg-lime text-ink")
                  }
                >
                  <span className="font-display text-6xl leading-none">“</span>
                  <p className="text-2xl sm:text-3xl font-medium leading-tight tracking-tight">{item.text}</p>
                  <p className="font-sign text-3xl">Fabian</p>
                </div>
              );
            }
            const photo = photos[item.index];
            return (
              <figure key={photo.src} className="snap-center shrink-0 group">
                <p className="eyebrow text-[var(--muted-light)] mb-3">{photo.caption}</p>
                <button
                  type="button"
                  onClick={() => setLightbox(item.index)}
                  aria-label={`${photo.alt} vergrössern`}
                  className={"block overflow-hidden rounded-3xl cursor-zoom-in min-h-[260px] max-w-[80vw] " + heights[i % heights.length]}
                  style={{ aspectRatio: i % 3 === 0 ? "4 / 5" : "3 / 4" }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                    style={{ objectPosition: photo.position, transitionTimingFunction: "var(--ease)" }}
                  />
                </button>
              </figure>
            );
          })}
        </div>

        {pinned && (
          <div className="container-x mt-8">
            <div className="h-[2px] w-full bg-[var(--line-light)] rounded-full overflow-hidden">
              <div className="h-full bg-ink origin-left" style={{ transform: `scaleX(${progress})` }} />
            </div>
          </div>
        )}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm flex items-center justify-center text-cream"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={() => setLightbox(null)}
        >
          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].alt}
            className="max-h-[82vh] max-w-[88vw] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" aria-label="Schliessen" onClick={() => setLightbox(null)} className="absolute top-6 right-6 h-12 w-12 rounded-full bg-cream text-ink text-2xl grid place-items-center hover:bg-lime transition-colors">×</button>
          <button type="button" aria-label="Vorheriges Bild" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 sm:left-8 h-12 w-12 rounded-full border border-cream/30 grid place-items-center hover:bg-lime hover:text-ink hover:border-lime transition-colors">←</button>
          <button type="button" aria-label="Nächstes Bild" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 sm:right-8 h-12 w-12 rounded-full border border-cream/30 grid place-items-center hover:bg-lime hover:text-ink hover:border-lime transition-colors">→</button>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 eyebrow text-cream/70">
            {photos[lightbox].caption} · {String(lightbox + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}

export default Gallery;

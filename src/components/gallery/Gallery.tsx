import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/reveal/Reveal";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type Category = "landscape" | "people";

const allPhotos: { src: string; alt: string; category: Category; position: string }[] = [
  { src: "/images/portraits/portrait-hiking.jpg", alt: "Fabian beim Wandern in den Bergen", category: "people", position: "50% 25%" },
  { src: "/images/landscapes/landscape-ridge.jpg", alt: "Felsgrat in den Alpen", category: "landscape", position: "50% 45%" },
  { src: "/images/dog/dog-face.jpg", alt: "Nahaufnahme meines Hundes", category: "people", position: "50% 40%" },
  { src: "/images/landscapes/landscape-ocean-sunset.jpg", alt: "Sonnenuntergang über dem Meer", category: "landscape", position: "50% 60%" },
  { src: "/images/portraits/portrait-prom.jpg", alt: "Fabian am Abschlussball", category: "people", position: "50% 15%" },
  { src: "/images/landscapes/landscape-cove.jpg", alt: "Türkise Felsbucht am Meer", category: "landscape", position: "50% 50%" },
  { src: "/images/dog/dog-hand.jpg", alt: "Mein Hund", category: "people", position: "50% 35%" },
  { src: "/images/landscapes/landscape-garden-ruins.jpg", alt: "Gartenruine mit Blumen", category: "landscape", position: "50% 40%" },
  { src: "/images/portraits/portrait-night.jpg", alt: "Fabian bei Nacht", category: "people", position: "50% 20%" },
  { src: "/images/landscapes/landscape-night-beach.jpg", alt: "Nachtstrand mit Mond", category: "landscape", position: "50% 65%" },
  { src: "/images/landscapes/landscape-peak-sun.jpg", alt: "Bergspitze mit Sonne", category: "landscape", position: "50% 55%" },
  { src: "/images/landscapes/landscape-mountain-lake.jpg", alt: "Bergsee-Panorama", category: "landscape", position: "50% 55%" },
];

const filters: { key: "all" | Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "landscape", label: "Landscape" },
  { key: "people", label: "People" },
];

const DRAG_THRESHOLD = 64;

function shortestOffset(i: number, active: number, n: number) {
  let diff = i - active;
  if (diff > n / 2) diff -= n;
  if (diff < -n / 2) diff += n;
  return diff;
}

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

function Gallery() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const photos = filter === "all" ? allPhotos : allPhotos.filter((p) => p.category === filter);
  const n = photos.length;

  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.4);

  const dragState = useRef<{ startX: number; dragging: boolean }>({ startX: 0, dragging: false });
  const [dragX, setDragX] = useState(0);

  const goNext = useCallback(() => setActive((a) => (a + 1) % n), [n]);
  const goPrev = useCallback(() => setActive((a) => (a - 1 + n) % n), [n]);

  useEffect(() => {
    setActive(0);
  }, [filter]);

  // Keyboard navigation, only while the section is in view
  useEffect(() => {
    if (!sectionVisible || lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sectionVisible, lightboxOpen, goNext, goPrev]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goNext, goPrev]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = { startX: e.clientX, dragging: true };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    setDragX(e.clientX - dragState.current.startX);
  };
  const endDrag = () => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    if (dragX <= -DRAG_THRESHOLD) goNext();
    else if (dragX >= DRAG_THRESHOLD) goPrev();
    setDragX(0);
  };

  const transitionStyle = reducedMotion
    ? "transform 150ms ease, opacity 150ms ease"
    : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease";

  return (
    <div ref={sectionRef} className="surface-section text-foreground overflow-hidden" style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}>
      <span className="watermark" aria-hidden="true">06</span>
      <div className="relative z-10 mx-auto max-w-content" style={{ paddingBlock: "clamp(64px, 10vw, 140px)" }}>
        <Reveal>
          <p className="eyebrow mb-4">Momente / 06</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="text-display font-medium mb-8">Momente.</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted-foreground leading-7 max-w-lg mb-10" style={{ textShadow: "var(--label-shadow)" }}>
            Ein paar Momente ausserhalb des Codes.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="flex items-center gap-6 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "text-sm pb-1 border-b transition-colors",
                  filter === f.key
                    ? "text-foreground border-foreground"
                    : "text-level4 border-transparent hover:text-foreground"
                )}
                style={{ textShadow: "var(--label-shadow)" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stage */}
        <Reveal delay={180}>
          <div
            className="relative select-none touch-pan-y overflow-hidden rounded-2xl ring-1"
            style={{
              perspective: "1200px",
              height: "min(62vw, 560px)",
              background: "var(--stage-panel)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              borderColor: "var(--stage-ring)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onPointerCancel={endDrag}
          >
            {/* Subtle stage scrim on top of the solid panel */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,0,0,0.08), rgba(0,0,0,0.28))",
              }}
            />

            {photos.map((photo, i) => {
              const offset = shortestOffset(i, active, n);
              const isActive = offset === 0;
              const clamped = Math.max(-2, Math.min(2, offset));
              const dragPct = (dragX / (typeof window !== "undefined" ? window.innerWidth : 1000)) * 100;

              let translateX = 0;
              let translateZ = 0;
              let scale = 1;
              let rotateY = 0;
              let opacity = 1;
              let zIndex = 30;
              let filterCss = "none";

              if (clamped === -1) {
                translateX = -48;
                translateZ = -120;
                scale = 0.7;
                rotateY = reducedMotion ? 0 : 1.5;
                opacity = 0.32;
                zIndex = 20;
                filterCss = "brightness(0.6) saturate(0.7)";
              } else if (clamped === 1) {
                translateX = 48;
                translateZ = -120;
                scale = 0.7;
                rotateY = reducedMotion ? 0 : -1.5;
                opacity = 0.32;
                zIndex = 20;
                filterCss = "brightness(0.6) saturate(0.7)";
              } else if (clamped === -2) {
                translateX = -85;
                translateZ = -220;
                scale = 0.55;
                opacity = 0;
                zIndex = 10;
                filterCss = "brightness(0.5)";
              } else if (clamped === 2) {
                translateX = 85;
                translateZ = -220;
                scale = 0.55;
                opacity = 0;
                zIndex = 10;
                filterCss = "brightness(0.5)";
              }

              return (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={isActive ? "Bild vergrössern" : offset < 0 ? "Vorheriges Bild" : "Nächstes Bild"}
                  aria-hidden={!isActive && Math.abs(clamped) >= 2}
                  tabIndex={isActive || Math.abs(clamped) === 1 ? 0 : -1}
                  onClick={() => {
                    if (isActive) setLightboxOpen(true);
                    else if (offset < 0) goPrev();
                    else goNext();
                  }}
                  className="absolute top-1/2 left-1/2 w-[86vw] sm:w-[74vw] lg:w-[60vw] max-w-[1000px]"
                  style={{
                    aspectRatio: "16 / 10",
                    pointerEvents: Math.abs(clamped) > 1 ? "none" : "auto",
                    transform: `translate(-50%, -50%) translateX(calc(${translateX}% + ${dragPct * (isActive ? 1 : 0.4)}%)) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    filter: filterCss,
                    zIndex,
                    transition: dragState.current.dragging ? "none" : transitionStyle,
                    willChange: Math.abs(clamped) <= 1 ? "transform, opacity" : undefined,
                    cursor: isActive ? "zoom-in" : "pointer",
                  }}
                >
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      borderRadius: "10px",
                      boxShadow: isActive
                        ? "0 30px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.15)"
                        : "none",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={Math.abs(clamped) <= 1 ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Controls: arrows + counter */}
        <Reveal delay={220}>
          <div className="flex items-center justify-center gap-8 mt-8" style={{ filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.35))" }}>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Vorheriges Bild"
              className="group text-level4 hover:text-foreground transition-colors"
              style={{ opacity: 0.7 }}
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 ease-editorial group-hover:-translate-x-0.5" />
            </button>
            <p className="text-xs font-mono tabular-nums" style={{ color: "var(--foreground-subtle)" }}>
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={goNext}
              aria-label="Nächstes Bild"
              className="group text-level4 hover:text-foreground transition-colors"
              style={{ opacity: 0.7 }}
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5" />
            </button>
          </div>
        </Reveal>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/92 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Schliessen"
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none z-10"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Vorheriges Bild"
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white text-3xl px-3 py-4 z-10"
          >
            ‹
          </button>
          <img
            src={photos[active].src}
            alt={photos[active].alt}
            className="max-h-[85vh] max-w-[88vw] object-contain"
            style={{ borderRadius: "10px" }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Nächstes Bild"
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white text-3xl px-3 py-4 z-10"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

import { useEffect, useRef, useState } from "react";

/** Lime-Cursor (nur Desktop mit Maus) + Scroll-Fortschrittsbalken oben. */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  // Scroll-Fortschritt
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
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
  }, []);

  // Cursor mit weichem Nachziehen
  useEffect(() => {
    if (!enabled) return;
    let x = -100, y = -100, cx = -100, cy = -100, scale = 1, target = 1, raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as Element | null;
      target = el?.closest("a, button, [role='button']") ? 3.2 : 1;
    };
    const onLeave = () => { x = -100; y = -100; };
    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      scale += (target - scale) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return (
    <>
      <div aria-hidden="true" className="fixed top-0 inset-x-0 z-[90] h-[3px] pointer-events-none">
        <div ref={bar} className="h-full bg-lime origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
      {enabled && (
        <div
          ref={dot}
          aria-hidden="true"
          className="fixed top-0 left-0 z-[95] h-3 w-3 rounded-full bg-lime/80 border border-ink/40 pointer-events-none"
          style={{ transform: "translate3d(-100px,-100px,0)" }}
        />
      )}
    </>
  );
}

export default Cursor;

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic-Wrapper (21st.dev Stil): das Kind wird sanft zum Mauszeiger gezogen.
 * Nur aktiv bei feinem Zeiger (Maus) und ohne reduced motion.
 */
function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transition = "transform 0.2s ease-out";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onLeave = () => {
      el.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "translate3d(0, 0, 0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}

export default Magnetic;

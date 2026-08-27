import { useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-reveal hook via IntersectionObserver.
 * Returns a ref to attach and a boolean for the "is-visible" state.
 * Respects prefers-reduced-motion automatically (CSS handles the no-op).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

import { useEffect, useState } from "react";

/** Intro-Loader: Zähler 0–100, danach gleitet der Vorhang nach oben. */
function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.classList.add("is-locked");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 1 : 1600;
    const start = performance.now();
    let raf = 0;
    let t1 = 0;
    let t2 = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        t1 = window.setTimeout(() => {
          setLeaving(true);
          document.body.classList.remove("is-locked");
          onDone();
        }, reduced ? 0 : 250);
        t2 = window.setTimeout(() => setGone(true), reduced ? 0 : 1300);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.classList.remove("is-locked");
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-olive text-cream p-6 sm:p-10"
      style={{
        transform: leaving ? "translateY(-100%)" : "none",
        borderBottomLeftRadius: leaving ? "50% 20%" : 0,
        borderBottomRightRadius: leaving ? "50% 20%" : 0,
        transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1), border-radius 1s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div className="flex items-center justify-between eyebrow text-[var(--muted-dark)]">
        <span>Fabian Spiri</span>
        <span>Portfolio © {new Date().getFullYear()}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="font-sign text-lime text-4xl sm:text-6xl -rotate-6">Load Spiri</p>
        <p className="font-display text-lime tabular-nums" style={{ fontSize: "clamp(6rem, 22vw, 20rem)" }}>
          {count}
        </p>
      </div>

      <div className="h-[3px] w-full bg-[var(--line-dark)] overflow-hidden rounded-full">
        <div className="h-full bg-lime" style={{ width: `${count}%` }} />
      </div>
    </div>
  );
}

export default Loader;

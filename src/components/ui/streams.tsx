import { useEffect, useRef } from "react";

/**
 * Lichtstreifen ("streams"), die dezent durch den Hero ziehen.
 * In der Nähe des Mauszeigers weichen sie aus. Wenige, dünne Linien,
 * damit es ruhig bleibt. Pausiert, wenn nicht sichtbar.
 */
function Streams({ className, count = 9 }: { className?: string; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };

    type Stream = {
      x: number;
      baseY: number;
      speed: number;
      amp: number;
      freq: number;
      phase: number;
      offset: number; // aktuelle Ausweich-Verschiebung
      len: number;
      alpha: number;
      trail: { x: number; y: number }[];
    };
    let streams: Stream[] = [];

    const spawn = (s?: Stream, initial = false): Stream => {
      const n: Stream = s ?? ({ trail: [] } as unknown as Stream);
      n.x = initial ? Math.random() * w : -Math.random() * w * 0.4;
      n.baseY = h * (0.08 + Math.random() * 0.84);
      n.speed = (1.2 + Math.random() * 1.8) * dpr;
      n.amp = (10 + Math.random() * 30) * dpr;
      n.freq = 0.002 + Math.random() * 0.003;
      n.phase = Math.random() * Math.PI * 2;
      n.offset = 0;
      n.len = Math.round(40 + Math.random() * 50);
      n.alpha = 0.25 + Math.random() * 0.35;
      n.trail = [];
      return n;
    };

    const resize = () => {
      w = Math.round(canvas.offsetWidth * dpr);
      h = Math.round(canvas.offsetHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      const c = window.innerWidth < 640 ? Math.ceil(count * 0.6) : count;
      streams = Array.from({ length: c }, () => spawn(undefined, true));
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * w;
      mouse.y = ((e.clientY - r.top) / r.height) * h;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const RADIUS = 150;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";

      for (const s of streams) {
        s.x += s.speed;
        const waveY = s.baseY + Math.sin(s.x * s.freq + s.phase) * s.amp;

        // Ausweichen: vom Cursor wegdrücken, sonst sanft zurück
        const rad = RADIUS * dpr;
        const dx = s.x - mouse.x;
        const dy = waveY + s.offset - mouse.y;
        const d = Math.hypot(dx, dy);
        let target = 0;
        if (d < rad) {
          const push = (1 - d / rad) * rad * 0.9;
          target = s.offset + (dy >= 0 ? push : -push) * 0.35;
        }
        s.offset += (target - s.offset) * (d < rad ? 0.25 : 0.04);

        s.trail.push({ x: s.x, y: waveY + s.offset });
        if (s.trail.length > s.len) s.trail.shift();

        // Streifen zeichnen: Kopf hell, Schweif verblasst
        const t = s.trail;
        for (let i = 1; i < t.length; i++) {
          const k = i / t.length;
          ctx.strokeStyle = `rgba(210, 255, 0, ${(k * k * s.alpha).toFixed(3)})`;
          ctx.lineWidth = (0.6 + k * 1.4) * dpr;
          ctx.beginPath();
          ctx.moveTo(t[i - 1].x, t[i - 1].y);
          ctx.lineTo(t[i].x, t[i].y);
          ctx.stroke();
        }
        // Leuchtender Kopf
        const head = t[t.length - 1];
        if (head) {
          const g = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 8 * dpr);
          g.addColorStop(0, `rgba(210, 255, 0, ${s.alpha})`);
          g.addColorStop(1, "rgba(210, 255, 0, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(head.x, head.y, 8 * dpr, 0, Math.PI * 2);
          ctx.fill();
        }

        if (t.length && t[0].x > w + 20) spawn(s);
      }
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [count]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

export default Streams;

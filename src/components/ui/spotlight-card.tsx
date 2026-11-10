import { useRef, type CSSProperties, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight-/Glow-Card im Stil von 21st.dev:
 * Ein weicher Lichtkegel und ein leuchtender Rand folgen dem Mauszeiger.
 * Rein CSS-basiert (Custom Properties), keine Re-Renders beim Bewegen.
 */
function SpotlightCard({
  className,
  children,
  glow = "rgba(210, 255, 0, 0.16)",
  border = "rgba(210, 255, 0, 0.75)",
  size = 360,
  onPointerMove,
  ...props
}: HTMLAttributes<HTMLDivElement> & { glow?: string; border?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    onPointerMove?.(e);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={cn("spotlight group/spot relative", className)}
      style={
        {
          "--spot-glow": glow,
          "--spot-border": border,
          "--spot-size": `${size}px`,
        } as CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

export default SpotlightCard;

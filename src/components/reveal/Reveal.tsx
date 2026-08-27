import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  const style: CSSProperties & Record<string, string> = { "--reveal-delay": `${delay}ms` };
  return (
    <div ref={ref} className={cn("reveal", visible && "is-visible", className)} style={style}>
      {children}
    </div>
  );
}

export default Reveal;

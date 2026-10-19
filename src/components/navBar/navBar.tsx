import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EMAIL, navItems, scrollToId, socials } from "@/lib/content";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav beim Runterscrollen ausblenden, beim Hochscrollen zeigen
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 200);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // kurz warten, bis Body-Lock aufgehoben ist
    window.setTimeout(() => scrollToId(id), 50);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-transform duration-500",
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        )}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <div className="container-x flex items-center justify-between h-20">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); go("home"); }}
            aria-label="Zur Startseite"
            className={cn(
              "grid place-items-center h-12 w-12 rounded-full font-display text-xl transition-colors duration-300",
              scrolled || open ? "bg-lime text-ink" : "bg-cream/10 text-cream backdrop-blur-md"
            )}
          >
            FS
          </a>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="btn-pill btn-lime hidden sm:inline-flex"
            >
              Kontakt
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              className="relative h-12 w-12 rounded-full bg-cream text-ink grid place-items-center transition-transform duration-300 hover:scale-105"
            >
              <span
                className="absolute h-[2px] w-5 bg-current transition-transform duration-500"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)", transitionTimingFunction: "var(--ease)" }}
              />
              <span
                className="absolute h-[2px] w-5 bg-current transition-transform duration-500"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)", transitionTimingFunction: "var(--ease)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen-Menü */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn("fixed inset-0 z-40 bg-olive text-cream grain", open ? "pointer-events-auto" : "pointer-events-none")}
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="container-x h-full grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 pt-28 pb-10">
          <nav className="flex flex-col justify-center" aria-label="Hauptnavigation">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => { e.preventDefault(); go(item.id); }}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                className="group flex items-baseline gap-4 overflow-hidden"
              >
                <span className="eyebrow text-lime w-8 shrink-0">0{i + 1}</span>
                <span
                  className="font-display block transition-all duration-700 group-hover:text-lime group-hover:translate-x-3"
                  style={{
                    fontSize: "clamp(3rem, 9vw, 7.5rem)",
                    transform: open ? undefined : "translateY(110%)",
                    transitionDelay: open ? `${150 + i * 70}ms` : "0ms",
                    transitionTimingFunction: "var(--ease)",
                  }}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex flex-col justify-center">
            <div className="relative aspect-[4/5] w-full max-w-md ml-auto overflow-hidden rounded-3xl">
              {navItems.map((item, i) => (
                <img
                  key={item.id}
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scale(1)" : "scale(1.12)",
                    transitionTimingFunction: "var(--ease)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[var(--line-dark)] pt-6">
            <p className="eyebrow text-[var(--muted-dark)]">Swisscom seit 2024</p>
            <div className="flex flex-wrap gap-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  className="eyebrow link-line hover:text-lime transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;

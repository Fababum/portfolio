import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "#home", label: "Home" },
  { to: "#about", label: "About" },
  { to: "#gallery", label: "Momente" },
  { to: "#contact", label: "Contact" },
];

function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-light", !isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.to.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    const id = to.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled && "backdrop-blur-md"
        )}
        style={{ background: scrolled ? "var(--nav-bg)" : "var(--nav-top-scrim)" }}
        aria-label="Primary"
      >
        <div
          className="mx-auto flex max-w-content items-center justify-between h-16 sm:h-[68px]"
          style={{ paddingInline: "clamp(20px, 4vw, 64px)" }}
        >
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="text-sm font-semibold tracking-tight text-foreground"
            style={{ textShadow: "var(--label-shadow)" }}
          >
            Fabian Spiri
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => {
              const id = item.to.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={(e) => handleNavClick(e, item.to)}
                  className={cn(
                    "relative text-sm font-medium py-1 transition-colors",
                    isActive ? "text-foreground" : "text-level4 hover:text-level2"
                  )}
                  style={{ textShadow: "var(--label-shadow)" }}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-px bg-foreground transition-all duration-300",
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </a>
              );
            })}
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-level4 hover:text-foreground transition-colors"
              style={{ textShadow: "var(--label-shadow)" }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden flex items-center justify-center h-11 w-11 -mr-2 text-foreground"
            style={{ textShadow: "var(--label-shadow)" }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 sm:hidden transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex flex-col items-start justify-center h-full gap-2 px-8">
          {navItems.map((item, i) => {
            const id = item.to.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => handleNavClick(e, item.to)}
                className={cn(
                  "text-4xl font-semibold tracking-tight py-2 transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {item.label}
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-8 flex items-center gap-2 text-sm text-level2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Helles Theme" : "Dunkles Theme"}
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;

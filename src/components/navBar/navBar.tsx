import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Moon, Home, User, Mail, MessageSquare, Calendar, FolderOpen } from "lucide-react";

const navItems = [
  { to: "#home",       label: "Home",       icon: Home },
  { to: "#projects",   label: "Projekte",   icon: FolderOpen },
  { to: "#about",      label: "About",      icon: User },
  { to: "#contact",    label: "Contact",    icon: Mail },
  { to: "#chat",       label: "Chat",       icon: MessageSquare },
  { to: "#calendarai", label: "CalendarAI", icon: Calendar },
];

function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("home");

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    const id = to.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 flex justify-center px-4 py-3 pointer-events-none">
      <div
        className="pointer-events-auto flex items-center gap-1 px-2 py-1.5 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-lg"
        role="navigation"
        aria-label="Primary"
      >
        {navItems.map((item) => {
          const id = item.to.replace("#", "");
          const isActive = activeSection === id;
          const Icon = item.icon;
          return (
            <a
              key={item.to}
              href={item.to}
              onClick={(e) => handleNavClick(e, item.to)}
              className={cn(
                "group flex items-center gap-2 px-2.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 select-none",
                "text-muted-foreground hover:text-foreground hover:bg-muted",
                isActive && "text-foreground bg-muted"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span
                className={cn(
                  "overflow-hidden whitespace-nowrap transition-all duration-200",
                  "max-w-0 opacity-0 group-hover:max-w-[80px] group-hover:opacity-100",
                  isActive && "max-w-[80px] opacity-100"
                )}
              >
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="ml-1 pl-1 border-l border-border/60">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

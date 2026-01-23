import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./navBar.css";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 10v9h5v-6h4v6h5v-9" />
      </svg>
    ),
  },
  {
    to: "/about",
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
      </svg>
    ),
  },
  {
    to: "/contact",
    label: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="m4 8 8 5 8-5" />
      </svg>
    ),
  },
  {
    to: "/chatBot",
    label: "Chat",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    to: "/calendarai",
    label: "CalendarAI",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    ),
  },
];

function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="navBar">
      <div className="navLinks" role="navigation" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "navLink active" : "navLink"
            }
          >
            <span className="navIcon">{item.icon}</span>
            <span className="navLabel">{item.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className="navLink themeToggle"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="navIcon" aria-hidden="true">
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

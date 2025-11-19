import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./navBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navBar">
      <button
        className={`hamburger ${isMenuOpen ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`navLinks ${isMenuOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Contact
        </NavLink>
        <NavLink
          to="/chatBot"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          Chat Bot
        </NavLink>
        <NavLink
          to="/calendarai"
          className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
          onClick={closeMenu}
        >
          CalendarAI
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;

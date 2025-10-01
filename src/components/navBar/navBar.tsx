import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navBar">
      <NavLink
        to="/"
        className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
      >
        About
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
      >
        Projects
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
      >
        Contact
      </NavLink>
      <NavLink
        to="/chatBot"
        className={({ isActive }) => "navLink " + (isActive ? "active" : "")}
      >
        Chat Bot
      </NavLink>
    </nav>
  );
}

export default NavBar;

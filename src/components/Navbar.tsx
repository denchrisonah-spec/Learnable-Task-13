import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <span className="nav-brand">User<span>Hub</span></span>
      <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
        Directory
      </NavLink>
      <button className="nav-add-btn" onClick={() => navigate("/add-user")}>
        + New User
      </button>
    </nav>
  );
}

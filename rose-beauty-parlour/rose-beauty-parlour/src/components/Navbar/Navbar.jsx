import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaSpa } from "react-icons/fa";

function Navbar() {
  return (
    <header className="premium-navbar">
      <div className="navbar-container">

        {/* Brand Logo with Luxury Icon */}
        <Link to="/" className="navbar-logo">
          <FaSpa className="logo-icon-sparkle" />
          <span className="logo-brand-text">Rose Beauty Salon</span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="navbar-nav-menu">
          <ul className="nav-links-list">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>About</NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>Services</NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>Gallery</NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link-item active" : "nav-link-item"}>Products</NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Call-To-Action Button */}
        <div className="navbar-action-area">
          <Link to="/page/BookForm" style={{ textDecoration: 'none' }}>
            <button className="navbar-book-btn">
              Book Now
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/auth") {
    return null;
  }

  // Helper to close menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" style={{ textDecoration: "none" }} to="/portal" onClick={closeMenu}>
          FILM.
        </Link>
        
        {/* MANUAL TOGGLE BUTTON */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)} // Toggles state
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* DYNAMIC CLASS: Adds 'show' to the collapse div if isOpen is true */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/portal" onClick={closeMenu}>Discover</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections" onClick={closeMenu}>Collections</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews" onClick={closeMenu}>Reviews</Link>
            </li>
            
            <li className="nav-item ms-lg-3">
              {currentUser ? (
                <button 
                  className="btn btn-outline-danger btn-sm mt-1" 
                  onClick={() => { onLogout(); closeMenu(); }}
                >
                  Logout
                </button>
              ) : (
                <Link className="btn btn-outline-light btn-sm mt-1" to="/auth" onClick={closeMenu}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

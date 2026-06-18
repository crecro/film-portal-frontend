import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === "/auth") {
    return null;
  }

  const closeMenu = () => setIsOpen(false);

  return (
    // ADDED sticky-top HERE, plus a zIndex so it stays above the film images
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style={{ zIndex: 1050, borderBottom: "1px solid #333" }}>
      <div className="container-fluid px-5">
        <Link className="navbar-brand" style={{ textDecoration: "none" }} to="/portal" onClick={closeMenu}>
          FILM.
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

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

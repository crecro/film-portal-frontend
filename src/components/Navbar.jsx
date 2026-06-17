import { Link, useLocation } from "react-router-dom";

// We add { currentUser, onLogout } as props to make the navbar dynamic
function Navbar({ currentUser, onLogout }) {
  const location = useLocation();

  // Hide the Navbar ONLY when the user is on the Login/Register page
  if (location.pathname === "/auth") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" style={{ textDecoration: "none" }} to="/portal">
          FILM.
        </Link>
        
        {/* MOBILE HAMBURGER BUTTON (Important for responsiveness) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE MENU */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/portal">Discover</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/collections">Collections</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">Reviews</Link>
            </li>
            
            {/* DYNAMIC LOGIN/LOGOUT BUTTON */}
            <li className="nav-item ms-lg-3">
              {currentUser ? (
                <button 
                  className="btn btn-outline-danger btn-sm mt-1" 
                  onClick={onLogout}
                >
                  Logout
                </button>
              ) : (
                <Link className="btn btn-outline-light btn-sm mt-1" to="/auth">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

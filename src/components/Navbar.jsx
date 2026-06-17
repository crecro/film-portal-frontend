import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  // Hide the Navbar ONLY when the user is on the Login/Register page
  if (location.pathname === "/auth") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" style={{ textDecoration: "none" }} to="/portal">
          FILM.
        </Link>
        
        <div className="collapse navbar-collapse justify-content-end">
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

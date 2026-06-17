import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">Cinema beyond the algorithm.</h1>
        <p className="home-tagline">
          Discover Neo-Noir masterpieces, French New Wave classics, 
          and films that deserve your attention.
        </p>
        <Link to="/auth" className="interactive-enter-btn">
          ENTER PORTAL
        </Link>
      </div>
    </div>
  );
}
export default Home;

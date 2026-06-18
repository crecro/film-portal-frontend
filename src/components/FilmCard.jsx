import { useState } from "react";
import axios from "axios";

function FilmCard({ film, currentUser, getRecommendations }) {
  // NEW: State to track if the description is visible or hidden
  const [showDescription, setShowDescription] = useState(false);

  const handleSave = async (e) => {
    e.stopPropagation(); // Prevents the click from accidentally toggling the description
    try {
      await axios.post("https://film-portal-api.onrender.com/collections", {
        user_id: currentUser.id,
        film_id: film.id
      });
      alert("Saved to collections!");
    } catch (err) {
      console.error(err);
      alert("Could not save to collections.");
    }
  };

  const handleRecommend = (e) => {
    e.stopPropagation(); // Prevents the click from accidentally toggling the description
    getRecommendations(film.id, film.title);
  };

  return (
    <div className="card film-card mb-4 bg-transparent border-0 text-light">
      
      {/* WRAPPER: Clicking this area toggles the description */}
      <div 
        onClick={() => setShowDescription(!showDescription)} 
        style={{ cursor: "pointer" }}
      >
        <img 
          src={film.image_url && film.image_url !== "N/A" ? film.image_url : "https://placehold.co/300x450"} 
          className="card-img-top" 
          alt={film.title} 
          style={{ borderRadius: "8px", objectFit: "cover", height: "100%", border: "1px solid #333" }}
        />
        <div className="card-body px-0 pb-1">
          <h5 className="card-title mb-1" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{film.title}</h5>
          <p className="card-text mb-2" style={{ fontSize: "0.9rem", color: "#ccc" }}>{film.genre}</p>
        </div>
      </div>
      
      {/* THE BUTTONS */}
      <div className="d-flex gap-2 mb-2">
        <button 
          className="btn btn-outline-light btn-sm" 
          style={{ padding: "4px 16px" }}
          onClick={handleRecommend}
        >
          Similar
        </button>
        <button 
          className="btn btn-sm" 
          style={{ backgroundColor: "#d4af37", color: "black", fontWeight: "500", padding: "4px 16px" }}
          onClick={handleSave}
        >
          + Save
        </button>
      </div>

      {/* THE DROPDOWN DESCRIPTION */}
      {/* This only renders if showDescription is TRUE */}
      {showDescription && (
        <div 
          className="mt-2 p-3 shadow-sm" 
          style={{ 
            backgroundColor: "rgba(255,255,255,0.05)", 
            borderRadius: "8px", 
            fontSize: "0.85rem", 
            borderLeft: "3px solid #d4af37",
            lineHeight: "1.5"
          }}
        >
          {film.description ? film.description : "No synopsis available for this film."}
        </div>
      )}

    </div>
  );
}

export default FilmCard;

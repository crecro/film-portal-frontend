import { useState } from "react";
import axios from "axios";

function FilmCard({ film, currentUser, getRecommendations }) {
  const [showDescription, setShowDescription] = useState(false);
  
  // NEW: State for admin editing
  const [isEditing, setIsEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(film.description || "");

  const handleSave = async (e) => {
    e.stopPropagation();
    try {
      await axios.post("https://film-portal-api.onrender.com/collections", {
        user_id: currentUser.id,
        film_id: film.id
      });
      alert("Saved to collections!");
    } catch (err) { alert("Could not save to collections."); }
  };

  const handleRecommend = (e) => {
    e.stopPropagation();
    getRecommendations(film.id, film.title);
  };

  // NEW: Admin Delete Function
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to completely delete "${film.title}"?`)) {
      try {
        await axios.delete(`https://film-portal-api.onrender.com/films/${film.id}`);
        window.location.reload(); // Refresh the page to show it's gone
      } catch (err) { alert("Failed to delete."); }
    }
  };

  // NEW: Admin Edit Description Function
  const handleUpdateDesc = async (e) => {
    e.stopPropagation();
    try {
      await axios.put(`https://film-portal-api.onrender.com/films/${film.id}`, { description: editDesc });
      alert("Description updated!");
      setIsEditing(false);
      film.description = editDesc; // Update it locally so we see changes instantly
    } catch (err) { alert("Failed to update description."); }
  };

  return (
    <div className="card film-card mb-4 bg-transparent border-0 text-light">
      
      {/* Clicking toggles description, unless we are currently editing */}
      <div onClick={() => !isEditing && setShowDescription(!showDescription)} style={{ cursor: "pointer" }}>
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
      <div className="d-flex gap-2 mb-2 flex-wrap">
        <button className="btn btn-outline-light btn-sm" onClick={handleRecommend}>Similar</button>
        <button className="btn btn-sm" style={{ backgroundColor: "#d4af37", color: "black", fontWeight: "500" }} onClick={handleSave}>+ Save</button>
        
        {/* NEW: ONLY SHOW IF USER IS ADMIN */}
        {currentUser && currentUser.isAdmin && (
          <>
            <button className="btn btn-sm btn-outline-info" onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); setShowDescription(true); }}>Edit</button>
            <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>

      {/* THE DROPDOWN DESCRIPTION & EDITOR */}
      {(showDescription || isEditing) && (
        <div className="mt-2 p-3 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px", fontSize: "0.85rem", borderLeft: "3px solid #d4af37", lineHeight: "1.5" }}>
          
          {isEditing ? (
            <div onClick={(e) => e.stopPropagation()}>
              <textarea 
                className="form-control mb-2" 
                rows="4" 
                value={editDesc} 
                onChange={(e) => setEditDesc(e.target.value)} 
                style={{ backgroundColor: "#222", color: "white" }}
              />
              <button className="btn btn-sm btn-success me-2" onClick={handleUpdateDesc}>Save</button>
              <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            film.description ? film.description : "No synopsis available for this film."
          )}

        </div>
      )}

    </div>
  );
}

export default FilmCard;

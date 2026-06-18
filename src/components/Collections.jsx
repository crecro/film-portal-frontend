import { useEffect, useState } from "react";
import axios from "axios";

function Collections({ currentUser }) {
  const [savedFilms, setSavedFilms] = useState([]);

  const fetchCollections = () => {
    axios.get(`https://film-portal-api.onrender.com/collections/${currentUser.id}`)
      .then(res => setSavedFilms(res.data))
      .catch(err => console.error("Error fetching collections:", err));
  };

  useEffect(() => {
    fetchCollections();
  }, [currentUser]);

  // NEW: Remove film from collection
  const handleRemove = async (filmId) => {
    try {
      await axios.delete(`https://film-portal-api.onrender.com/collections/${currentUser.id}/${filmId}`);
      // Instantly remove it from the screen without needing to refresh the page
      setSavedFilms(savedFilms.filter(film => film.id !== filmId));
    } catch (err) {
      alert("Failed to remove film.");
    }
  };

  return (
    <div className="container mt-5 pb-5 text-light">
      <h2 style={{ fontWeight: "800", marginBottom: "30px" }}>My Collection</h2>
      
      {savedFilms.length === 0 ? (
        <p style={{ fontStyle: "italic", opacity: 0.7 }}>You haven't saved any films yet.</p>
      ) : (
        <div className="row">
          {savedFilms.map(film => (
            <div key={film.id} className="col-6 col-md-3 mb-4">
              <div className="card film-card bg-transparent border-0 text-light">
                <img 
                  src={film.image_url && film.image_url !== "N/A" ? film.image_url : "https://placehold.co/300x450"} 
                  className="card-img-top" 
                  alt={film.title} 
                  style={{ borderRadius: "8px", objectFit: "cover", height: "100%", border: "1px solid #333" }}
                />
                <div className="card-body px-0 pb-1">
                  <h5 className="card-title mb-1" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>{film.title}</h5>
                  <p className="card-text mb-2" style={{ fontSize: "0.9rem", color: "#ccc" }}>{film.genre}</p>
                  
                  {/* NEW REMOVE BUTTON */}
                  <button 
                    className="btn btn-outline-danger btn-sm mt-2 w-100"
                    onClick={() => handleRemove(film.id)}
                  >
                    Remove from Collection
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;

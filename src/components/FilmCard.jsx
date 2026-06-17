import axios from "axios";
import { useState } from "react";

function FilmCard({ film, getRecommendations, currentUser }) {
  const [saved, setSaved] = useState(false);

  const saveToCollection = () => {
    if (!currentUser) return;
    axios.post("https://film-portal-api.onrender.com//collections", {
      user_id: currentUser.id,
      film_id: film.id
    })
      .then(() => setSaved(true))
      .catch((err) => console.error("Error saving to collection:", err));
  };

  // Note: this card no longer carries its own col-6/col-md-3 classes.
  // The parent grid (App.jsx) already wraps each card in those grid-column
  // classes, so having them here too was nesting a 25%-wide column inside
  // another 25%-wide column — shrinking every card down to a sliver.
  return (
    <div className="film-card-container mb-5">
      <img
        src={film.image_url && film.image_url !== "N/A" ? film.image_url : "https://placehold.co/300x450"}
        alt={film.title}
        className="img-fluid"
      />

      <div className="mt-2">
        <div className="film-title">{film.title}</div>
        <div className="genre">{film.genre}</div>

        <div className="mt-2 d-flex flex-wrap gap-2">
          {getRecommendations && (
            <button className="btn btn-sm btn-outline-light" onClick={() => getRecommendations(film.id, film.title)}>
              Similar
            </button>
          )}

          {film.film_url && film.film_url !== "#" && (
            <a href={film.film_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
              Watch
            </a>
          )}

          <button
            className="btn btn-sm btn-save"
            onClick={saveToCollection}
            disabled={saved}
          >
            {saved ? "Saved" : "+ Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilmCard;

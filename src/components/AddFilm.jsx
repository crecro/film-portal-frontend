import { useState } from "react";
import axios from "axios";

function AddFilm({ fetchFilms }) {
  // Your state is named 'film'
  const [film, setFilm] = useState({ 
    title: "", 
    genre: "", 
    director: "", 
    year_released: "", 
    description: "", 
    film_url: "" 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // FIXED: Changed 'formData' to 'film'
    console.log("Submit button clicked! Form data:", film); 

    axios.post("https://film-portal-api.onrender.com/films", { 
      ...film, 
      film_url: film.film_url || "#" 
    })
      .then(() => {
        alert("Film Added!");
        // Reset the state to clear the form
        setFilm({ 
          title: "", 
          genre: "", 
          director: "", 
          year_released: "", 
          description: "", 
          film_url: "" 
        });
        // Refresh the film list
        fetchFilms(); 
      })
      .catch((err) => {
        console.error("Error adding film:", err);
        alert("Failed to add film. Check the console for details.");
      });
  };

  return (
    <div className="add-film-container">
      <h3 style={{ textAlign: "center", color: "#FFF" }}>Add a New Film</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Title" required onChange={(e) => setFilm({...film, title: e.target.value})} value={film.title} />
        <input className="form-control" placeholder="Genre" required onChange={(e) => setFilm({...film, genre: e.target.value})} value={film.genre} />
        <input className="form-control" placeholder="Director" onChange={(e) => setFilm({...film, director: e.target.value})} value={film.director} />
        <input className="form-control" placeholder="Year" required onChange={(e) => setFilm({...film, year_released: e.target.value})} value={film.year_released} />
        <textarea className="form-control" placeholder="Description" required onChange={(e) => setFilm({...film, description: e.target.value})} value={film.description}></textarea>
        <input className="form-control" placeholder="URL (Optional)" onChange={(e) => setFilm({...film, film_url: e.target.value})} value={film.film_url} />
        <button type="submit" className="btn btn-light w-100">SUBMIT FILM</button>
      </form>
    </div>
  );
}

export default AddFilm;

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FilmCard from "./components/FilmCard";
import AddFilm from "./components/AddFilm";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Collections from "./components/Collections";
import Reviews from "./components/Reviews";
import "./App.css";
import "./components/Home.css";

// The massive base list of genres
const BASE_GENRES = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime", "Documentary", 
  "Drama", "Family", "Fantasy", "Film Noir", "History", "Horror", "Music", "Musical", 
  "Mystery", "Neo-Noir", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western", "World Cinema"
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("filmUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    fetchFilms();
  }, []);

  const fetchFilms = () => {
    axios.get("https://film-portal-api.onrender.com//films").then((res) => setFilms(res.data));
  };

  // ---> THE MISSING FUNCTION IS RESTORED HERE <---
  const getRecommendations = (id, title) => {
    axios.get(`https://film-portal-api.onrender.com/films/recommend/${id}`).then(res => {
      setRecommendations({ title: title, data: res.data });
      window.scrollTo({ top: 400, behavior: "smooth" });
    });
  };

  const dynamicGenres = [...new Set([...BASE_GENRES, ...films.map(f => f.genre).filter(g => g)])].sort();

  const filtered = films.filter(f => 
    f.title?.toLowerCase().includes(search.toLowerCase()) && 
    (selectedGenre === "All" || f.genre === selectedGenre)
  );

  return (
    <Router>
      {currentUser && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={currentUser ? <Navigate to="/portal" /> : <Auth onLogin={setCurrentUser} />} />

        <Route path="/portal" element={currentUser ? (
          <div className="container mt-4">
            <Hero />
            <SearchBar search={search} setSearch={setSearch} />
            
            <select className="form-control mb-5" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="All">All Genres</option>
              {dynamicGenres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            {/* CATEGORIZED RECOMMENDATIONS PANEL */}
            {recommendations && recommendations.data && (
              <div className="recommendations-panel">
                <div className="recommendations-header mb-4">
                  <h3 style={{ margin: 0, fontWeight: "800" }}>Because you selected {recommendations.title}</h3>
                  <button className="btn btn-sm btn-outline-light" onClick={() => setRecommendations(null)}>Close</button>
                </div>
                
                {/* MORE BY DIRECTOR */}
                {recommendations.data.byDirector && recommendations.data.byDirector.length > 0 && (
                  <div className="mb-5">
                    <h5 style={{ color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase" }}>
                      More by {recommendations.data.director}
                    </h5>
                    <div className="row mt-3">
                      {recommendations.data.byDirector.map(f => (
                        <div key={f.id} className="col-6 col-md-3">
                          <FilmCard film={f} currentUser={currentUser} getRecommendations={getRecommendations} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MORE IN GENRE */}
                {recommendations.data.byGenre && recommendations.data.byGenre.length > 0 && (
                  <div>
                    <h5 style={{ color: "var(--accent)", letterSpacing: "1px", textTransform: "uppercase" }}>
                      More in {recommendations.data.genre}
                    </h5>
                    <div className="row mt-3">
                      {recommendations.data.byGenre.map(f => (
                        <div key={f.id} className="col-6 col-md-3">
                          <FilmCard film={f} currentUser={currentUser} getRecommendations={getRecommendations} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FALLBACK */}
                {(!recommendations.data.byDirector || recommendations.data.byDirector.length === 0) && 
                 (!recommendations.data.byGenre || recommendations.data.byGenre.length === 0) && (
                  <p style={{ fontStyle: "italic", opacity: 0.7 }}>
                    No similar films found in your database yet. Try adding some more!
                  </p>
                )}
              </div>
            )}

            {/* MAIN FILM GRID */}
            {(search !== "" || selectedGenre !== "All") ? (
              <div className="row">
                {filtered.map(f => (
                  <div key={f.id} className="col-6 col-md-3">
                    <FilmCard film={f} currentUser={currentUser} getRecommendations={getRecommendations} />
                  </div>
                ))}
              </div>
            ) : (
              dynamicGenres.map(genre => {
                const genreFilms = films.filter(f => f.genre === genre);
                if (genreFilms.length === 0) return null;

                return (
                  <div key={genre} className="genre-section mb-5">
                    <div className="d-flex align-items-center mb-4">
                      <h2 className="genre-heading m-0">{genre}</h2>
                      <div className="genre-line ms-3"></div>
                    </div>
                    <div className="row">
                      {genreFilms.map(f => (
                        <div key={f.id} className="col-6 col-md-3">
                          <FilmCard film={f} currentUser={currentUser} getRecommendations={getRecommendations} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}

            <hr style={{ borderColor: "var(--accent)", margin: "60px 0" }} />
            <AddFilm fetchFilms={fetchFilms} />
          </div>
        ) : <Navigate to="/auth" />} />
        
        <Route path="/collections" element={currentUser ? <Collections currentUser={currentUser} /> : <Navigate to="/auth" />} />
        <Route path="/reviews" element={currentUser ? <Reviews currentUser={currentUser} films={films} /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}
export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import FilmCard from "./FilmCard";

function Collections({ currentUser }) {
  const [myFilms, setMyFilms] = useState([]);

  useEffect(() => {
    if (currentUser) {
      axios.get(`https://film-portal-api.onrender.com/collections/${currentUser.id}`)
        .then(res => setMyFilms(res.data))
        .catch(err => console.log(err));
    }
  }, [currentUser]);

  return (
    <div className="container mt-5">
      <h1 className="hero-title">Your Collection</h1>
      <hr style={{ borderColor: "var(--accent)", marginBottom: "40px" }}/>
      
      {myFilms.length === 0 ? (
        <p>You haven't saved any films yet.</p>
      ) : (
        <div className="row">
          {myFilms.map(film => (
            <div key={film.id} className="col-6 col-md-3">
              <FilmCard film={film} currentUser={currentUser} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;

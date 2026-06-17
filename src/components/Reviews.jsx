import { useEffect, useState } from "react";
import axios from "axios";

function Reviews({ currentUser, films }) {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ film_id: "", rating: "5", review_text: "" });

  const fetchReviews = () => {
    axios.get("https://film-portal-api.onrender.com//reviews").then(res => setReviews(res.data));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Check if a film is selected
    if (!formData.film_id) {
      alert("Please select a film to review!");
      return;
    }
    
    // 2. Check if text is written
    if (!formData.review_text.trim()) {
      alert("Please write a review before publishing!");
      return;
    }

    // 3. Send to backend with error handling
    axios.post("https://film-portal-api.onrender.com//reviews", { 
      user_id: currentUser.id, 
      ...formData 
    })
      .then(() => {
        setFormData({ film_id: "", rating: "5", review_text: "" });
        fetchReviews(); // Refresh the feed
      })
      .catch((err) => {
        console.error("Database Error:", err);
        alert("Failed to publish. Check the F12 console for details!");
      });
  };
  

  return (
    <div className="container mt-5 pb-5">
      <div className="row">
        
        {/* SUBMIT REVIEW FORM */}
        <div className="col-md-4 mb-5">
          <h3 style={{ fontWeight: "800" }}>Log a Film</h3>
          <div className="p-4 mt-3" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid var(--accent)" }}>
            <form onSubmit={handleSubmit}>
              <select className="form-control mb-3" onChange={(e) => setFormData({...formData, film_id: e.target.value})} value={formData.film_id}>
                <option value="" disabled>Select a Film...</option>
                {films.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
              </select>
              <select className="form-control mb-3" onChange={(e) => setFormData({...formData, rating: e.target.value})} value={formData.rating}>
                <option value="5">⭐⭐⭐⭐⭐ Masterpiece</option>
                <option value="4">⭐⭐⭐⭐ Great</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
              <textarea className="form-control mb-3" rows="4" placeholder="Write your review..." onChange={(e) => setFormData({...formData, review_text: e.target.value})} value={formData.review_text}></textarea>
              <button type="submit" className="btn btn-outline-light w-100">PUBLISH REVIEW</button>
            </form>
          </div>
        </div>

        {/* GLOBAL FEED (BEAUTIFUL CARDS) */}
        <div className="col-md-8">
          <h3 style={{ fontWeight: "800" }}>Recent Activity</h3>
          <div className="mt-3">
            {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}
            {reviews.map(review => (
              <div key={review.id} className="review-card d-flex mb-4 p-4">
                <img src={review.image_url && review.image_url !== "N/A" ? review.image_url : "https://placehold.co/100x150"} alt={review.title} className="review-img" />
                <div className="ms-4 w-100">
                  <h4 className="mb-2" style={{ fontSize: "1.6rem" }}>{review.title}</h4>
                  <div className="mb-3" style={{ color: "var(--accent)", fontSize: "1.2rem", letterSpacing: "2px" }}>
                    {Array(parseInt(review.rating)).fill("★").join("")}{Array(5 - parseInt(review.rating)).fill("☆").join("")}
                  </div>
                  <p className="review-text" style={{ fontSize: "1.1rem" }}>"{review.review_text}"</p>
                  
                  {/* FIX: Removed text-muted, added explicit white color and opacity */}
                  <div className="mt-3" style={{ fontSize: "0.95rem", textTransform: "uppercase", color: "#FFFFFF", opacity: 0.7 }}>
                    Reviewed by {review.email.split('@')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Reviews;

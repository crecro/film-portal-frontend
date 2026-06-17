import { useState } from "react";
import axios from "axios";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors when user types
  };

  // --- FORM VALIDATION FILTERS ---
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const endpoint = isLogin ? "login" : "register";

    try {
      const response = await axios.post(`https://film-portal-api.onrender.com//${endpoint}`, formData);
      
      // Save user session to local storage
      const userData = { id: response.data.userId, email: formData.email };
      localStorage.setItem("filmUser", JSON.stringify(userData));
      
      // Update parent component
      onLogin(userData);
      
    } catch (err) {
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div 
        className="p-5" 
        style={{ 
          backgroundColor: "rgba(255,255,255,0.03)", 
          border: "1px solid var(--accent)", 
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px" 
        }}
      >
        <h2 className="mb-4 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: "800", color: "var(--accent)" }}>
          {isLogin ? "Welcome Back." : "Join the Club."}
        </h2>

        {error && <div className="alert alert-danger" style={{ fontSize: "1rem", borderRadius: "8px" }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mb-4"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "12px" }}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-4"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ padding: "12px" }}
          />
          
          <button type="submit" className="btn btn-outline-light w-100 mb-4" style={{ padding: "12px", letterSpacing: "2px", fontWeight: "bold" }}>
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="text-center" style={{ fontSize: "1rem", color: "#cccccc" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: "var(--accent)", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here." : "Log in."}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Auth;

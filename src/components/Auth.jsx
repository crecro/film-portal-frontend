import { useState } from "react";
import axios from "axios";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any old errors

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const res = await axios.post("https://film-portal-api.onrender.com/login", { 
          email, 
          password 
        });
        
        // Save user to local storage so they stay logged in if they refresh
        localStorage.setItem("filmUser", JSON.stringify(res.data));
        
        // This function tells App.jsx the user is logged in, which redirects to /portal
        onLogin(res.data);
        
      } else {
        // --- REGISTER FLOW ---
        await axios.post("https://film-portal-api.onrender.com/register", { 
          email, 
          password 
        });
        
        // Alert the user
        alert("Registration successful! You can now log in.");
        
        // THE FIX: Do NOT auto-login. Instead, clear the form and switch to Login view
        setEmail("");
        setPassword("");
        setIsLogin(true); 
      }
    } catch (err) {
      // If the backend sends an error (like "User not found" or "Invalid credentials")
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card p-4 shadow-lg" style={{ backgroundColor: "#1a1a1a", border: "1px solid var(--accent)", color: "white" }}>
        <h2 className="text-center mb-4" style={{ fontWeight: "800" }}>
          {isLogin ? "Welcome Back" : "Join the Portal"}
        </h2>
        
        {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button type="submit" className="btn btn-outline-light w-100 mb-3">
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="mb-0" style={{ fontSize: "0.9rem", color: "#ccc" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button 
            className="btn btn-link text-decoration-none" 
            style={{ color: "var(--accent)" }}
            onClick={() => {
              setIsLogin(!isLogin);
              setError(""); // Clear errors when switching tabs
            }}
          >
            {isLogin ? "Create an account" : "Log in instead"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;

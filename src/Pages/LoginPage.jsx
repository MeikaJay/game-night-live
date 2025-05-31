import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsAuthenticated }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "Peacelove082420!") {
      setIsAuthenticated(); // This will trigger localStorage + setState from App.jsx
      navigate("/play");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div style={{ padding: 40, textAlign: "center", color: "white", backgroundColor: "#000", minHeight: "100vh" }}>
      <h2 className="text-2xl font-bold mb-4">🔐 Host Login</h2>
      <input
        type="password"
        placeholder="Enter access password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
          borderRadius: "5px",
          width: "250px",
        }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: 18,
          marginTop: "10px",
          backgroundColor: "#00cc66",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Log In to Host
      </button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

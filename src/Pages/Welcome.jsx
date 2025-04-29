import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const storedLogo = localStorage.getItem("welcomeLogo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      {logo && (
        <img
          src={logo}
          alt="Game Night Live Logo"
          style={{ maxWidth: "400px", marginBottom: "2rem" }}
        />
      )}

      {/* Slogan */}
      <h1
        style={{
          fontSize: "2rem",
          color: "#ff0",
          marginBottom: "2rem",
          textShadow: "2px 2px 4px #000",
        }}
      >
        You bring the fun, we bring the games!
      </h1>

      {/* Start Button */}
      <button
        onClick={() => navigate("/play")}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.25rem",
          backgroundColor: "limegreen",
          color: "black",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        🎉 Let’s Get Started!
      </button>
    </div>
  );
}
localStorage.removeItem("scores");

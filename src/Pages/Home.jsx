import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="main-title">🎮 Welcome to Game Night Live</h1>
      <p className="subtitle">Play. Compete. Laugh. Win.</p>

      <div className="home-buttons">
        <button onClick={() => navigate("/signup")}>🎤 Sign Up to Compete</button>
        <button onClick={() => navigate("/games")}>🧩 Play a Game</button>
        <button onClick={() => navigate("/feedback")}>💬 Give Feedback</button>
        <a href="https://www.youtube.com/@gamenightliveshow" target="_blank" rel="noreferrer">
          📺 Watch on YouTube
        </a>
      </div>
    </div>
  );
}
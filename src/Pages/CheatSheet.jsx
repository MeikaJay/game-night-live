import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheatSheet() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const allGames = JSON.parse(localStorage.getItem("allGames")) || [];
    setGames(allGames);
  }, []);

  useEffect(() => {
    if (selectedGame) {
      const game = games.find((g) => g.name === selectedGame);
      setQuestions(game?.questions || []);
    }
  }, [selectedGame, games]);

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "2rem", color: "cyan" }}>📒 Cheat Sheet</h1>
        <button
          onClick={() => navigate("/play")}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
          }}
        >
          🏠 Back to Game
        </button>
      </div>

      {/* Game Selector */}
      <div style={{ marginTop: "2rem" }}>
        <label style={{ marginRight: "1rem" }}>Choose a Game:</label>
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "4px", color: "#000" }}
        >
          <option value="">-- Select --</option>
          {games.map((game, i) => (
            <option key={i} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {/* Questions Display */}
      <div style={{ marginTop: "2rem" }}>
        {questions.length > 0 ? (
          <ul>
            {questions.map((q, i) => (
              <li key={i} style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "lime" }}>#{i + 1}</strong> -{" "}
                <span>{q.question}</span>
                <br />
                <em style={{ color: "#aaa" }}>Answer:</em>{" "}
                <span style={{ color: "#0ff" }}>{q.answer}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#888" }}>No questions loaded for this game.</p>
        )}
      </div>
    </div>
  );
}
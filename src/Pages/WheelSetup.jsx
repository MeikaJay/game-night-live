import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WheelSetup() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("originalGames")) || [];
    setGames(stored);
  }, []);

  const saveGames = (updated) => {
    setGames(updated);
    localStorage.setItem("originalGames", JSON.stringify(updated));
  };

  const addGame = () => {
    const trimmed = newGame.trim();
    if (!trimmed || games.some((g) => g.name === trimmed)) return;
    const updated = [...games, { name: trimmed }];
    saveGames(updated);
    setNewGame("");
  };

  const deleteGame = (index) => {
    const updated = [...games];
    updated.splice(index, 1);
    saveGames(updated);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navigation */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/play")}
          style={{
            backgroundColor: "#444",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            fontSize: "1rem",
          }}
        >
          🏠 Back to Game
        </button>
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#0ff" }}>
        🎡 Wheel Setup
      </h1>

      {/* Add Game Input */}
      <div style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
          placeholder="Enter game name"
          style={{
            padding: "0.5rem",
            marginRight: "1rem",
            fontSize: "1rem",
            width: "300px",
          }}
        />
        <button
          onClick={addGame}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#0f0",
            color: "#000",
            borderRadius: "4px",
          }}
        >
          ➕ Add to Wheel
        </button>
      </div>

      {/* Game List */}
      {games.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {games.map((g, i) => (
            <li
              key={i}
              style={{
                backgroundColor: "#111",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{`${i + 1}. ${g.name}`}</span>
              <button
                onClick={() => deleteGame(i)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "4px",
                }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#ccc" }}>No games on the wheel yet. Add some!</p>
      )}
    </div>
  );
}
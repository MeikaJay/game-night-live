import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const resetGame = () => {
    localStorage.removeItem("scores");
    localStorage.removeItem("selectedGame");
    localStorage.removeItem("activeContestant");
    localStorage.removeItem("usedQuestions");
    alert("Game has been reset.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem", color: "#0ff" }}>
        🎛️ Admin Panel
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate("/play")}
          style={btnStyle("blue")}
        >
          🎮 Go to GamePlay
        </button>

        <button
          onClick={() => navigate("/admin/contestants")}
          style={btnStyle("purple")}
        >
          🧍‍♂️ Edit Contestants
        </button>

        <button
          onClick={() => navigate("/admin/questions")}
          style={btnStyle("lime")}
        >
          📝 Manage Questions
        </button>

        <button
          onClick={resetGame}
          style={btnStyle("red")}
        >
          🧼 Reset Game
        </button>

        <button
          onClick={() => navigate("/")}
          style={btnStyle("teal")}
        >
          👋 Welcome Screen
        </button>

        <button
          onClick={() => navigate("/admin/setup")}
          style={btnStyle("orange")}
        >
          🎯 Episode Setup
        </button>

        <button
          onClick={() => navigate("/admin/settings")}
          style={btnStyle("gray")}
        >
          ⚙️ Game Display Settings
        </button>

        <button
          onClick={() => navigate("/admin/wheel-setup")}
          style={btnStyle("yellow", true)}
        >
          🛠️ Wheel Setup
        </button>
      </div>
    </div>
  );
}

// 🔘 Button style helper
const btnStyle = (color, darkText = false) => ({
  backgroundColor: colorMap[color] || "#444",
  color: darkText ? "#000" : "#fff",
  padding: "1rem",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
  border: "none",
});

// 🎨 Color map for variety
const colorMap = {
  blue: "#007bff",
  red: "#dc3545",
  green: "#28a745",
  yellow: "#ffc107",
  gray: "#6c757d",
  purple: "#6f42c1",
  orange: "#fd7e14",
  lime: "#32cd32",
  teal: "#20c997",
};
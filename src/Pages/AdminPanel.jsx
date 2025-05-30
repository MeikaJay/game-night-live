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
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#00eaff",
          textAlign: "center",
        }}
      >
        🎛️ Game Night Live Admin Panel
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <AdminButton label="🎮 Go to GamePlay" color="blue" onClick={() => navigate("/play")} />
        <AdminButton label="🧍‍♂️ Edit Contestants" color="purple" onClick={() => navigate("/admin/contestants")} />
        <AdminButton label="📝 Manage Questions" color="lime" onClick={() => navigate("/admin/questions")} />
        <AdminButton label="🧼 Reset Game" color="red" onClick={resetGame} />
        <AdminButton label="👋 Welcome Screen" color="teal" onClick={() => navigate("/")} />
        <AdminButton label="🎯 Episode Setup" color="orange" onClick={() => navigate("/admin/setup")} />
        <AdminButton label="⚙️ Game Display Settings" color="gray" onClick={() => navigate("/admin/settings")} />
        <AdminButton label="🛠️ Wheel Setup" color="yellow" darkText onClick={() => navigate("/admin/wheel-setup")} />
        <AdminButton label="📊 Scoring Dashboard" color="green" onClick={() => navigate("/scoring-dashboard")} />
        <AdminButton label="📋 Host Cheat Sheet" color="pink" onClick={() => navigate("/admin/cheatsheet")} />
      </div>
    </div>
  );
}

function AdminButton({ label, color, darkText = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: colorMap[color] || "#444",
        color: darkText ? "#000" : "#fff",
        padding: "1rem",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.2s ease",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {label}
    </button>
  );
}

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
  pink: "#e83e8c",
};
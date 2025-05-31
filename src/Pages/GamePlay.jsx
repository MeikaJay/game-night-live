import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePlay() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const [contestantList, setContestantList] = useState({
    contestant1: "Contestant 1",
    contestant2: "Contestant 2",
  });

  const [activeContestant, setActiveContestant] = useState("");
  const [selectedGame, setSelectedGame] = useState("");
  const [gameOptions, setGameOptions] = useState([]);
  const [timer, setTimer] = useState(120);
  const [score, setScore] = useState({});
  const [settings, setSettings] = useState({
    backgroundColor: "#000",
    fontColor: "#fff",
    fontSize: "1rem",
    backgroundImage: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contestants")) || {};
    setContestantList({
      contestant1: saved.contestant1 || "Contestant 1",
      contestant2: saved.contestant2 || "Contestant 2",
    });

    const savedGames = JSON.parse(localStorage.getItem("originalGames")) || [];
    setGameOptions(savedGames.map((g) => g.name));

    const storedSettings = JSON.parse(localStorage.getItem("displaySettings")) || {};
    setSettings((prev) => ({ ...prev, ...storedSettings }));

    const storedScore = JSON.parse(localStorage.getItem("scores")) || {};
    setScore(storedScore);

    const storedGame = localStorage.getItem("selectedGame");
    const storedContestant = localStorage.getItem("activeContestant");
    if (storedGame) setSelectedGame(storedGame);
    if (storedContestant) setActiveContestant(storedContestant);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const freshScores = JSON.parse(localStorage.getItem("scores")) || {};
        setScore(freshScores);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const saveScores = () => {
    localStorage.setItem("scores", JSON.stringify(score));
    alert("✅ Scores saved!");
  };

  const resetScores = () => {
    const reset = {
      [contestantList.contestant1]: 0,
      [contestantList.contestant2]: 0,
    };
    setScore(reset);
    localStorage.setItem("scores", JSON.stringify(reset));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStartRound = () => {
    if (!selectedGame || !activeContestant) {
      alert("Please select both a game and a contestant to continue.");
      return;
    }
    localStorage.setItem("selectedGame", selectedGame);
    localStorage.setItem("activeContestant", activeContestant);
    navigate("/round");
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: settings.backgroundImage
          ? `url(${settings.backgroundImage}) no-repeat center center / cover`
          : settings.backgroundColor || "#000",
        color: settings.fontColor || "#fff",
        fontSize: settings.fontSize || "1rem",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "center",
      }}
    >
      <button
        onClick={() => navigate("/admin/panel")}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "black",
          color: "white",
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
        }}
      >
        🏠 Home
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          backgroundColor: "#111",
          border: "5px solid lime",
          borderRadius: "12px",
          padding: "1rem 2rem",
          marginBottom: "2rem",
          boxShadow: "0 0 10px lime",
        }}
      >
        {[contestantList.contestant1, contestantList.contestant2].map((name) => (
          <div key={name} style={{ textAlign: "center", minWidth: "180px" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{name}</h3>
            <input
              type="number"
              value={score[name] || ""}
              onChange={(e) =>
                setScore((prev) => ({
                  ...prev,
                  [name]: parseInt(e.target.value) || 0,
                }))
              }
              style={{
                fontSize: "2rem",
                textAlign: "center",
                width: "80px",
                borderRadius: "6px",
                padding: "0.25rem",
              }}
            />
          </div>
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <button
            onClick={saveScores}
            style={{
              backgroundColor: "limegreen",
              color: "black",
              borderRadius: "6px",
              padding: "6px 12px",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            💾 Save Scores
          </button>
          <button
            onClick={resetScores}
            style={{
              backgroundColor: "white",
              color: "black",
              borderRadius: "6px",
              padding: "6px 12px",
              fontWeight: "bold",
            }}
          >
            🔄 Reset Scores
          </button>
        </div>
      </div>

      <h1 style={{ fontSize: "2.5rem", color: "cyan", marginBottom: "1rem" }}>
        ⏰ {formatTime(timer)}
      </h1>

      <select
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
        className="text-black p-2 rounded mb-6"
      >
        <option value="">-- Choose a Game --</option>
        {gameOptions.map((game, index) => (
          <option key={index} value={game}>
            {game}
          </option>
        ))}
      </select>

      <h2 style={{ fontSize: "1.25rem" }}>🎤 Who’s Playing?</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        {Object.values(contestantList).map((name) => (
          <button
            key={name}
            onClick={() => setActiveContestant(name)}
            style={{
              backgroundColor: activeContestant === name ? "white" : "gray",
              color: activeContestant === name ? "black" : "white",
              padding: "0.5rem 1.5rem",
              borderRadius: "6px",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {activeContestant && (
        <div
          style={{
            backgroundColor: "#000",
            color: "#00ff00",
            fontSize: "1.2rem",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            marginBottom: "1rem",
            boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
          }}
        >
          🎉 {activeContestant} is ready!
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/wheel")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "purple",
            borderRadius: "6px",
            color: "white",
          }}
        >
          🎡 Spin Wheel
        </button>
        <button
          onClick={handleStartRound}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "green",
            borderRadius: "6px",
            color: "white",
          }}
        >
          🎯 Start Round
        </button>
        <button
          onClick={() => navigate("/admin/settings")}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "gray",
            borderRadius: "6px",
            color: "white",
          }}
        >
          ⚙️ Settings
        </button>
      </div>
    </div>
  );
}

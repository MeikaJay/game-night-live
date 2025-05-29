import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalLayoutWrapper from "../components/GlobalLayoutWrapper.jsx";

const loadPlayed = () => JSON.parse(localStorage.getItem("playedGames")) || [];
const savePlayed = (arr) => localStorage.setItem("playedGames", JSON.stringify(arr));
const loadUnplayedGameNames = () => {
  const original = JSON.parse(localStorage.getItem("originalGames")) || [];
  const played = loadPlayed();
  return original.map((g) => g.name).filter((name) => !played.includes(name));
};

export default function Wheel() {
  const canvasRef = useRef(null);
  const spinSound = useRef(null);
  const dingSound = useRef(null);
  const navigate = useNavigate();

  const [rotation, setRotation] = useState(0);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setGames(loadUnplayedGameNames());
  }, []);

  useEffect(() => {
    if (games.length > 0) drawWheel(rotation);
  }, [games, rotation]);

  const drawWheel = (angle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas || games.length === 0) return;
    const ctx = canvas.getContext("2d");
    const size = 500;
    const center = size / 2;
    const radius = center - 10;
    const angleStep = (2 * Math.PI) / games.length;
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f"];

    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-center, -center);

    games.forEach((game, i) => {
      const start = i * angleStep;
      const end = start + angleStep;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + angleStep / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Arial";
      ctx.fillText(game, radius - 20, 0);
      ctx.restore();
    });

    ctx.restore();

    // Arrow at 12 o’clock
    ctx.beginPath();
    ctx.moveTo(center, 5);
    ctx.lineTo(center - 15, 35);
    ctx.lineTo(center + 15, 35);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  };

  const spinWheel = () => {
    if (spinning || games.length === 0) return;
    setSpinning(true);
    setSelectedGame("");
    setShowPopup(false);
    spinSound.current?.play();

    const fullRotations = 5;
    const randomOffset = Math.random() * 360;
    const endAngle = fullRotations * 360 + randomOffset;
    const duration = 3000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = endAngle * easeOut;

      setRotation(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const perSlice = 360 / games.length;
        const finalRotation = current % 360;
        const adjustedAngle = (270 - finalRotation + 360) % 360; // Arrow at 12 o'clock
        const index = Math.floor(adjustedAngle / perSlice) % games.length;
        const chosen = games[index];

        setSelectedGame(chosen);
        setSpinning(false);
        setShowPopup(true);

        spinSound.current.pause();
        spinSound.current.currentTime = 0;
        dingSound.current?.play();
      }
    };

    requestAnimationFrame(animate);
  };

  const removeSelectedGame = () => {
    if (!selectedGame) return;
    const played = loadPlayed();
    if (!played.includes(selectedGame)) {
      played.push(selectedGame);
      savePlayed(played);
    }
    setGames(loadUnplayedGameNames());
    setSelectedGame("");
    setShowPopup(false);
  };

  const resetWheel = () => {
    localStorage.removeItem("playedGames");
    setGames(loadUnplayedGameNames());
    setSelectedGame("");
    setShowPopup(false);
  };

  return (
    <GlobalLayoutWrapper>
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "black", color: "white", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* TOP TITLE BAR */}
        <div style={{ width: "100%", padding: "20px 0", textAlign: "center", backgroundColor: "#111" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: 0 }}>🎮 Game Night Live Wheel</h1>
        </div>

        {/* MAIN SECTION */}
        <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
          {/* LEFT: Wheel */}
          <div style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <canvas
              ref={canvasRef}
              style={{
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                border: "6px solid white",
                boxShadow: "0 0 30px rgba(255,255,255,0.3)",
              }}
            />
          </div>

          {/* RIGHT: Controls */}
          <div style={{ width: "50%", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ color: "#ccc", marginBottom: "24px", fontSize: "16px" }}>
              Remaining Games: {games.length}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
              <button
                onClick={spinWheel}
                disabled={spinning || games.length === 0}
                style={{
                  padding: "10px",
                  backgroundColor: "#6b21a8",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                🌀 Spin
              </button>
              <button
                onClick={removeSelectedGame}
                disabled={!selectedGame}
                style={{
                  padding: "10px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                ❌ Remove Selected
              </button>
              <button
                onClick={resetWheel}
                style={{
                  padding: "10px",
                  backgroundColor: "#4b5563",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                🔁 Reset Wheel
              </button>
              <button
                onClick={() => navigate("/play")}
                style={{
                  padding: "10px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                🎮 Back to Game
              </button>
            </div>

            {selectedGame && (
              <div style={{ marginTop: "24px" }}>
                <p style={{ color: "#22c55e", marginBottom: "4px" }}>🎯 Selected Game:</p>
                <p style={{ color: "#facc15", fontSize: "20px", fontWeight: "bold" }}>{selectedGame}</p>
              </div>
            )}
          </div>
        </div>

        {/* AUDIO */}
        <audio ref={spinSound} src="/sounds/spin.mp3" preload="auto" />
        <audio ref={dingSound} src="/sounds/ding.mp3" preload="auto" />

        {/* POPUP */}
        {showPopup && selectedGame && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              textAlign: "center",
              padding: "24px",
            }}
          >
            <h2 style={{ fontSize: "64px", fontWeight: "bold", color: "#facc15", marginBottom: "32px" }}>
              🎯 {selectedGame}
            </h2>

            <div style={{ display: "flex", gap: "20px" }}>
              <button
                onClick={removeSelectedGame}
                style={{
                  padding: "16px 24px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  fontSize: "18px",
                  borderRadius: "6px",
                  border: "none",
                }}
              >
                ✅ Remove Game
              </button>
              <button
                onClick={() => navigate("/play")}
                style={{
                  padding: "16px 24px",
                  backgroundColor: "#16a34a",
                  color: "white",
                  fontSize: "18px",
                  borderRadius: "6px",
                  border: "none",
                }}
              >
                ▶️ Start This Game
              </button>
            </div>
          </div>
        )}
      </div>
    </GlobalLayoutWrapper>
  );
}
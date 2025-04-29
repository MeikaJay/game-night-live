import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalLayoutWrapper from "../Components/GlobalLayoutWrapper.jsx";
import WheelSettings from "./pages/WheelSettings"

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
  const [styleSettings, setStyleSettings] = useState({
    wheelColor1: "#3498db",
    wheelColor2: "#2ecc71",
    wheelFontColor: "#ffffff",
    wheelFontSize: 14,
    backgroundType: "color",
    backgroundColor: "#000000",
    backgroundImage: "",
    centerImage: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("originalGames")) || [];
    setGames(stored.map((g) => g.name));
  }, []);

  useEffect(() => {
    const styleData = {
      wheelColor1: localStorage.getItem("wheelColor1") || "#3498db",
      wheelColor2: localStorage.getItem("wheelColor2") || "#2ecc71",
      wheelFontColor: localStorage.getItem("wheelFontColor") || "#ffffff",
      wheelFontSize: parseInt(localStorage.getItem("wheelFontSize") || "14"),
      backgroundType: localStorage.getItem("backgroundType") || "color",
      backgroundColor: localStorage.getItem("backgroundColor") || "#000000",
      backgroundImage: localStorage.getItem("backgroundImage") || "",
      centerImage: localStorage.getItem("centerImage") || ""
    };
    setStyleSettings(styleData);
  }, []);

  useEffect(() => {
    drawWheel(rotation);
  }, [games, rotation, styleSettings]);

  const drawWheel = (angle = 0) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const size = 500;
    canvas.width = size;
    canvas.height = size;

    const center = size / 2;
    const radius = center - 10;
    const angleStep = (2 * Math.PI) / games.length;

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
      ctx.fillStyle = i % 2 === 0 ? styleSettings.wheelColor1 : styleSettings.wheelColor2;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + angleStep / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = styleSettings.wheelFontColor;
      ctx.font = `${styleSettings.wheelFontSize}px Arial`;
      ctx.fillText(game, radius - 10, 0);
      ctx.restore();
    });

    ctx.restore();

    // Center logo
    if (styleSettings.centerImage) {
      const logo = new Image();
      logo.src = styleSettings.centerImage;
      logo.onload = () => {
        ctx.drawImage(logo, center - 40, center - 40, 80, 80);
      };
    }

    // Draw arrow at 3 o’clock
    ctx.beginPath();
    ctx.moveTo(size - 10, center);
    ctx.lineTo(size - 30, center - 10);
    ctx.lineTo(size - 30, center + 10);
    ctx.fillStyle = "#fff";
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
      const currentRotation = endAngle * easeOut;

      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        const anglePerSlice = 360 / games.length;
        const finalRotation = currentRotation % 360;
        const adjustedAngle = (360 - finalRotation) % 360;
        const index = Math.floor(adjustedAngle / anglePerSlice) % games.length;

        const selected = games[index];
        setSelectedGame(selected);
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
    const original = JSON.parse(localStorage.getItem("originalGames")) || [];
    const updated = original.filter((g) => g.name !== selectedGame);
    localStorage.setItem("originalGames", JSON.stringify(updated));
    setGames(updated.map((g) => g.name));
    setSelectedGame("");
    setShowPopup(false);
  };

  const resetWheel = () => {
    const original = JSON.parse(localStorage.getItem("originalGames")) || [];
    setGames(original.map((g) => g.name));
    setSelectedGame("");
    setShowPopup(false);
  };

  const wheelBgStyle =
    styleSettings.backgroundType === "image"
      ? {
          backgroundImage: `url(${styleSettings.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : { backgroundColor: styleSettings.backgroundColor };

  return (
    <GlobalLayoutWrapper>
      <div
        className="w-screen h-screen flex flex-col justify-center items-center text-center px-4 relative"
        style={wheelBgStyle}
      >
        {/* ✅ Floating Wheel Settings Button */}
        <button
          onClick={() => navigate("/admin/wheel-settings")}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#ffc107",
            color: "#000",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            zIndex: 9999,
          }}
        >
          ⚙️ Wheel Settings
        </button>

        <h1 className="text-3xl font-bold text-white mb-2">🎡 Game Night Wheel</h1>
        <p className="text-white mb-4 text-sm">Remaining Games: {games.length}</p>

        <canvas
          ref={canvasRef}
          className="rounded shadow-lg border-4 border-white mb-4"
          style={{ width: "500px", height: "500px" }}
        />

        <audio ref={spinSound} src="/sounds/spin.mp3" preload="auto" />
        <audio ref={dingSound} src="/sounds/ding.mp3" preload="auto" />

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={spinWheel}
            disabled={spinning || games.length === 0}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
          >
            🌀 Spin
          </button>
          <button
            onClick={removeSelectedGame}
            disabled={!selectedGame}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            ❌ Remove Selected
          </button>
          <button
            onClick={resetWheel}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          >
            🔁 Reset Wheel
          </button>
          <button
            onClick={() => navigate("/play")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            🎮 Back to Game
          </button>
        </div>

        {showPopup && selectedGame && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 text-center p-6">
            <h2 className="text-6xl font-extrabold text-yellow-300 mb-6 animate-bounce">
              🎯 {selectedGame}
            </h2>
            <button
              onClick={() => navigate("/play")}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded text-xl"
            >
              ▶️ Start This Game
            </button>
          </div>
        )}
      </div>
    </GlobalLayoutWrapper>
  );
}
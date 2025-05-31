import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GamePlay() {
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const input = prompt("🔐 Enter the host password to access:");
    if (input === "Peacelove082420!") {
      setAuthorized(true);
    } else {
      alert("Incorrect password. Redirecting...");
      navigate("/login"); // or use navigate("/") to go home
    }
  }, [navigate]);

  if (!authorized) return null;

  return (
    <div style={{ color: "white", padding: "2rem", backgroundColor: "#000", minHeight: "100vh" }}>
      <h1>🎮 Welcome to the Game Host Panel</h1>
      {/* All your host tools go here */}
    </div>
  );
}

import React from "react";
import GamePlay from "./GamePlay"; // or correct path if it's in a folder

export default function PlayPage() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "2rem" }}>
      <GamePlay />
    </div>
  );
}
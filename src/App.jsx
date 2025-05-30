<h1 className="text-4xl text-blue-600 font-bold text-center mb-6">TAILWIND IS WORKING</h1>

import React from "react";
import AudioTrimmer from "./Pages/AudioTrimmer";

function App() {
  const handleTrimmedAudio = ({ file, startTime, endTime, blobUrl }) => {
    console.log("🎵 Trimmed Audio Info:");
    console.log("File:", file);
    console.log("Start:", startTime);
    console.log("End:", endTime);
    console.log("Blob URL:", blobUrl);
    const audio = new Audio(blobUrl);
    audio.currentTime = startTime;
    audio.play();

    // Auto-stop after the selected time
    const stopTime = () => {
      if (audio.currentTime >= endTime) {
        audio.pause();
      } else {
        requestAnimationFrame(stopTime);
      }
    };
    stopTime();
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ color: "#0ff" }}>🎧 Waveform Audio Trimmer</h1>
      <AudioTrimmer onTrimmed={handleTrimmedAudio} />
    </div>
  );
}

export default App;
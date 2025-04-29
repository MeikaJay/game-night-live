import React, { useState, useEffect } from "react";

export default function DisplaySettings() {
  const [fontColor, setFontColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState("24");
  const [textAlign, setTextAlign] = useState("center");
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("displaySettings")) || {};
    setFontColor(saved.fontColor || "#ffffff");
    setFontSize(saved.fontSize || "24");
    setTextAlign(saved.textAlign || "center");
    setIsFullscreen(saved.isFullscreen !== false); // default true
    setBackgroundImage(saved.backgroundImage || "");
    setBackgroundPreview(saved.backgroundImage || "");
  }, []);

  const handleSave = () => {
    const settings = {
      fontColor,
      fontSize,
      textAlign,
      isFullscreen,
      backgroundImage,
    };
    localStorage.setItem("displaySettings", JSON.stringify(settings));
    alert("✅ Display settings saved!");
  };

  const handleReset = () => {
    setFontColor("#ffffff");
    setFontSize("24");
    setTextAlign("center");
    setIsFullscreen(true);
    setBackgroundImage("");
    setBackgroundPreview("");
    localStorage.removeItem("displaySettings");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundImage(reader.result);
      setBackgroundPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#111",
        color: "#fff",
        backgroundImage: backgroundPreview ? `url(${backgroundPreview})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        🎨 Display Settings
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>🖍️ Font Color:</label>
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>🔠 Font Size:</label>
        <input
          type="number"
          min="12"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          style={{ marginLeft: "1rem", padding: "0.25rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>🧭 Text Alignment:</label>
        <select
          value={textAlign}
          onChange={(e) => setTextAlign(e.target.value)}
          style={{ marginLeft: "1rem", padding: "0.25rem" }}
        >
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
          <option value="top">Top</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>🖼️ Upload Background:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginLeft: "1rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>🖥️ Fullscreen Layout:</label>
        <input
          type="checkbox"
          checked={isFullscreen}
          onChange={(e) => setIsFullscreen(e.target.checked)}
          style={{ marginLeft: "1rem" }}
        />
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "green",
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          ✅ Save Settings
        </button>

        <button
          onClick={handleReset}
          style={{
            backgroundColor: "red",
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          🔄 Reset to Default
        </button>
      </div>
    </div>
  );
}
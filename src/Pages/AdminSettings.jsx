import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const navigate = useNavigate();

  const [fontColor, setFontColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [bgImage, setBgImage] = useState("");
  const [logo, setLogo] = useState("");
  const [signupLogo, setSignupLogo] = useState("");
  const [signupBG, setSignupBG] = useState("");

  useEffect(() => {
    setFontColor(localStorage.getItem("fontColor") || "#ffffff");
    setBgColor(localStorage.getItem("bgColor") || "#000000");
    setBgImage(localStorage.getItem("bgImage") || "");
    setLogo(localStorage.getItem("welcomeLogo") || "");
    setSignupLogo(localStorage.getItem("signupLogo") || "");
    setSignupBG(localStorage.getItem("signupBG") || "");
  }, []);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      switch (type) {
        case "background":
          localStorage.setItem("bgImage", result);
          setBgImage(result);
          break;
        case "logo":
          localStorage.setItem("welcomeLogo", result);
          setLogo(result);
          break;
        case "signupLogo":
          localStorage.setItem("signupLogo", result);
          setSignupLogo(result);
          break;
        case "signupBG":
          localStorage.setItem("signupBG", result);
          setSignupBG(result);
          break;
        default:
          break;
      }
    };
    reader.readAsDataURL(file);
  };

  const saveChanges = () => {
    localStorage.setItem("fontColor", fontColor);
    localStorage.setItem("bgColor", bgColor);
    alert("✅ Display settings saved!");
  };

  const resetGameState = () => {
    if (window.confirm("Are you sure you want to reset all game data?")) {
      localStorage.removeItem("selectedGame");
      localStorage.removeItem("activeContestant");
      localStorage.removeItem("scores");
      localStorage.removeItem("questions");
      alert("✅ Game data reset!");
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", backgroundColor: "#111", color: "white", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "cyan" }}>🎨 Customize Game Display</h1>

      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        <label style={{ display: "block", margin: "1rem 0" }}>
          🖋️ Font Color:
          <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} style={{ marginLeft: "1rem" }} />
        </label>

        <label style={{ display: "block", margin: "1rem 0" }}>
          🎨 Background Color:
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ marginLeft: "1rem" }} />
        </label>

        <label style={{ display: "block", margin: "1rem 0" }}>
          🖼️ Upload Background Image:
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "background")} style={{ marginLeft: "1rem" }} />
        </label>

        <label style={{ display: "block", margin: "1rem 0" }}>
          🚀 Upload Logo for Welcome Page:
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "logo")} style={{ marginLeft: "1rem" }} />
        </label>

        <label style={{ display: "block", margin: "1rem 0" }}>
          ✍️ Upload Logo for Signup Page:
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "signupLogo")} style={{ marginLeft: "1rem" }} />
        </label>

        <label style={{ display: "block", margin: "1rem 0" }}>
          🌅 Upload Background for Signup Page:
          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "signupBG")} style={{ marginLeft: "1rem" }} />
        </label>

        <button onClick={saveChanges} style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", backgroundColor: "green", borderRadius: "8px", fontWeight: "bold" }}>
          💾 Save Settings
        </button>
      </div>

      <hr style={{ margin: "2rem 0", borderColor: "#333" }} />

      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "yellow" }}>🔧 Admin Tools</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        <button onClick={() => navigate("/admin/contestants")} style={buttonStyle}>👥 Manage Contestants</button>
        <button onClick={() => navigate("/admin/setup")} style={buttonStyle}>🎲 Setup Game Wheel</button>
        <button onClick={() => navigate("/admin/questions")} style={buttonStyle}>❓ Manage Questions</button>
        <button onClick={() => navigate("/admin/panel")} style={buttonStyle}>🏠 Admin Panel</button>
        <button onClick={resetGameState} style={{ ...buttonStyle, backgroundColor: "#900" }}>🔄 Reset Game Data</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "1rem 1.5rem",
  backgroundColor: "#444",
  color: "#fff",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  minWidth: "200px",
};
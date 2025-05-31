import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Trying to login...");

    if (password === "Peacelove082420!") {
      console.log("Password is correct. Logging in...");
      localStorage.setItem("authenticated", "true");

      try {
        navigate("/admin");
      } catch (e) {
        console.warn("navigate failed, using window.location instead");
        window.location.href = "/admin";
      }
    } else {
      console.log("Incorrect password");
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#111",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>Enter Host Password</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            fontSize: "16px",
            width: "250px",
            textAlign: "center",
          }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "limegreen",
            color: "#000",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
}

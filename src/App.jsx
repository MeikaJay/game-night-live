import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import GamePlay from "./Pages/GamePlay";
import GamesPage from "./Pages/GamesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [authenticated, setAuthenticated] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("authenticated");
    setAuthenticated(loggedIn === "true");
    setCheckingAuth(false);
  }, []);

  const handleAuth = () => {
    localStorage.setItem("authenticated", "true");
    setAuthenticated(true);
  };

  if (checkingAuth) {
    return <div style={{ color: "white", padding: "2rem" }}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setAuthenticated={handleAuth} />} />
        <Route path="/games" element={<GamesPage />} />
        <Route
          path="/play"
          element={
            <ProtectedRoute authenticated={authenticated}>
              <GamePlay />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

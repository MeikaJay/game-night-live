import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

// Admin Pages
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminEpisodeSetup from "./Pages/AdminEpisodeSetup.jsx";
import AdminSettings from "./Pages/AdminSettings.jsx";
import AdminPanel from "./Pages/AdminPanel.jsx";
import DisplaySettings from "./Pages/DisplaySettings.jsx";
import WheelSetup from "./Pages/WheelSetup.jsx";
import QuestionManager from "./Pages/QuestionManager.jsx";
import ContestantManager from "./Pages/ContestantManager.jsx";
import CheatSheet from "./Pages/CheatSheet.jsx";
import ScoringDashboard from "./Pages/ScoringDashboard.jsx";

// Game Pages
import GameSelector from "./Pages/GameSelector.jsx";
import GameIntro from "./Pages/GameIntro.jsx";
import GamePlay from "./Pages/GamePlay.jsx";
import Wheel from "./Pages/Wheel.jsx";
import Welcome from "./Pages/Welcome.jsx";
import RoundPlay from "./Pages/RoundPlay.jsx";

// Visitor Pages
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/Signup.jsx";
import Feedback from "./Pages/Feedback.jsx";
import Games from "./Pages/Games.jsx";
import Admin from "./Pages/Admin.jsx";
import Login from "./Pages/Login.jsx";

// Auth wrapper
function RequireAuth({ children }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? children : <Login />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/cheatsheet" element={<RequireAuth><CheatSheet /></RequireAuth>} />
        <Route path="/scoring-dashboard" element={<RequireAuth><ScoringDashboard /></RequireAuth>} />
        <Route path="/admin/display" element={<RequireAuth><DisplaySettings /></RequireAuth>} />
        <Route path="/admin/settings" element={<RequireAuth><AdminSettings /></RequireAuth>} />
        <Route path="/admin/panel" element={<RequireAuth><AdminPanel /></RequireAuth>} />
        <Route path="/admin/setup" element={<RequireAuth><AdminEpisodeSetup /></RequireAuth>} />
        <Route path="/admin/questions" element={<RequireAuth><QuestionManager /></RequireAuth>} />
        <Route path="/admin/contestants" element={<RequireAuth><ContestantManager /></RequireAuth>} />
        <Route path="/admin/wheel-setup" element={<RequireAuth><WheelSetup /></RequireAuth>} />
        <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />

        {/* Gameplay */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/intro" element={<GameIntro />} />
        <Route path="/play" element={<GamePlay />} />
        <Route path="/wheel" element={<Wheel />} />
        <Route path="/round" element={<RoundPlay />} />

        {/* Visitor Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/games" element={<Games />} />
        <Route path="/host" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

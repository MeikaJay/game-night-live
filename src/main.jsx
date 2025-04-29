import WheelSetup from "./Pages/WheelSetup";
import Welcome from "./Pages/Welcome.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GameSelector from "./Pages/GameSelector.jsx";
import GameIntro from "./Pages/GameIntro.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AdminEpisodeSetup from "./Pages/AdminEpisodeSetup.jsx";
import GamePlay from "./Pages/GamePlay.jsx";
import Login from "./Pages/Login.jsx";
import Wheel from "./Pages/Wheel.jsx";
import DisplaySettings from "./Pages/DisplaySettings.jsx";
import AdminSettings from "./Pages/AdminSettings.jsx";
import AdminPanel from "./Pages/AdminPanel.jsx";
import QuestionManager from "./Pages/QuestionManager.jsx";
import ContestantManager from "./Pages/ContestantManager.jsx";
import RoundPlay from "./Pages/RoundPlay.jsx";
import CheatSheet from "./Pages/CheatSheet.jsx";
import ScoringDashboard from "./Pages/ScoringDashboard.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/admin/cheatsheet" element={<CheatSheet />} />
      <Route path="/scoring-dashboard" element={<ScoringDashboard />} />
      <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<GameSelector />} />
        <Route path="/admin/wheel-setup" element={<WheelSetup />} />
        <Route path="/intro" element={<GameIntro />} />
        <Route path="/play" element={<GamePlay />} />
        <Route path="/wheel" element={<Wheel />} />
        <Route path="/admin" element={localStorage.getItem("authenticated") === "true" ? <AdminDashboard /> : <Login />} />
        <Route path="/admin/display" element={<DisplaySettings />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
        <Route path="/admin/setup" element={<AdminEpisodeSetup />} />
        <Route path="/admin/questions" element={<QuestionManager />} />
        <Route path="/admin/contestants" element={<ContestantManager />} />
        <Route path="/round" element={<RoundPlay />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
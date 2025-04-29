import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScoringDashboard() {
  const navigate = useNavigate();

  const [contestants, setContestants] = useState(["Contestant 1", "Contestant 2"]);
  const [scores, setScores] = useState({
    "Contestant 1": 0,
    "Contestant 2": 0,
  });

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("scores")) || {};
    const storedContestants = JSON.parse(localStorage.getItem("contestants")) || {};

    const names = [
      storedContestants.contestant1 || "Contestant 1",
      storedContestants.contestant2 || "Contestant 2"
    ];
    setContestants(names);

    setScores({
      [names[0]]: storedScores[names[0]] || 0,
      [names[1]]: storedScores[names[1]] || 0,
    });
  }, []);

  const handleScoreChange = (name, value) => {
    const updatedScores = {
      ...scores,
      [name]: Math.max(0, parseInt(value) || 0),
    };
    setScores(updatedScores);
    localStorage.setItem("scores", JSON.stringify(updatedScores));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-800 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Game Night Live – Scoreboard</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/admin")}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            🏠 Admin Home
          </button>
          <button
            onClick={() => navigate("/play")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            🎮 Back to Game
          </button>
        </div>
      </div>

      <div className="bg-white text-black max-w-3xl mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-6 text-purple-700">Live Scores</h2>

        {contestants.map((name, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-purple-800">{name}</span>
            <input
              type="number"
              value={scores[name]}
              onChange={(e) => handleScoreChange(name, e.target.value)}
              className="w-24 text-center p-2 border border-purple-300 rounded"
            />
          </div>
        ))}

        <div className="mt-6 text-center text-green-600 font-semibold text-xl">
          Total Score:{" "}
          {Object.values(scores).reduce((total, val) => total + val, 0)}
        </div>
      </div>
    </div>
  );
}
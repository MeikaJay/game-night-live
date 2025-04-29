import React, { useEffect, useState } from 'react';

export default function AdminEpisodeSetup() {
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('allGames')) || [];
    setAllGames(savedGames);
    // Always include all games for this episode
    localStorage.setItem('originalGames', JSON.stringify(savedGames));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">🎲 Episode Game Setup</h1>
      <p className="text-lg text-gray-800 mb-4">
        ✅ All games you’ve created are automatically included in the wheel and round play.
      </p>

      <ul className="list-disc list-inside text-left text-purple-800 text-lg">
        {allGames.map((game, i) => (
          <li key={i}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
}
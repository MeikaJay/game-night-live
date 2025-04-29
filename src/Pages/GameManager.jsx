import React, { useState, useEffect } from 'react';

export default function GameManager() {
  const [games, setGames] = useState([]);
  const [newGameName, setNewGameName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('games');
    if (saved) {
      setGames(JSON.parse(saved));
    }
  }, []);

  const saveGames = (updated) => {
    setGames(updated);
    localStorage.setItem('games', JSON.stringify(updated));
  };

  const addGame = () => {
    if (!newGameName.trim()) return;
    const newGame = { name: newGameName.trim(), questions: [] };
    saveGames([...games, newGame]);
    setNewGameName('');
  };

  const deleteGame = (name) => {
    const filtered = games.filter((g) => g.name !== name);
    saveGames(filtered);
  };

  const editGameName = (index, newName) => {
    const updated = [...games];
    updated[index].name = newName;
    saveGames(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🎮 Manage Your Games</h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={newGameName}
          onChange={(e) => setNewGameName(e.target.value)}
          placeholder="Add new game..."
          className="flex-grow p-2 border border-purple-300 rounded"
        />
        <button
          onClick={addGame}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          ➕ Add Game
        </button>
      </div>

      {games.length === 0 && (
        <p className="text-gray-600">No games added yet.</p>
      )}

      <ul className="space-y-4">
        {games.map((game, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 rounded p-4 flex justify-between items-center shadow-sm"
          >
            <input
              type="text"
              value={game.name}
              onChange={(e) => editGameName(index, e.target.value)}
              className="text-lg font-medium text-purple-800 flex-grow mr-4 bg-transparent focus:outline-none"
            />
            <button
              onClick={() => deleteGame(game.name)}
              className="text-red-500 hover:text-red-700 font-bold text-xl"
              title="Delete game"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <p className="text-green-600 mt-4 font-medium">
        ✅ Changes are saved automatically.
      </p>
    </div>
  );
}
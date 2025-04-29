import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ name: '', description: '' });

  useEffect(() => {
    const saved = localStorage.getItem('games');
    if (saved) {
      setGames(JSON.parse(saved));
    }
  }, []);

  const handleAddGame = () => {
    if (!newGame.name || !newGame.description) return;
    if (games.length >= 10) {
      alert("You can only add up to 10 games.");
      return;
    }

    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    localStorage.setItem('games', JSON.stringify(updatedGames));
    setNewGame({ name: '', description: '' });
  };

  const handleDelete = (index) => {
    const updated = [...games];
    updated.splice(index, 1);
    setGames(updated);
    localStorage.setItem('games', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🛠️ Admin Dashboard</h1>

      <div className="bg-white p-4 rounded shadow max-w-xl mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Game</h2>
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Game name"
          value={newGame.name}
          onChange={(e) =>
            setNewGame({ ...newGame, name: e.target.value })
          }
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          placeholder="Game description"
          value={newGame.description}
          onChange={(e) =>
            setNewGame({ ...newGame, description: e.target.value })
          }
        />
        <button
          onClick={handleAddGame}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Game
        </button>
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Current Games</h2>
        {games.length === 0 && <p>No games added yet.</p>}
        {games.map((game, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{game.name}</p>
              <p className="text-sm text-gray-600">{game.description}</p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
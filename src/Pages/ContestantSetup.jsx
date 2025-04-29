import React, { useEffect, useState } from 'react';

export default function ContestantSetup() {
  const [contestants, setContestants] = useState(['Contestant 1', 'Contestant 2']);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contestants'));
    if (stored && Array.isArray(stored)) {
      setContestants(stored);
    }
  }, []);

  const handleChange = (index, value) => {
    const updated = [...contestants];
    updated[index] = value;
    setContestants(updated);
  };

  const saveContestants = () => {
    localStorage.setItem('contestants', JSON.stringify(contestants));
    alert('Contestant names saved!');
  };

  return (
    <div className="min-h-screen p-6 bg-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">🧑‍🤝‍🧑 Update Contestants</h1>

      <div className="space-y-4 w-full max-w-md">
        {contestants.map((name, index) => (
          <div key={index}>
            <label className="block font-semibold mb-1">Contestant {index + 1}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Contestant ${index + 1}`}
            />
          </div>
        ))}

        <button
          onClick={saveContestants}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded"
        >
          💾 Save Contestants
        </button>
      </div>
    </div>
  );
}
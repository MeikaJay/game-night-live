import React, { useState, useEffect } from 'react';

export default function ContestantManager() {
  const [contestants, setContestants] = useState({ contestant1: '', contestant2: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('contestants')) || {
      contestant1: '',
      contestant2: ''
    };
    setContestants(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestants((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('contestants', JSON.stringify(contestants));
    alert('✅ Contestant names saved!');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-purple-100 text-black p-6">
      <h1 className="text-3xl font-bold mb-6">👥 Update Contestants</h1>

      <div className="space-y-4 w-full max-w-md">
        <input
          type="text"
          name="contestant1"
          value={contestants.contestant1}
          onChange={handleChange}
          placeholder="Enter Contestant 1"
          className="w-full p-3 rounded border border-gray-300"
        />
        <input
          type="text"
          name="contestant2"
          value={contestants.contestant2}
          onChange={handleChange}
          placeholder="Enter Contestant 2"
          className="w-full p-3 rounded border border-gray-300"
        />
        <button
          onClick={handleSave}
          className="bg-purple-700 text-white px-6 py-3 rounded hover:bg-purple-800"
        >
          💾 Save Contestants
        </button>
      </div>
    </div>
  );
}
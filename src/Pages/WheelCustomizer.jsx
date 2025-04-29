import React, { useEffect, useState } from 'react';

export default function WheelCustomizer() {
  const [wheelSettings, setWheelSettings] = useState({
    primaryColor: '#FF6347',
    secondaryColor: '#FFD700',
    font: 'Arial',
    logoUrl: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('wheelSettings');
    if (saved) {
      setWheelSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (key, value) => {
    const updated = { ...wheelSettings, [key]: value };
    setWheelSettings(updated);
    localStorage.setItem('wheelSettings', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-700">🎡 Customize Your Wheel</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Primary Color:</label>
          <input
            type="color"
            value={wheelSettings.primaryColor}
            onChange={(e) => handleChange('primaryColor', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Secondary Color:</label>
          <input
            type="color"
            value={wheelSettings.secondaryColor}
            onChange={(e) => handleChange('secondaryColor', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Font:</label>
          <select
            value={wheelSettings.font}
            onChange={(e) => handleChange('font', e.target.value)}
            className="w-full p-2 rounded"
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Courier New">Courier New</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Logo URL (optional):</label>
          <input
            type="text"
            value={wheelSettings.logoUrl}
            onChange={(e) => handleChange('logoUrl', e.target.value)}
            className="w-full p-2 rounded"
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>

      {wheelSettings.logoUrl && (
        <div className="mt-6">
          <p className="font-semibold mb-2">Logo Preview:</p>
          <img
            src={wheelSettings.logoUrl}
            alt="Wheel Logo"
            className="max-w-xs rounded shadow"
          />
        </div>
      )}

      <p className="text-green-600 mt-4 font-medium">
        ✅ Settings are saved automatically.
      </p>
    </div>
  );
}
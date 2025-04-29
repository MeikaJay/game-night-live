import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
  const navigate = useNavigate();

  const buttons = [
    { label: '🎮 Game Setup', path: '/admin/setup' },
    { label: '🎡 Wheel Customizer', path: '/wheel' },
    { label: '🎨 Display & Style Settings', path: '/admin/display' },
    { label: '👥 Contestant Setup', path: '/admin/contestants' },
    { label: '🚀 Launch GamePlay', path: '/play' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 p-10 text-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-800">🛠️ Admin Control Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => navigate(btn.path)}
            className="bg-white hover:bg-purple-200 text-purple-700 font-semibold py-5 px-6 rounded-lg shadow-md text-xl transition-all"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <p className="mt-12 text-sm text-gray-500">
        Game Night Live Admin | Designed by Meika Jay 🎤🎬
      </p>
    </div>
  );
}
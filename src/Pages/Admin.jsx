import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-6">🎤 Host Dashboard - Game Night Live</h1>
      <p className="mb-6 text-lg">Welcome back, Meika Jay! Let’s get things rolling.</p>
      
      <div className="grid gap-4 max-w-xl mx-auto">
        <Link to="/admin/panel" className="block bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          🎮 Game Panel
        </Link>
        <Link to="/admin/wheel-setup" className="block bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
          🌀 Spin the Wheel
        </Link>
        <Link to="/admin/questions" className="block bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
          ❓ Question Manager
        </Link>
        <Link to="/scoring-dashboard" className="block bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600">
          📊 Score Dashboard
        </Link>
        <Link to="/admin/contestants" className="block bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700">
          🙋 Contestant Manager
        </Link>
        <Link to="/admin/settings" className="block bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-800">
          ⚙️ Admin Settings
        </Link>
      </div>
    </div>
  );
}
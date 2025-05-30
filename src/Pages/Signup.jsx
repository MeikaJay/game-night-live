import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    social: "",
    challenge: "",
    dual: "",
    about: "",
    is21: false,
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.social || !formData.is21 || !formData.agree) {
      alert("Please complete all required fields.");
      return;
    }
    alert("Thanks for signing up! We’ll reach out soon.");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-3xl">
        <div className="text-center mb-6">
          <img src="/your-logo.png" alt="Game Night Live" className="h-12 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-gray-800">Game Night Live Signup</h2>
          <p className="text-sm text-gray-500">Sign up to be a contestant on the next episode</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="text-sm font-medium block mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Your full name"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium block mb-1">Email Address*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Phone Number (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="(xxx) xxx-xxxx"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">City & State</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Las Vegas, NV"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium block mb-1">Social Media Handle*</label>
            <input
              type="text"
              name="social"
              value={formData.social}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="@yourhandle"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Want to challenge someone?</label>
            <input
              type="text"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter their name"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Dual Registration (optional)</label>
            <input
              type="text"
              name="dual"
              value={formData.dual}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Registering with someone?"
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium block mb-1">
              Tell us about yourself (songs, movies, hobbies)
            </label>
            <textarea
              name="about"
              rows={3}
              value={formData.about}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="I love old school R&B, movies like Love & Basketball, and I freestyle on the side..."
            />
          </div>

          <div className="col-span-2 space-y-3 text-sm text-gray-700">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="is21"
                checked={formData.is21}
                onChange={handleChange}
                required
              />
              I confirm that I am 21 years of age or older.
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              I give Game Night Live permission to reuse my audio/video content on social media. My personal data will remain private.
            </label>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
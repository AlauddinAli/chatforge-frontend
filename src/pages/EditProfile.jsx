// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Load current user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name || "");
        setEmail(decoded.email || "");
      } catch (err) {
        console.error("JWT decode failed:", err);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Updated: ${name}, ${email}`);
    // later -> send PUT request to backend to update profile
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name || "Unknown",
          email: decoded.email || "No email",
        });
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-400">{user.email}</p>

        <div className="mt-6 flex justify-around text-sm text-gray-400">
          <div>
            <span className="block text-lg font-bold text-white">42</span>
            Messages
          </div>
          <div>
            <span className="block text-lg font-bold text-white">3</span>
            Rooms
          </div>
        </div>

  <button
    onClick={() => navigate("/edit-profile")}
    className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
  >
    Edit Profile
  </button>




      </div>
    </div>
  );
}


// // src/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

//   // Reload user data whenever page is visited
//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser({
//           name: decoded.name || "Unknown",
//           email: decoded.email || "No email",
//         });
//       } catch (err) {
//         console.error("Failed to decode token:", err);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
//       {/* Animated background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
//       {/* Floating orbs */}
//       <div className="absolute top-10 left-5 w-48 h-48 md:w-72 md:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-10 right-5 w-48 h-48 md:w-72 md:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

//       <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
//         <div className="w-full max-w-md">
//           {/* Back Button */}
//           <button
//             onClick={() => navigate("/dashboard")}
//             className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
//           >
//             <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
//             <span className="text-sm">Back to Dashboard</span>
//           </button>

//           {/* Profile Card */}
//           <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl animate-fadeIn">
//             {/* Avatar */}
//             <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-6">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
//               <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-4xl md:text-5xl font-bold shadow-2xl">
//                 {user.name?.charAt(0).toUpperCase()}
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="text-center mb-8">
//               <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
//                 {user.name}
//               </h2>
//               <p className="text-gray-300 text-sm md:text-base break-all px-4">
//                 {user.email}
//               </p>
//             </div>

//             {/* Quick Info Cards */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group">
//                 <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
//                 <div className="text-xs text-gray-400">Account Type</div>
//                 <div className="text-sm font-semibold text-purple-300">Premium</div>
//               </div>
              
//               <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group">
//                 <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
//                 <div className="text-xs text-gray-400">Status</div>
//                 <div className="text-sm font-semibold text-green-400">Active</div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button
//                 onClick={() => navigate("/edit-profile")}
//                 className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
//               >
//                 <span>✏️</span>
//                 <span>Edit Profile</span>
//               </button>

//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="w-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
//               >
//                 <span>💬</span>
//                 <span>Go to Chat</span>
//               </button>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="mt-6 text-center text-gray-400 text-sm">
//             <p>Member since {new Date().getFullYear()}</p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }





// src/pages/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function EditProfile() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setName(decoded.name || "");
        setEmail(decoded.email || "");
        setUserId(decoded.id || decoded._id || null);
      } catch (err) {
        console.error("JWT decode failed:", err);
        setError("Failed to load user data");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const updateData = {
        name: name.trim(),
        email: email.trim(),
      };

      // Only include password if user wants to change it
      if (newPassword) {
        if (!currentPassword) {
          setError("Please enter your current password to change it");
          setLoading(false);
          return;
        }
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const response = await api.put("/users/profile", updateData);
      
      // Update localStorage with new token if backend sends one
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Notify Socket.io about username change
      const socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => {
        const currentRoom = localStorage.getItem("currentRoom") || "general";
        
        socket.emit("updateUsername", {
          room: currentRoom,
          userId: userId,
          newUsername: name.trim(),
        });

        socket.disconnect();
      });

      setSuccess("Profile updated successfully! Redirecting...");
      
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme.colors.bgMain} relative overflow-hidden`}>
      {/* Animated background */}
      <div className={`absolute inset-0 ${theme.colors.bgAnimated} animate-pulse`}></div>
      
      {/* Floating orbs */}
      <div className={`absolute top-10 left-5 w-48 h-48 md:w-72 md:h-72 ${theme.colors.bgOrb1} rounded-full blur-3xl animate-pulse`}></div>
      <div className={`absolute bottom-10 right-5 w-48 h-48 md:w-72 md:h-72 ${theme.colors.bgOrb2} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/profile")}
            className={`mb-6 flex items-center gap-2 ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-colors group`}
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-sm">Back to Profile</span>
          </button>

          {/* Edit Profile Card */}
          <div className={`${theme.colors.bgCard} rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${theme.colors.textGradient}`}>
              Edit Profile ✏️
            </h2>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme.colors.textSecondary}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`w-full p-3 rounded-xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme.colors.textSecondary}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-3 rounded-xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${theme.colors.borderSecondary}`}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-2 backdrop-blur-xl bg-gray-900/50 ${theme.colors.textMuted}`}>
                    Change Password (Optional)
                  </span>
                </div>
              </div>

              {/* Current Password */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme.colors.textSecondary}`}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className={`block text-sm font-semibold mb-2 ${theme.colors.textSecondary}`}>
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full p-3 rounded-xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition`}
                  placeholder="Enter new password"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full ${theme.colors.bgButton} py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className={`w-full ${theme.colors.bgButtonSecondary} py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

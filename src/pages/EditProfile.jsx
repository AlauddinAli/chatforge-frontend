// // src/pages/EditProfile.jsx
// import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function EditProfile() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setName(decoded.name || "");
//         setEmail(decoded.email || "");
//       } catch (err) {
//         console.error("JWT decode failed:", err);
//         setError("Failed to load user data");
//       }
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const updateData = {
//         name: name.trim(),
//         email: email.trim(),
//       };

//       // Only include password if user wants to change it
//       if (newPassword) {
//         if (!currentPassword) {
//           setError("Please enter your current password to change it");
//           setLoading(false);
//           return;
//         }
//         updateData.currentPassword = currentPassword;
//         updateData.newPassword = newPassword;
//       }

//       const response = await api.put("/users/profile", updateData);
      
//       // Update localStorage with new token if backend sends one
//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//       }

//       setSuccess("Profile updated successfully! Redirecting...");
//       setTimeout(() => {
//         navigate("/profile");
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
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
//             onClick={() => navigate("/profile")}
//             className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
//           >
//             <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
//             <span className="text-sm">Back to Profile</span>
//           </button>

//           {/* Edit Profile Card */}
//           <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Edit Profile ✏️
//             </h2>

//             {/* Error Message */}
//             {error && (
//               <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Success Message */}
//             {success && (
//               <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm">
//                 {success}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {/* Name Input */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2 text-gray-300">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               {/* Email Input */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2 text-gray-300">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               {/* Divider */}
//               <div className="relative py-4">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-white/20"></div>
//                 </div>
//                 <div className="relative flex justify-center text-xs">
//                   <span className="px-2 backdrop-blur-xl bg-gray-900/50 text-gray-400">
//                     Change Password (Optional)
//                   </span>
//                 </div>
//               </div>

//               {/* Current Password */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2 text-gray-300">
//                   Current Password
//                 </label>
//                 <input
//                   type="password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//                   placeholder="Enter current password"
//                 />
//               </div>

//               {/* New Password */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2 text-gray-300">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
//                   placeholder="Enter new password"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="space-y-3 pt-4">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Saving...
//                     </span>
//                   ) : (
//                     "Save Changes"
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => navigate("/profile")}
//                   className="w-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
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
import api from "../api/axios";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export default function EditProfile() {
  const navigate = useNavigate();
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

      // 🔥 FIX: Notify Socket.io about username change
      const socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
      });

      socket.on("connect", () => {
        // Get current room from localStorage or default to 'general'
        const currentRoom = localStorage.getItem("currentRoom") || "general";
        
        // Emit username update event
        socket.emit("updateUsername", {
          room: currentRoom,
          userId: userId,
          newUsername: name.trim(),
        });

        socket.disconnect();
      });

      setSuccess("Profile updated successfully! Redirecting...");
      
      // Force page reload to update sidebar
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-5 w-48 h-48 md:w-72 md:h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 md:w-72 md:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={() => navigate("/profile")}
            className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-sm">Back to Profile</span>
          </button>

          {/* Edit Profile Card */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Enter your email"
                />
              </div>

              {/* Divider */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 backdrop-blur-xl bg-gray-900/50 text-gray-400">
                    Change Password (Optional)
                  </span>
                </div>
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Enter new password"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
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
                  className="w-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
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

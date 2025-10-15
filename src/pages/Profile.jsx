// // // src/pages/Profile.jsx
// // import React, { useEffect, useState } from "react";
// // import { jwtDecode } from "jwt-decode";
// // import { useNavigate } from "react-router-dom";

// // export default function Profile() {
// //   const navigate = useNavigate();

// //   const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode(token);
// //         setUser({
// //           name: decoded.name || "Unknown",
// //           email: decoded.email || "No email",
// //         });
// //       } catch (err) {
// //         console.error("Failed to decode token:", err);
// //       }
// //     }
// //   }, []);

// //   return (
// //     <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
// //       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
// //         <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
// //           {user.name?.charAt(0).toUpperCase()}
// //         </div>
// //         <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
// //         <p className="text-gray-400">{user.email}</p>

// //         <div className="mt-6 flex justify-around text-sm text-gray-400">
// //           <div>
// //             <span className="block text-lg font-bold text-white">42</span>
// //             Messages
// //           </div>
// //           <div>
// //             <span className="block text-lg font-bold text-white">3</span>
// //             Rooms
// //           </div>
// //         </div>

// //   <button
// //     onClick={() => navigate("/edit-profile")}
// //     className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
// //   >
// //     Edit Profile
// //   </button>




// //       </div>
// //     </div>
// //   );
// // }
// // src/pages/Profile.jsx
// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const navigate = useNavigate();

//   const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

//   useEffect(() => {
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
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4 py-8">
//       <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
//         <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
//           {user.name?.charAt(0).toUpperCase()}
//         </div>
        
//         <h2 className="text-xl md:text-2xl font-bold mt-4 break-words">
//           {user.name}
//         </h2>
//         <p className="text-gray-400 text-sm md:text-base break-all">
//           {user.email}
//         </p>

//         <div className="mt-6 flex justify-around gap-4 text-sm text-gray-400">
//           <div className="flex-1">
//             <span className="block text-lg md:text-xl font-bold text-white">42</span>
//             <span className="text-xs md:text-sm">Messages</span>
//           </div>
//           <div className="flex-1 border-l border-r border-gray-700">
//             <span className="block text-lg md:text-xl font-bold text-white">3</span>
//             <span className="text-xs md:text-sm">Rooms</span>
//           </div>
//           <div className="flex-1">
//             <span className="block text-lg md:text-xl font-bold text-white">12</span>
//             <span className="text-xs md:text-sm">Friends</span>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-2.5 md:py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
//         >
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// }


// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Guest", email: "guest@example.com" });

  // Reload user data whenever page is visited
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
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
            onClick={() => navigate("/dashboard")}
            className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-sm">Back to Dashboard</span>
          </button>

          {/* Profile Card */}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl animate-fadeIn">
            {/* Avatar */}
            <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-4xl md:text-5xl font-bold shadow-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent break-words">
                {user.name}
              </h2>
              <p className="text-gray-300 text-sm md:text-base break-all px-4">
                {user.email}
              </p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                <div className="text-xs text-gray-400">Account Type</div>
                <div className="text-sm font-semibold text-purple-300">Premium</div>
              </div>
              
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-xs text-gray-400">Status</div>
                <div className="text-sm font-semibold text-green-400">Active</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate("/edit-profile")}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                <span>✏️</span>
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Go to Chat</span>
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Member since {new Date().getFullYear()}</p>
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
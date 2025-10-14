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
//     <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
//       <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
//         <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
//           {user.name?.charAt(0).toUpperCase()}
//         </div>
//         <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
//         <p className="text-gray-400">{user.email}</p>

//         <div className="mt-6 flex justify-around text-sm text-gray-400">
//           <div>
//             <span className="block text-lg font-bold text-white">42</span>
//             Messages
//           </div>
//           <div>
//             <span className="block text-lg font-bold text-white">3</span>
//             Rooms
//           </div>
//         </div>

//   <button
//     onClick={() => navigate("/edit-profile")}
//     className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
//   >
//     Edit Profile
//   </button>




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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold mt-4 break-words">
          {user.name}
        </h2>
        <p className="text-gray-400 text-sm md:text-base break-all">
          {user.email}
        </p>

        <div className="mt-6 flex justify-around gap-4 text-sm text-gray-400">
          <div className="flex-1">
            <span className="block text-lg md:text-xl font-bold text-white">42</span>
            <span className="text-xs md:text-sm">Messages</span>
          </div>
          <div className="flex-1 border-l border-r border-gray-700">
            <span className="block text-lg md:text-xl font-bold text-white">3</span>
            <span className="text-xs md:text-sm">Rooms</span>
          </div>
          <div className="flex-1">
            <span className="block text-lg md:text-xl font-bold text-white">12</span>
            <span className="text-xs md:text-sm">Friends</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 py-2.5 md:py-3 px-4 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
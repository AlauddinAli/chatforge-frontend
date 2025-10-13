// // // // src/components/Sidebar.jsx
// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // export default function Sidebar({ room, setRoom, onlineUsers }) {
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     localStorage.removeItem("token");
// // //     navigate("/login");
// // //   };

// // //   return (
// // //     <aside className="w-64 bg-gray-800 p-4 flex flex-col">
// // //       <h2 className="text-xl font-bold mb-6">🔥 ChatForge</h2>

// // //       {/* Room Selector */}
// // //       <div className="mb-6">
// // //         <label className="block text-sm font-bold mb-2">Room</label>
// // //         <select
// // //           value={room}
// // //           onChange={(e) => setRoom(e.target.value)}
// // //           className="w-full p-2 rounded bg-gray-700 text-white"
// // //         >
// // //           <option value="general"># General</option>
// // //           <option value="coding"># Coding</option>
// // //           <option value="random"># Random</option>
// // //         </select>
// // //       </div>

// // //       {/* Online Users */}
// // //       <div className="flex-1 overflow-y-auto">
// // //         <h3 className="text-lg font-bold mb-2">🟢 Online Users</h3>
// // //         <ul className="space-y-2">
// // //           {onlineUsers.length > 0 ? (
// // //             onlineUsers.map((user, i) => (
// // //               <li key={i} className="text-sm">
// // //                 {user}
// // //               </li>
// // //             ))
// // //           ) : (
// // //             <li className="text-sm text-gray-400">No users online</li>
// // //           )}
// // //         </ul>
// // //       </div>

// // //       {/* Logout */}
// // //       <button
// // //         onClick={handleLogout}
// // //         className="bg-red-600 hover:bg-red-700 py-2 rounded mt-6"
// // //       >
// // //         Logout
// // //       </button>
// // //     </aside>
// // //   );
// // // }

// // // src/components/Sidebar.jsx
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Sidebar({ room, setRoom, onlineUsers }) {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <aside className="w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
// //       {/* Brand */}
// //       <h2 className="text-2xl font-bold mb-6 text-blue-400">🔥 ChatForge</h2>

// //       {/* Rooms Selector */}
// //       <div className="mb-8">
// //         <h3 className="text-sm font-bold text-gray-300 mb-2">Rooms</h3>
// //         <select
// //           value={room}
// //           onChange={(e) => setRoom(e.target.value)}
// //           className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
// //         >
// //           <option value="general"># General</option>
// //           <option value="coding"># Coding</option>
// //           <option value="random"># Random</option>
// //         </select>
// //       </div>

// //       {/* Online Users */}
// //       <div className="flex-1 overflow-y-auto">
// //         <h3 className="text-sm font-bold text-gray-300 mb-3">🟢 Online Users</h3>
// //         {onlineUsers.length > 0 ? (
// //           <ul className="space-y-2">
// //             {onlineUsers.map((user, idx) => (
// //               <li
// //                 key={idx}
// //                 className="flex items-center gap-2 text-sm bg-gray-700 p-2 rounded hover:bg-gray-600"
// //               >
// //                 <span className="w-2 h-2 bg-green-400 rounded-full"></span>
// //                 {user}
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="text-gray-500 text-sm italic">No one online</p>
// //         )}
// //       </div>

// //       {/* Navigation + Logout */}
// //       <nav className="mt-6 space-y-4">
// //         <Link
// //           to="/profile"
// //           className="block text-sm hover:text-blue-400 transition"
// //         >
// //           👤 Profile
// //         </Link>
// //       </nav>

// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-600 hover:bg-red-700 py-2 rounded mt-6 text-sm font-bold"
// //       >
// //         Logout
// //       </button>
// //     </aside>
// //   );
// // }




// // src/components/Sidebar.jsx
// import { Link, useNavigate } from "react-router-dom";

// export default function Sidebar({ room, setRoom, onlineUsers, isSidebarOpen, setIsSidebarOpen }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <aside
//       className={`
//         fixed lg:static top-0 left-0 h-full
//         w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700
//         transform transition-transform duration-300 ease-in-out z-50
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//       `}
//     >
//       {/* 🔥 Close Button - Only visible on mobile */}
//       <button
//         onClick={() => setIsSidebarOpen(false)}
//         className="lg:hidden absolute top-4 right-4 text-white text-2xl focus:outline-none"
//       >
//         ✕
//       </button>

//       {/* Brand */}
//       <h2 className="text-2xl font-bold mb-6 text-blue-400">🔥 ChatForge</h2>

//       {/* Rooms Selector */}
//       <div className="mb-8">
//         <h3 className="text-sm font-bold text-gray-300 mb-2">Rooms</h3>
//         <select
//           value={room}
//           onChange={(e) => {
//             setRoom(e.target.value);
//             setIsSidebarOpen(false); // Close sidebar on mobile after selecting room
//           }}
//           className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
//         >
//           <option value="general"># General</option>
//           <option value="coding"># Coding</option>
//           <option value="random"># Random</option>
//         </select>
//       </div>

//       {/* Online Users */}
//       <div className="flex-1 overflow-y-auto">
//         <h3 className="text-sm font-bold text-gray-300 mb-3">🟢 Online Users</h3>
//         {onlineUsers.length > 0 ? (
//           <ul className="space-y-2">
//             {onlineUsers.map((user, idx) => (
//               <li
//                 key={idx}
//                 className="flex items-center gap-2 text-sm bg-gray-700 p-2 rounded hover:bg-gray-600"
//               >
//                 <span className="w-2 h-2 bg-green-400 rounded-full"></span>
//                 {user}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500 text-sm italic">No one online</p>
//         )}
//       </div>

//       {/* Navigation + Logout */}
//       <nav className="mt-6 space-y-4">
//         <Link
//           to="/profile"
//           onClick={() => setIsSidebarOpen(false)}
//           className="block text-sm hover:text-blue-400 transition"
//         >
//           👤 Profile
//         </Link>
//       </nav>

//       <button
//         onClick={handleLogout}
//         className="bg-red-600 hover:bg-red-700 py-2 rounded mt-6 text-sm font-bold"
//       >
//         Logout
//       </button>
//     </aside>
//   );
// }

//GLASSMORPHISM!!!!!!!!!!!!!!!!!!!!!
// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ room, setRoom, onlineUsers, isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 h-full
        w-64 backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-purple-900/80 
        p-6 flex flex-col border-r border-white/10
        transform transition-transform duration-300 ease-in-out z-50
        shadow-2xl
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Close Button - Mobile */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 text-white text-2xl focus:outline-none hover:text-red-400 transition-colors"
      >
        ✕
      </button>

      {/* Brand */}
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        🔥 ChatForge
      </h2>

      {/* Rooms Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
          <span className="text-purple-400">📂</span> Rooms
        </h3>
        <select
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
            setIsSidebarOpen(false);
          }}
          className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-lg hover:bg-white/15"
        >
          <option value="general" className="bg-gray-800">
            # General
          </option>
          <option value="coding" className="bg-gray-800">
            # Coding
          </option>
          <option value="random" className="bg-gray-800">
            # Random
          </option>
        </select>
      </div>

      {/* Online Users */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Online Users
        </h3>
        {onlineUsers.length > 0 ? (
          <ul className="space-y-2">
            {onlineUsers.map((user, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-all hover:scale-[1.02] shadow-lg group"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping"></span>
                <span className="flex-1">{user}</span>
                <span className="text-xs text-gray-400">●</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic backdrop-blur-xl bg-white/5 p-3 rounded-xl border border-white/10">
            No one online
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-3">
        <Link
          to="/profile"
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 hover:border-blue-400/50 transition-all hover:scale-[1.02] shadow-lg group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
          <span>Profile</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 backdrop-blur-xl py-3 rounded-xl mt-6 text-sm font-bold border border-red-400/30 shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
}
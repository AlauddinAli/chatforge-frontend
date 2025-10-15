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
//         fixed top-16 left-0 h-[calc(100vh-4rem)] 
//         w-64 backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-purple-900/80 
//         p-6 flex flex-col border-r border-white/10
//         transform transition-transform duration-300 ease-in-out z-50
//         shadow-2xl overflow-hidden
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//       `}
//     >
//       {/* Close Button - Mobile */}
//       <button
//         onClick={() => setIsSidebarOpen(false)}
//         className="lg:hidden absolute top-4 right-4 text-white text-2xl focus:outline-none hover:text-red-400 transition-colors"
//       >
//         ✕
//       </button>

//       {/* Brand */}
//       <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0">
//         🔥 ChatForge
//       </h2>

//       {/* Rooms Selector */}
//       <div className="mb-8 flex-shrink-0">
//         <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
//           <span className="text-purple-400">📂</span> Rooms
//         </h3>
//         <select
//           value={room}
//           onChange={(e) => {
//             setRoom(e.target.value);
//             setIsSidebarOpen(false);
//           }}
//           className="w-full p-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-lg hover:bg-white/15"
//         >
//           <option value="general" className="bg-gray-800">
//             # General
//           </option>
//           <option value="coding" className="bg-gray-800">
//             # Coding
//           </option>
//           <option value="random" className="bg-gray-800">
//             # Random
//           </option>
//         </select>
//       </div>

//       {/* Online Users - Scrollable section */}
//       <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
//         <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2 sticky top-0 bg-gradient-to-b from-gray-900/95 to-purple-900/95 backdrop-blur-xl pb-2 z-10">
//           <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//           Online Users
//         </h3>
//         {onlineUsers.length > 0 ? (
//           <ul className="space-y-2 pb-4">
//             {onlineUsers.map((user, idx) => (
//               <li
//                 key={idx}
//                 className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-all hover:scale-[1.02] shadow-lg group"
//               >
//                 <span className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping"></span>
//                 <span className="flex-1 truncate">{user}</span>
//                 <span className="text-xs text-gray-400">●</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500 text-sm italic backdrop-blur-xl bg-white/5 p-3 rounded-xl border border-white/10">
//             No one online
//           </p>
//         )}
//       </div>

//       {/* Navigation - Fixed at bottom */}
//       <nav className="mt-6 space-y-3 flex-shrink-0">
//         <Link
//           to="/profile"
//           onClick={() => setIsSidebarOpen(false)}
//           className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 hover:border-blue-400/50 transition-all hover:scale-[1.02] shadow-lg group"
//         >
//           <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
//           <span>Profile</span>
//         </Link>
//       </nav>

//       {/* Logout Button - Fixed at bottom */}
//       <button
//         onClick={handleLogout}
//         className="w-full bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 backdrop-blur-xl py-3 rounded-xl mt-3 text-sm font-bold border border-red-400/30 shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 flex-shrink-0"
//       >
//         <span>🚪</span> Logout
//       </button>
//     </aside>
//   );
// }

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
        fixed top-16 left-0 h-[calc(100vh-4rem)] 
        w-64 backdrop-blur-2xl bg-gradient-to-b from-gray-900/80 to-purple-900/80 
        p-6 flex flex-col border-r border-white/10
        transform transition-transform duration-300 ease-in-out z-40
        shadow-2xl overflow-hidden
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
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0">
        🔥 ChatForge
      </h2>

      {/* Rooms Selector */}
      <div className="mb-8 flex-shrink-0">
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

      {/* Online Users - Scrollable section */}
      <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
        <h3 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2 sticky top-0 bg-gradient-to-b from-gray-900/95 to-purple-900/95 backdrop-blur-xl pb-2 z-10">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Online Users
        </h3>
        {onlineUsers.length > 0 ? (
          <ul className="space-y-2 pb-4">
            {onlineUsers.map((user, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 transition-all hover:scale-[1.02] shadow-lg group"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping"></span>
                <span className="flex-1 truncate">{user}</span>
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

      {/* Navigation - Fixed at bottom */}
      <nav className="mt-6 space-y-3 flex-shrink-0">
        <Link
          to="/profile"
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center gap-3 text-sm backdrop-blur-xl bg-white/10 border border-white/10 p-3 rounded-xl hover:bg-white/15 hover:border-blue-400/50 transition-all hover:scale-[1.02] shadow-lg group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">👤</span>
          <span>Profile</span>
        </Link>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 backdrop-blur-xl py-3 rounded-xl mt-3 text-sm font-bold border border-red-400/30 shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 flex-shrink-0"
      >
        <span>🚪</span> Logout
      </button>
    </aside>
  );
}
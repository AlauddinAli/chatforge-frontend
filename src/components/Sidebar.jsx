// // // src/components/Sidebar.jsx
// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // export default function Sidebar({ room, setRoom, onlineUsers }) {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <aside className="w-64 bg-gray-800 p-4 flex flex-col">
// //       <h2 className="text-xl font-bold mb-6">🔥 ChatForge</h2>

// //       {/* Room Selector */}
// //       <div className="mb-6">
// //         <label className="block text-sm font-bold mb-2">Room</label>
// //         <select
// //           value={room}
// //           onChange={(e) => setRoom(e.target.value)}
// //           className="w-full p-2 rounded bg-gray-700 text-white"
// //         >
// //           <option value="general"># General</option>
// //           <option value="coding"># Coding</option>
// //           <option value="random"># Random</option>
// //         </select>
// //       </div>

// //       {/* Online Users */}
// //       <div className="flex-1 overflow-y-auto">
// //         <h3 className="text-lg font-bold mb-2">🟢 Online Users</h3>
// //         <ul className="space-y-2">
// //           {onlineUsers.length > 0 ? (
// //             onlineUsers.map((user, i) => (
// //               <li key={i} className="text-sm">
// //                 {user}
// //               </li>
// //             ))
// //           ) : (
// //             <li className="text-sm text-gray-400">No users online</li>
// //           )}
// //         </ul>
// //       </div>

// //       {/* Logout */}
// //       <button
// //         onClick={handleLogout}
// //         className="bg-red-600 hover:bg-red-700 py-2 rounded mt-6"
// //       >
// //         Logout
// //       </button>
// //     </aside>
// //   );
// // }

// // src/components/Sidebar.jsx
// import { Link, useNavigate } from "react-router-dom";

// export default function Sidebar({ room, setRoom, onlineUsers }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <aside className="w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
//       {/* Brand */}
//       <h2 className="text-2xl font-bold mb-6 text-blue-400">🔥 ChatForge</h2>

//       {/* Rooms Selector */}
//       <div className="mb-8">
//         <h3 className="text-sm font-bold text-gray-300 mb-2">Rooms</h3>
//         <select
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
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
        w-64 bg-gray-800 p-6 flex flex-col border-r border-gray-700
        transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* 🔥 Close Button - Only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="lg:hidden absolute top-4 right-4 text-white text-2xl focus:outline-none"
      >
        ✕
      </button>

      {/* Brand */}
      <h2 className="text-2xl font-bold mb-6 text-blue-400">🔥 ChatForge</h2>

      {/* Rooms Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-300 mb-2">Rooms</h3>
        <select
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
            setIsSidebarOpen(false); // Close sidebar on mobile after selecting room
          }}
          className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
        >
          <option value="general"># General</option>
          <option value="coding"># Coding</option>
          <option value="random"># Random</option>
        </select>
      </div>

      {/* Online Users */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-sm font-bold text-gray-300 mb-3">🟢 Online Users</h3>
        {onlineUsers.length > 0 ? (
          <ul className="space-y-2">
            {onlineUsers.map((user, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm bg-gray-700 p-2 rounded hover:bg-gray-600"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {user}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm italic">No one online</p>
        )}
      </div>

      {/* Navigation + Logout */}
      <nav className="mt-6 space-y-4">
        <Link
          to="/profile"
          onClick={() => setIsSidebarOpen(false)}
          className="block text-sm hover:text-blue-400 transition"
        >
          👤 Profile
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 py-2 rounded mt-6 text-sm font-bold"
      >
        Logout
      </button>
    </aside>
  );
}
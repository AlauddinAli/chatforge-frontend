// src/components/Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ room, setRoom, onlineUsers, isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const rooms = ["general", "coding", "random"];

  const handleRoomChange = (newRoom) => {
    setRoom(newRoom);
    setIsSidebarOpen(false);
    localStorage.setItem("currentRoom", newRoom);
  };

  return (
    <aside className={`fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 ${theme.colors.bgSidebar} shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="flex flex-col h-full p-4 md:p-6">
        {/* Profile Button */}
        <button
          onClick={() => {
            navigate("/profile");
            setIsSidebarOpen(false);
          }}
          className={`mb-6 ${theme.colors.bgCard} rounded-2xl p-4 hover:scale-105 transition-all shadow-xl group`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${theme.colors.bgButton} flex items-center justify-center text-xl font-bold shadow-lg group-hover:rotate-12 transition-transform`}>
              👤
            </div>
            <div className="flex-1 text-left">
              <p className={`text-sm font-bold ${theme.colors.textGradient}`}>My Profile</p>
              <p className={`text-xs ${theme.colors.textMuted}`}>View & Edit</p>
            </div>
            <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </div>
        </button>

        {/* Rooms Section */}
        <div className="mb-6">
          <h3 className={`text-xs font-bold ${theme.colors.textMuted} uppercase tracking-wider mb-3 px-2`}>
            Rooms
          </h3>
          <div className="space-y-2">
            {rooms.map((r) => (
              <button
                key={r}
                onClick={() => handleRoomChange(r)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group ${
                  room === r
                    ? `${theme.colors.bgButton} shadow-xl`
                    : `${theme.colors.bgCard} hover:${theme.colors.bgButtonSecondary}`
                }`}
              >
                <span className="text-xl group-hover:scale-125 transition-transform">
                  {r === "general" ? "🌐" : r === "coding" ? "💻" : "🎲"}
                </span>
                <span className="flex-1 capitalize">{r}</span>
                {room === r && <span className="text-green-400">●</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <h3 className={`text-xs font-bold ${theme.colors.textMuted} uppercase tracking-wider mb-3 px-2 flex items-center gap-2`}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Online ({onlineUsers.length})
          </h3>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {onlineUsers.length === 0 ? (
              <p className={`text-xs ${theme.colors.textMuted} italic px-2`}>No users online</p>
            ) : (
              onlineUsers.map((user, idx) => (
                <div
                  key={idx}
                  className={`${theme.colors.bgCard} rounded-xl p-3 hover:scale-105 transition-all group`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${theme.colors.bgButton} flex items-center justify-center text-sm font-bold shadow-md group-hover:rotate-12 transition-transform`}>
                      {user?.charAt(0).toUpperCase()}
                    </div>
                    <span className={`text-sm font-semibold ${theme.colors.textSecondary} truncate flex-1`}>
                      {user}
                    </span>
                    <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-4 pt-4 border-t ${theme.colors.borderSecondary}`}>
          <p className={`text-xs ${theme.colors.textMuted} text-center`}>
            ChatForge v2.0 🔥
          </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </aside>
  );
}




// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "./context/ThemeContext";
import ThemeSelector from "./components/ThemeSelector";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Check token on page load and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const name = decoded?.name || decoded?.email || "";
          setUsername(name);
          setIsLoggedIn(true);
        } catch (err) {
          console.error("Failed to decode token", err);
          setUsername("");
          setIsLoggedIn(false);
        }
      } else {
        setUsername("");
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setShowDropdown(false);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showDropdown]);

  return (
    <div className={`${theme.colors.bgMain} min-h-screen ${theme.colors.textPrimary}`}>
      {/* Navigation Bar */}
      <nav className={`flex justify-between items-center ${theme.colors.bgNavbar} px-4 lg:px-8 py-4 lg:py-5 shadow-2xl ${theme.colors.borderPrimary} border-b fixed w-full z-50`}>
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link 
            to="/" 
            className={`text-xl lg:text-2xl font-black ${theme.colors.textGradient} hover:scale-110 transition-all duration-300 flex items-center gap-2`}
          >
            🔥 <span className="tracking-tight">ChatForge</span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`group relative px-4 py-2 text-sm font-semibold ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all duration-300`}
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            
            {isLoggedIn && (
              <Link 
                to="/dashboard" 
                className={`group relative px-4 py-2 text-sm font-semibold ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all duration-300`}
              >
                <span className="relative z-10">Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Theme Selector + Auth Section */}
<div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
  {/* Theme Selector */}
  <div className="flex-shrink-0">
    <ThemeSelector />
  </div>

  {!isLoggedIn ? (
    <>
      <Link
        to="/register"
        className={`hidden sm:block group relative px-4 py-2.5 text-sm font-semibold ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all duration-300 overflow-hidden rounded-xl whitespace-nowrap`}
      >
        <span className="relative z-10">Register</span>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
      </Link>
      <Link
        to="/login"
        className={`group relative px-4 sm:px-6 py-2.5 text-sm font-bold ${theme.colors.bgButton} rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 whitespace-nowrap`}
      >
        <span className="relative z-10 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
          Sign In
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </>
  ) : (
    <>
      {/* Desktop: Premium User Badge + Logout */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4">
        <div className={`group relative px-4 py-2 ${theme.colors.bgCard} rounded-xl hover:${theme.colors.borderPrimary} transition-all duration-300`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse"></div>
            <span className={`text-xs font-medium ${theme.colors.textMuted}`}>Hello,</span>
            <span className={`text-sm font-bold ${theme.colors.textGradient}`}>
              {username || "User"}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-xl transition-all duration-300"></div>
        </div>
        
        <button
          onClick={handleLogout}
          className="group relative px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-400/20 hover:border-red-400/40 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden whitespace-nowrap"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>Logout</span>
            <span className="text-xs">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
        </button>
      </div>

      {/* Mobile: Premium Avatar Dropdown */}
      <div className="relative md:hidden flex-shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className={`group relative w-11 h-11 rounded-2xl ${theme.colors.bgButton} flex items-center justify-center font-bold text-sm shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500/50 overflow-hidden`}
        >
          <span className="relative z-10">{username?.charAt(0).toUpperCase() || "U"}</span>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {showDropdown && (
          <div className={`absolute right-0 mt-3 w-56 ${theme.colors.bgDropdown} rounded-2xl shadow-2xl py-2 z-50 overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            <div className={`relative px-4 py-3 border-b ${theme.colors.borderSecondary}`}>
              <p className={`text-xs font-medium ${theme.colors.textMuted}`}>Signed in as</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse"></div>
                <p className={`text-sm font-bold ${theme.colors.textGradient} truncate`}>
                  {username || "User"}
                </p>
              </div>
            </div>
            
            <Link
              to="/dashboard"
              onClick={() => setShowDropdown(false)}
              className={`group relative block px-4 py-3 text-sm font-semibold ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all duration-200 overflow-hidden`}
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-200"></div>
            </Link>
            
            <Link
              to="/profile"
              onClick={() => setShowDropdown(false)}
              className={`group relative block px-4 py-3 text-sm font-semibold ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-all duration-200 overflow-hidden`}
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-lg">👤</span>
                <span>Profile</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-200"></div>
            </Link>
            
            <div className={`h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1 ${theme.colors.borderSecondary}`}></div>
            
            <button
              onClick={handleLogout}
              className="group relative w-full text-left px-4 py-3 text-sm font-semibold text-red-400 hover:text-red-300 transition-all duration-200 overflow-hidden"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-lg">🚪</span>
                <span>Logout</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-pink-500/0 group-hover:from-red-500/10 group-hover:to-pink-500/10 transition-all duration-200"></div>
            </button>
          </div>
        )}
      </div>
    </>
  )}
</div>

      </nav>

      {/* Main Content - Add padding-top for fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// // src/App.jsx
// import React, { useEffect, useState } from "react";
// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();

//   // Check token on page load and when storage changes
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
//           const name = decoded?.name || decoded?.email || "";
//           setUsername(name);
//           setIsLoggedIn(true);
//         } catch (err) {
//           console.error("Failed to decode token", err);
//           setUsername("");
//           setIsLoggedIn(false);
//         }
//       } else {
//         setUsername("");
//         setIsLoggedIn(false);
//       }
//     };

//     checkAuth();
//     window.addEventListener("storage", checkAuth);
//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     setUsername("");
//     setShowDropdown(false);
//     navigate("/login");
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = () => setShowDropdown(false);
//     if (showDropdown) {
//       document.addEventListener("click", handleClickOutside);
//       return () => document.removeEventListener("click", handleClickOutside);
//     }
//   }, [showDropdown]);

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center bg-gray-800 px-4 lg:px-6 py-3 lg:py-4 shadow-md">
//         {/* Left: Logo + Links */}
//         <div className="flex items-center gap-3 lg:gap-4">
//           <h1 className="text-lg lg:text-xl font-bold">🔥 ChatForge</h1>
          
//           {/* Desktop Links - Hidden on mobile */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/" className="hover:underline text-sm text-gray-300">
//               Home
//             </Link>
//             {isLoggedIn && (
//               <Link to="/dashboard" className="hover:underline text-sm text-gray-300">
//                 Dashboard
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* Right: Auth Section */}
//         <div className="flex items-center gap-3 lg:gap-4">
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 to="/register"
//                 className="text-sm lg:text-base hover:underline text-gray-300"
//               >
//                 Register
//               </Link>
//               <Link
//                 to="/login"
//                 className="text-sm lg:text-base hover:underline text-blue-400"
//               >
//                 Login
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* Desktop: Show username + logout */}
//               <div className="hidden md:flex items-center gap-4">
//                 <span className="text-sm text-gray-200">
//                   Hello, <strong>{username || "User"}</strong>
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="hover:underline text-red-400 text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>

//               {/* Mobile: User Avatar with Dropdown */}
//               <div className="relative md:hidden">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShowDropdown(!showDropdown);
//                   }}
//                   className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {username?.charAt(0).toUpperCase() || "U"}
//                 </button>

//                 {/* Dropdown Menu */}
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-2 z-50">
//                     <div className="px-4 py-2 border-b border-gray-600">
//                       <p className="text-xs text-gray-400">Signed in as</p>
//                       <p className="text-sm font-semibold truncate">
//                         {username || "User"}
//                       </p>
//                     </div>
                    
//                     <Link
//                       to="/dashboard"
//                       onClick={() => setShowDropdown(false)}
//                       className="block px-4 py-2 text-sm hover:bg-gray-600 transition"
//                     >
//                       📊 Dashboard
//                     </Link>
                    
//                     <Link
//                       to="/profile"
//                       onClick={() => setShowDropdown(false)}
//                       className="block px-4 py-2 text-sm hover:bg-gray-600 transition"
//                     >
//                       👤 Profile
//                     </Link>
                    
//                     <hr className="border-gray-600 my-1" />
                    
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600 transition"
//                     >
//                       🚪 Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </nav>

//       {/* Routes */}
//       <Routes>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/edit-profile" element={<EditProfile />} />
//         <Route
//           path="/"
//           element={
//             <div className="p-8">
//               Welcome to ChatForge —{" "}
//               <Link to="/login" className="text-blue-400">
//                 Login
//               </Link>
//             </div>
//           }
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;
////GLASSMORPHISM!!!!!!!!!!BUDDY!!!!!!!!!!!!!!!!!
// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center backdrop-blur-xl bg-gray-800/80 px-4 lg:px-6 py-3 lg:py-4 shadow-md border-b border-white/10 fixed w-full z-50 top-0">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-3 lg:gap-4">
          <Link to="/" className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            🔥 ChatForge
          </Link>
          
          {/* Desktop Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="hover:text-blue-400 text-sm text-gray-300 transition">
              Home
            </Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="hover:text-purple-400 text-sm text-gray-300 transition">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="text-sm lg:text-base hover:text-purple-400 text-gray-300 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-sm lg:text-base px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition-transform font-semibold"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {/* Desktop: Show username + logout */}
              <div className="hidden md:flex items-center gap-4">
                <span className="text-sm text-gray-200">
                  Hello, <strong className="text-purple-400">{username || "User"}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-400 text-red-300 text-sm transition"
                >
                  Logout
                </button>
              </div>

              {/* Mobile: User Avatar with Dropdown */}
              <div className="relative md:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDropdown(!showDropdown);
                  }}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {username?.charAt(0).toUpperCase() || "U"}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-gray-800/95 border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold truncate text-purple-400">
                        {username || "User"}
                      </p>
                    </div>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm hover:bg-white/10 transition"
                    >
                      📊 Dashboard
                    </Link>
                    
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 text-sm hover:bg-white/10 transition"
                    >
                      👤 Profile
                    </Link>
                    
                    <hr className="border-white/10 my-1" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition"
                    >
                      🚪 Logout
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
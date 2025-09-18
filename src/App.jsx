// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { useEffect, useState } from "react";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Check token on load + storage updates
//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       setIsLoggedIn(!!token);
//     };

//     checkAuth();
//     window.addEventListener("storage", checkAuth);

//     return () => window.removeEventListener("storage", checkAuth);
//   }, []);

//   // ✅ Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-md">
//         <h1 className="text-xl font-bold">🔥 ChatForge</h1>
//         <div className="flex gap-4">
//           {!isLoggedIn ? (
//             <>
//               <Link to="/register" className="hover:underline">
//                 Register
//               </Link>
//               <Link to="/login" className="hover:underline">
//                 Login
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className="hover:underline">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="hover:underline text-red-400"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </nav>
    
//       {/* Routes */}
//       <Routes>
//         <Route path="/" element={<div className="p-8">Welcome to 🔥 ChatForge</div>} />
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


// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // if this causes an import error, change to: import { jwtDecode } from "jwt-decode";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // <- new
  const navigate = useNavigate();

  // Check token on page load and when storage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          // prefer name, then email
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
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">🔥 ChatForge</h1>
          <Link to="/" className="hover:underline text-sm text-gray-300">
            Home
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" className="hover:underline text-sm text-gray-300">
              Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-200">Hello, <strong>{username || "User"}</strong></span>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-400 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/" element={<div className="p-8">Welcome to ChatForge — <Link to="/login" className="text-blue-400">Login</Link></div>} />
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
  );
}

export default App;

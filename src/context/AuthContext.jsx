// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   // Whenever token changes, save/remove in localStorage
//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   const login = (data) => {
//     setToken(data.token);
//     setUser(data.user);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // Hook for using auth
// export function useAuth() {
//   return useContext(AuthContext);
// }



import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token }); // simple placeholder
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

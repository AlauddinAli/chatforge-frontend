import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // decoded contains { id, iat, exp }
      } catch (err) {
        console.error("Invalid token ❌", err);
      }
    }
  }, []);

  return user;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { socket } from "../socket"; // ✅ Import socket


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token
      localStorage.setItem("token", res.data.token);

      // 🔥 Force App.jsx to re-check auth instantly
      window.dispatchEvent(new Event("storage"));

      // ✅ Connect socket after successful login
      if (!socket.connected) {
        socket.connect();
      }

      alert("Login successful!");
      navigate("/dashboard"); // Redirect
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

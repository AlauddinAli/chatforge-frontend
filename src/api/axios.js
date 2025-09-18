import axios from "axios";

// This will use your backend URL (5000 is your backend port)
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token if logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

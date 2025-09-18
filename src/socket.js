// src/socket.js
import { io } from "socket.io-client";

// ✅ Point to your backend server
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

// ✅ Create single socket instance
export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // ensure WS connection
  reconnection: true,        // auto reconnect if server restarts
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

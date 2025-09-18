// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { jwtDecode } from "jwt-decode";
// import { socket } from "../socket";
// import Sidebar from "../components/Sidebar";

// export default function Dashboard() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [room, setRoom] = useState("general");
//   const currentUserRef = useRef({ name: "Unknown", id: null });

//   // ✅ Decode token once
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         currentUserRef.current.name =
//           decoded.name || decoded.email || "Unknown";
//         currentUserRef.current.id = decoded.id || decoded._id || null;
//       } catch (err) {
//         console.error("JWT decode failed:", err);
//       }
//     }
//   }, []);

//   // ✅ Join room & set listeners
//   useEffect(() => {
//     const userName = currentUserRef.current.name;
//     const userId = currentUserRef.current.id;

//     socket.emit("joinRoom", { room, user: userName, userId });

//     const handleRoomMessages = (msgs) => setMessages(msgs || []);
//     const handleReceive = (msg) =>
//       setMessages((prev) => [...prev, msg]);
//     const handleTyping = ({ user }) => {
//       if (!user || user === userName) return;
//       setTypingUsers((prev) =>
//         prev.includes(user) ? prev : [...prev, user]
//       );
//       setTimeout(() => {
//         setTypingUsers((prev) => prev.filter((u) => u !== user));
//       }, 2000);
//     };
//     const handleOnline = (users) => setOnlineUsers(users || []);

//     socket.on("roomMessages", handleRoomMessages);
//     socket.on("receiveMessage", handleReceive);
//     socket.on("typing", handleTyping);
//     socket.on("onlineUsers", handleOnline);

//     return () => {
//       socket.off("roomMessages", handleRoomMessages);
//       socket.off("receiveMessage", handleReceive);
//       socket.off("typing", handleTyping);
//       socket.off("onlineUsers", handleOnline);
//     };
//   }, [room]);

//   // ✅ Send message
//   const handleSend = (e) => {
//     e.preventDefault();
//     const text = newMessage.trim();
//     if (!text) return;

//     const msgData = {
//       room,
//       message: text,
//       user: currentUserRef.current.name,
//       userId: currentUserRef.current.id,
//     };

//     socket.emit("sendMessage", msgData); // server will broadcast
//     setNewMessage("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       <Sidebar room={room} setRoom={setRoom} onlineUsers={onlineUsers} />

//       <main className="flex-1 p-6 flex flex-col">
//         <h2 className="text-2xl font-bold mb-4">Room: {room} 🚀</h2>

//         {/* Messages */}
//         <div className="flex-1 bg-gray-800 rounded-lg p-4 overflow-y-auto space-y-3">
//           {messages.map((msg, idx) => (
//             <div
//               key={msg._id || idx}
//               className={`p-2 rounded max-w-[70%] ${
//                 msg.user === currentUserRef.current.name
//                   ? "bg-blue-600 self-end text-right ml-auto"
//                   : "bg-gray-700 text-left"
//               }`}
//             >
//               <div className="text-xs text-gray-300 mb-1">
//                 <strong>{msg.user}</strong> •{" "}
//                 {new Date(msg.createdAt).toLocaleTimeString?.() || ""}
//               </div>
//               <div>{msg.message}</div>
//             </div>
//           ))}
//         </div>

//         {/* Typing */}
//         <div className="mt-2 text-sm text-gray-300 h-6">
//           {typingUsers.length > 0 && (
//             <div>
//               {typingUsers.join(", ")}{" "}
//               {typingUsers.length === 1 ? "is typing..." : "are typing..."}
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <form onSubmit={handleSend} className="flex mt-4">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={newMessage}
//             onChange={(e) => {
//               setNewMessage(e.target.value);
//               socket.emit("typing", {
//                 room,
//                 user: currentUserRef.current.name,
//               });
//             }}
//             className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r"
//           >
//             Send
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { socket } from "../socket";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [room, setRoom] = useState("general");
  const currentUserRef = useRef({ name: "Unknown", id: null });

  const chatEndRef = useRef(null); // 👈 auto-scroll target

  // decode token once
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        currentUserRef.current.name =
          decoded.name || decoded.email || "Unknown";
        currentUserRef.current.id = decoded.id || decoded._id || null;
      } catch (err) {
        console.error("JWT decode failed:", err);
      }
    }
  }, []);

  // join room & listeners
  useEffect(() => {
    const userName = currentUserRef.current.name;
    const userId = currentUserRef.current.id;

    socket.emit("joinRoom", { room, user: userName, userId });

    const handleRoomMessages = (msgs) => setMessages(msgs || []);
    const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);

    const handleTyping = ({ user }) => {
      if (!user || user === userName) return;
      setTypingUsers((prev) =>
        prev.includes(user) ? prev : [...prev, user]
      );
      setTimeout(
        () => setTypingUsers((prev) => prev.filter((u) => u !== user)),
        2000
      );
    };

    const handleOnline = (users) => setOnlineUsers(users || []);

    socket.on("roomMessages", handleRoomMessages);
    socket.on("receiveMessage", handleReceive);
    socket.on("typing", handleTyping);
    socket.on("onlineUsers", handleOnline);

    return () => {
      socket.off("roomMessages", handleRoomMessages);
      socket.off("receiveMessage", handleReceive);
      socket.off("typing", handleTyping);
      socket.off("onlineUsers", handleOnline);
    };
  }, [room]);

  // 👇 auto-scroll when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // helper: format timestamp
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (
      date.toDateString() === today.toDateString()
    ) {
      return `Today ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (
      date.toDateString() === yesterday.toDateString()
    ) {
      return `Yesterday ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleString();
    }
  };

  // send message
  const handleSend = (e) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;

    const msgData = {
      room,
      message: text,
      user: currentUserRef.current.name,
      userId: currentUserRef.current.id,
    };

    socket.emit("sendMessage", msgData);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar room={room} setRoom={setRoom} onlineUsers={onlineUsers} />

      <main className="flex-1 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Room: {room} 🚀</h2>

        {/* Messages */}
        <div className="flex-1 bg-gray-800 rounded-lg p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`flex items-start gap-2 max-w-[75%] ${
                msg.user === currentUserRef.current.name
                  ? "ml-auto flex-row-reverse"
                  : ""
              }`}
            >
              {/* Avatar / initials */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  msg.user === currentUserRef.current.name
                    ? "bg-blue-500"
                    : "bg-gray-600"
                }`}
              >
                {msg.user?.charAt(0).toUpperCase() || "?"}
              </div>

              <div
                className={`p-2 rounded-lg ${
                  msg.user === currentUserRef.current.name
                    ? "bg-blue-600 text-right"
                    : "bg-gray-700 text-left"
                }`}
              >
                <div className="text-xs text-gray-300 mb-1">
                  <strong>{msg.user}</strong> •{" "}
                  {msg.createdAt ? formatTime(msg.createdAt) : ""}
                </div>
                <div>{msg.message}</div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* 👈 scroll anchor */}
        </div>

        {/* Typing Indicator */}
        <div className="mt-2 text-sm italic text-gray-400 h-6">
          {typingUsers.length > 0 && (
            <div>
              {typingUsers.join(", ")}{" "}
              {typingUsers.length === 1 ? "is typing..." : "are typing..."}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              socket.emit("typing", {
                room,
                user: currentUserRef.current.name,
              });
            }}
            className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

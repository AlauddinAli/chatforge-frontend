

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

//   const chatEndRef = useRef(null); // 👈 auto-scroll target

//   // decode token once
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

//   // join room & listeners
//   useEffect(() => {
//     const userName = currentUserRef.current.name;
//     const userId = currentUserRef.current.id;

//     socket.emit("joinRoom", { room, user: userName, userId });

//     const handleRoomMessages = (msgs) => setMessages(msgs || []);
//     const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);

//     const handleTyping = ({ user }) => {
//       if (!user || user === userName) return;
//       setTypingUsers((prev) =>
//         prev.includes(user) ? prev : [...prev, user]
//       );
//       setTimeout(
//         () => setTypingUsers((prev) => prev.filter((u) => u !== user)),
//         2000
//       );
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

//   // 👇 auto-scroll when messages update
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // helper: format timestamp
//   const formatTime = (dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     if (
//       date.toDateString() === today.toDateString()
//     ) {
//       return `Today ${date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else if (
//       date.toDateString() === yesterday.toDateString()
//     ) {
//       return `Yesterday ${date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else {
//       return date.toLocaleString();
//     }
//   };

//   // send message
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

//     socket.emit("sendMessage", msgData);
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
//               className={`flex items-start gap-2 max-w-[75%] ${
//                 msg.user === currentUserRef.current.name
//                   ? "ml-auto flex-row-reverse"
//                   : ""
//               }`}
//             >
//               {/* Avatar / initials */}
//               <div
//                 className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
//                   msg.user === currentUserRef.current.name
//                     ? "bg-blue-500"
//                     : "bg-gray-600"
//                 }`}
//               >
//                 {msg.user?.charAt(0).toUpperCase() || "?"}
//               </div>

//               <div
//                 className={`p-2 rounded-lg ${
//                   msg.user === currentUserRef.current.name
//                     ? "bg-blue-600 text-right"
//                     : "bg-gray-700 text-left"
//                 }`}
//               >
//                 <div className="text-xs text-gray-300 mb-1">
//                   <strong>{msg.user}</strong> •{" "}
//                   {msg.createdAt ? formatTime(msg.createdAt) : ""}
//                 </div>
//                 <div>{msg.message}</div>
//               </div>
//             </div>
//           ))}
//           <div ref={chatEndRef} /> {/* 👈 scroll anchor */}
//         </div>

//         {/* Typing Indicator */}
//         <div className="mt-2 text-sm italic text-gray-400 h-6">
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
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 👈 Mobile sidebar toggle
//   const currentUserRef = useRef({ name: "Unknown", id: null });

//   const chatEndRef = useRef(null);

//   // decode token once
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

//   // join room & listeners
//   useEffect(() => {
//     const userName = currentUserRef.current.name;
//     const userId = currentUserRef.current.id;

//     socket.emit("joinRoom", { room, user: userName, userId });

//     const handleRoomMessages = (msgs) => setMessages(msgs || []);
//     const handleReceive = (msg) => setMessages((prev) => [...prev, msg]);

//     const handleTyping = ({ user }) => {
//       if (!user || user === userName) return;
//       setTypingUsers((prev) =>
//         prev.includes(user) ? prev : [...prev, user]
//       );
//       setTimeout(
//         () => setTypingUsers((prev) => prev.filter((u) => u !== user)),
//         2000
//       );
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

//   // auto-scroll when messages update
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // helper: format timestamp
//   const formatTime = (dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) {
//       return `Today ${date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return `Yesterday ${date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       })}`;
//     } else {
//       return date.toLocaleString();
//     }
//   };

//   // send message
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

//     socket.emit("sendMessage", msgData);
//     setNewMessage("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white relative">
//       {/* 🔥 Mobile Overlay - when sidebar is open */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* 🔥 Sidebar - slides in on mobile */}
//       <Sidebar
//         room={room}
//         setRoom={setRoom}
//         onlineUsers={onlineUsers}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       {/* 🔥 Main Chat Area */}
//       <main className="flex-1 p-4 lg:p-6 flex flex-col w-full">
//         {/* 🔥 Header with Hamburger Menu */}
//         <div className="flex items-center justify-between mb-4">
//           {/* Hamburger Button - Only visible on mobile */}
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="lg:hidden text-white text-2xl focus:outline-none"
//           >
//             ☰
//           </button>

//           <h2 className="text-xl lg:text-2xl font-bold">Room: {room} 🚀</h2>

//           <div className="w-8 lg:hidden"></div> {/* Spacer for centering */}
//         </div>

//         {/* Messages */}
//         <div className="flex-1 bg-gray-800 rounded-lg p-3 lg:p-4 overflow-y-auto space-y-3">
//           {messages.map((msg, idx) => (
//             <div
//               key={msg._id || idx}
//               className={`flex items-start gap-2 max-w-[85%] lg:max-w-[75%] ${
//                 msg.user === currentUserRef.current.name
//                   ? "ml-auto flex-row-reverse"
//                   : ""
//               }`}
//             >
//               {/* Avatar / initials */}
//               <div
//                 className={`w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full font-bold text-sm ${
//                   msg.user === currentUserRef.current.name
//                     ? "bg-blue-500"
//                     : "bg-gray-600"
//                 }`}
//               >
//                 {msg.user?.charAt(0).toUpperCase() || "?"}
//               </div>

//               <div
//                 className={`p-2 lg:p-3 rounded-lg text-sm lg:text-base ${
//                   msg.user === currentUserRef.current.name
//                     ? "bg-blue-600 text-right"
//                     : "bg-gray-700 text-left"
//                 }`}
//               >
//                 <div className="text-xs text-gray-300 mb-1">
//                   <strong>{msg.user}</strong> •{" "}
//                   {msg.createdAt ? formatTime(msg.createdAt) : ""}
//                 </div>
//                 <div className="break-words">{msg.message}</div>
//               </div>
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Typing Indicator */}
//         <div className="mt-2 text-xs lg:text-sm italic text-gray-400 h-5 lg:h-6">
//           {typingUsers.length > 0 && (
//             <div>
//               {typingUsers.join(", ")}{" "}
//               {typingUsers.length === 1 ? "is typing..." : "are typing..."}
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <form onSubmit={handleSend} className="flex mt-3 lg:mt-4">
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
//             className="flex-1 p-2 lg:p-3 text-sm lg:text-base rounded-l bg-gray-700 text-white focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 px-4 lg:px-6 rounded-r text-sm lg:text-base font-semibold"
//           >
//             Send
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

//GLASSMORPHISM!!!!!!!!!!!!!!!!!!!!!
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const currentUserRef = useRef({ name: "Unknown", id: null });

  const chatEndRef = useRef(null);

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

    // Listen for message deletion
    const handleMessageDeleted = ({ messageId }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    };

    // Listen for message edit
    const handleMessageEdited = ({ messageId, newMessage }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, message: newMessage, edited: true } : msg
        )
      );
    };

    socket.on("roomMessages", handleRoomMessages);
    socket.on("receiveMessage", handleReceive);
    socket.on("typing", handleTyping);
    socket.on("onlineUsers", handleOnline);
    socket.on("messageDeleted", handleMessageDeleted);
    socket.on("messageEdited", handleMessageEdited);

    return () => {
      socket.off("roomMessages", handleRoomMessages);
      socket.off("receiveMessage", handleReceive);
      socket.off("typing", handleTyping);
      socket.off("onlineUsers", handleOnline);
      socket.off("messageDeleted", handleMessageDeleted);
      socket.off("messageEdited", handleMessageEdited);
    };
  }, [room]);

  // auto-scroll when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu]);

  // helper: format timestamp
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
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

  // Handle right-click on message
  const handleContextMenu = (e, msg) => {
    e.preventDefault();
    if (msg.user === currentUserRef.current.name) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        messageId: msg._id,
        message: msg.message,
      });
    }
  };

  // Delete message
  const handleDelete = (messageId) => {
    setShowDeleteConfirm(messageId);
    setContextMenu(null);
  };

  const confirmDelete = () => {
    socket.emit("deleteMessage", { room, messageId: showDeleteConfirm });
    setShowDeleteConfirm(null);
  };

  // Edit message
  const startEdit = (messageId, currentText) => {
    setEditingMessageId(messageId);
    setEditText(currentText);
    setContextMenu(null);
  };

  const saveEdit = (messageId) => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== messages.find((m) => m._id === messageId)?.message) {
      socket.emit("editMessage", { room, messageId, newMessage: trimmed });
    }
    setEditingMessageId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditText("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        room={room}
        setRoom={setRoom}
        onlineUsers={onlineUsers}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Chat Area */}
      <main className="flex-1 p-4 lg:p-6 flex flex-col w-full relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 backdrop-blur-xl bg-white/5 rounded-2xl p-3 lg:p-4 border border-white/10 shadow-xl">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-white text-2xl focus:outline-none hover:text-blue-400 transition"
          >
            ☰
          </button>

          <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Room: {room} 🚀
          </h2>

          <div className="w-8 lg:hidden"></div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-3 lg:p-4 overflow-y-auto space-y-3 border border-white/10 shadow-2xl">
          {messages.map((msg, idx) => {
            const isOwn = msg.user === currentUserRef.current.name;
            const isEditing = editingMessageId === msg._id;

            return (
              <div
                key={msg._id || idx}
                className={`flex items-start gap-2 max-w-[85%] lg:max-w-[75%] animate-slideIn ${
                  isOwn ? "ml-auto flex-row-reverse" : ""
                }`}
                onContextMenu={(e) => handleContextMenu(e, msg)}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 lg:w-9 lg:h-9 flex items-center justify-center rounded-full font-bold text-sm shadow-lg ${
                    isOwn
                      ? "bg-gradient-to-br from-blue-500 to-purple-500"
                      : "bg-gradient-to-br from-gray-600 to-gray-700"
                  }`}
                >
                  {msg.user?.charAt(0).toUpperCase() || "?"}
                </div>

                {/* Message Bubble */}
                <div
                  className={`group relative backdrop-blur-md rounded-2xl p-3 lg:p-4 text-sm lg:text-base shadow-xl border transition-all hover:scale-[1.02] ${
                    isOwn
                      ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-blue-400/30 text-right"
                      : "bg-white/10 border-white/20 text-left"
                  }`}
                >
                  {/* Header */}
                  <div className="text-xs text-gray-300 mb-1 flex items-center gap-2">
                    <strong className="text-blue-300">{msg.user}</strong>
                    <span className="opacity-70">•</span>
                    <span className="opacity-70">
                      {msg.createdAt ? formatTime(msg.createdAt) : ""}
                    </span>
                    {msg.edited && (
                      <span className="text-xs italic text-purple-300">(edited)</span>
                    )}
                  </div>

                  {/* Message Content */}
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(msg._id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => saveEdit(msg._id)}
                          className="px-3 py-1 bg-green-500/80 hover:bg-green-500 rounded-lg text-xs font-semibold transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-xs font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="break-words">{msg.message}</div>
                  )}

                  {/* Quick Actions (on hover) - Only for own messages */}
                  {isOwn && !isEditing && (
                    <div className="absolute -top-2 right-2 hidden group-hover:flex gap-1 bg-gray-800/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-white/20">
                      <button
                        onClick={() => startEdit(msg._id, msg.message)}
                        className="px-2 py-1 hover:bg-blue-500/50 rounded text-xs transition"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="px-2 py-1 hover:bg-red-500/50 rounded text-xs transition"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <div
            className="fixed bg-gray-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 py-2 z-50"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => startEdit(contextMenu.messageId, contextMenu.message)}
              className="w-full px-4 py-2 text-left hover:bg-blue-500/30 transition text-sm flex items-center gap-2"
            >
              ✏️ Edit Message
            </button>
            <button
              onClick={() => handleDelete(contextMenu.messageId)}
              className="w-full px-4 py-2 text-left hover:bg-red-500/30 transition text-sm flex items-center gap-2 text-red-400"
            >
              🗑️ Delete Message
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full mx-4 border border-white/20 shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Delete Message?</h3>
              <p className="text-gray-300 mb-6">
                This action cannot be undone. The message will be deleted for everyone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500/80 hover:bg-red-500 py-2 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-600/80 hover:bg-gray-600 py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Typing Indicator */}
        <div className="mt-2 text-xs lg:text-sm italic text-purple-300 h-5 lg:h-6">
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              </div>
              {typingUsers.join(", ")}{" "}
              {typingUsers.length === 1 ? "is typing..." : "are typing..."}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex mt-3 lg:mt-4 gap-2">
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
            className="flex-1 p-3 lg:p-4 text-sm lg:text-base rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-xl"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 lg:px-8 rounded-2xl text-sm lg:text-base font-semibold shadow-xl transition-all hover:scale-105"
          >
            Send
          </button>
        </form>
      </main>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
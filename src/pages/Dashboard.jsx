// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { jwtDecode } from "jwt-decode";
// import { socket } from "../socket";
// import { useTheme } from "../context/ThemeContext";
// import Sidebar from "../components/Sidebar";
// import api from "../api/axios";

// export default function Dashboard() {
//   const { theme } = useTheme();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [typingUsers, setTypingUsers] = useState([]);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [room, setRoom] = useState("general");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
//   const [contextMenu, setContextMenu] = useState(null);
//   const [uploadingFile, setUploadingFile] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
  
//   // 🔥 Reaction states
//   const [showReactionPicker, setShowReactionPicker] = useState(null);
//   const [messageReactions, setMessageReactions] = useState({});
  
//   // 🔥 Reply/Thread states
//   const [replyingTo, setReplyingTo] = useState(null);
  
//   const currentUserRef = useRef({ name: "Unknown", id: null });
//   const chatEndRef = useRef(null);
//   const chatContainerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const oldestMessageId = useRef(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         currentUserRef.current.name = decoded.name || decoded.email || "Unknown";
//         currentUserRef.current.id = decoded.id || decoded._id || null;
//       } catch (err) {
//         console.error("JWT decode failed:", err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const userName = currentUserRef.current.name;
//     const userId = currentUserRef.current.id;
//     socket.emit("joinRoom", { room, user: userName, userId });

//     const handleRoomMessages = (msgs) => {
//       setMessages(msgs || []);
//       setHasMore(msgs.length >= 50);
//       if (msgs.length > 0) {
//         oldestMessageId.current = msgs[0]._id;
//       }
      
//       const reactionsMap = {};
//       msgs.forEach(msg => {
//         if (msg.reactions) {
//           reactionsMap[msg._id] = msg.reactions;
//         }
//       });
//       setMessageReactions(reactionsMap);
//     };
    
//     const handleReceive = (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       if (msg.reactions) {
//         setMessageReactions(prev => ({...prev, [msg._id]: msg.reactions}));
//       }
//       setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//     };
    
//     const handleTyping = ({ user }) => {
//       if (!user || user === userName) return;
//       setTypingUsers((prev) => (prev.includes(user) ? prev : [...prev, user]));
//       setTimeout(() => setTypingUsers((prev) => prev.filter((u) => u !== user)), 2000);
//     };
    
//     const handleOnline = (users) => setOnlineUsers(users || []);
    
//     const handleMessageDeleted = ({ messageId }) => {
//       setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
//       setMessageReactions(prev => {
//         const newReactions = {...prev};
//         delete newReactions[messageId];
//         return newReactions;
//       });
//     };
    
//     const handleMessageEdited = ({ messageId, newMessage }) => {
//       setMessages((prev) =>
//         prev.map((msg) => (msg._id === messageId ? { ...msg, message: newMessage, edited: true } : msg))
//       );
//     };
    
//     const handleMessageReaction = ({ messageId, reactions }) => {
//       setMessageReactions(prev => ({ ...prev, [messageId]: reactions }));
//       setMessages(prev => prev.map(msg => 
//         msg._id === messageId ? { ...msg, reactions } : msg
//       ));
//     };

//     socket.on("roomMessages", handleRoomMessages);
//     socket.on("receiveMessage", handleReceive);
//     socket.on("typing", handleTyping);
//     socket.on("onlineUsers", handleOnline);
//     socket.on("messageDeleted", handleMessageDeleted);
//     socket.on("messageEdited", handleMessageEdited);
//     socket.on("messageReaction", handleMessageReaction);

//     return () => {
//       socket.off("roomMessages", handleRoomMessages);
//       socket.off("receiveMessage", handleReceive);
//       socket.off("typing", handleTyping);
//       socket.off("onlineUsers", handleOnline);
//       socket.off("messageDeleted", handleMessageDeleted);
//       socket.off("messageEdited", handleMessageEdited);
//       socket.off("messageReaction", handleMessageReaction);
//     };
//   }, [room]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleScroll = async () => {
//     const container = chatContainerRef.current;
//     if (!container || loadingMore || !hasMore) return;

//     if (container.scrollTop === 0) {
//       setLoadingMore(true);
//       const prevHeight = container.scrollHeight;

//       try {
//         const response = await api.get(`/messages/${room}?before=${oldestMessageId.current}&limit=50`);
//         const olderMessages = response.data;

//         if (olderMessages.length > 0) {
//           setMessages((prev) => [...olderMessages, ...prev]);
//           oldestMessageId.current = olderMessages[0]._id;
          
//           const reactionsMap = {};
//           olderMessages.forEach(msg => {
//             if (msg.reactions) {
//               reactionsMap[msg._id] = msg.reactions;
//             }
//           });
//           setMessageReactions(prev => ({...reactionsMap, ...prev}));
          
//           setTimeout(() => {
//             container.scrollTop = container.scrollHeight - prevHeight;
//           }, 100);
//         }

//         if (olderMessages.length < 50) {
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.error("Error loading more messages:", err);
//       } finally {
//         setLoadingMore(false);
//       }
//     }
//   };

//   useEffect(() => {
//     const handleClick = () => {
//       setContextMenu(null);
//       setShowReactionPicker(null);
//     };
//     if (contextMenu || showReactionPicker) {
//       document.addEventListener("click", handleClick);
//       return () => document.removeEventListener("click", handleClick);
//     }
//   }, [contextMenu, showReactionPicker]);

//   const formatTime = (dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     if (date.toDateString() === today.toDateString()) {
//       return `Today ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
//     }
//     return date.toLocaleString();
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes < 1024) return bytes + " B";
//     if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
//     return (bytes / 1048576).toFixed(1) + " MB";
//   };

//   const handleFileSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         alert("File too large! Max 10MB");
//         return;
//       }
//       setSelectedFile(file);
//     }
//   };

//   const handleSendFile = async () => {
//     if (!selectedFile) return;
//     setUploadingFile(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       const res = await api.post("/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const msgData = {
//         room,
//         message: newMessage.trim() || "",
//         user: currentUserRef.current.name,
//         userId: currentUserRef.current.id,
//         fileUrl: res.data.fileUrl,
//         fileName: res.data.fileName,
//         fileType: res.data.fileType,
//         fileSize: res.data.fileSize,
//       };

//       if (replyingTo) {
//         msgData.replyTo = replyingTo._id;
//         socket.emit("sendReply", msgData);
//         setReplyingTo(null);
//       } else {
//         socket.emit("sendMessage", msgData);
//       }
      
//       setSelectedFile(null);
//       setNewMessage("");
//       fileInputRef.current.value = "";
//     } catch (err) {
//       alert("Error uploading file: " + (err.response?.data?.message || err.message));
//     } finally {
//       setUploadingFile(false);
//     }
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (selectedFile) {
//       handleSendFile();
//       return;
//     }
//     const text = newMessage.trim();
//     if (!text) return;

//     const msgData = {
//       room,
//       message: text,
//       user: currentUserRef.current.name,
//       userId: currentUserRef.current.id,
//     };

//     if (replyingTo) {
//       msgData.replyTo = replyingTo._id;
//       socket.emit("sendReply", msgData);
//       setReplyingTo(null);
//     } else {
//       socket.emit("sendMessage", msgData);
//     }

//     setNewMessage("");
//   };

//   const handleContextMenu = (e, msg) => {
//     e.preventDefault();
//     if (msg.user === currentUserRef.current.name) {
//       setContextMenu({ 
//         x: e.clientX, 
//         y: e.clientY, 
//         messageId: msg._id, 
//         message: msg.message,
//         hasFile: !!msg.fileUrl 
//       });
//     }
//   };

//   const handleDelete = (messageId) => {
//     setShowDeleteConfirm(messageId);
//     setContextMenu(null);
//   };

//   const confirmDelete = () => {
//     socket.emit("deleteMessage", { room, messageId: showDeleteConfirm });
//     setShowDeleteConfirm(null);
//   };

//   const startEdit = (messageId, currentText) => {
//     setEditingMessageId(messageId);
//     setEditText(currentText);
//     setContextMenu(null);
//   };

//   const saveEdit = (messageId) => {
//     const trimmed = editText.trim();
//     if (trimmed && trimmed !== messages.find((m) => m._id === messageId)?.message) {
//       socket.emit("editMessage", { room, messageId, newMessage: trimmed });
//     }
//     setEditingMessageId(null);
//     setEditText("");
//   };

//   const cancelEdit = () => {
//     setEditingMessageId(null);
//     setEditText("");
//   };

//   const handleAddReaction = (messageId, emoji) => {
//     const userId = currentUserRef.current.id;
//     if (!userId) return;
//     socket.emit("addReaction", { messageId, emoji, userId, room });
//     setShowReactionPicker(null);
//   };

//   const handleReply = (msg) => {
//     setReplyingTo(msg);
//     setContextMenu(null);
//   };

//   const cancelReply = () => {
//     setReplyingTo(null);
//   };

//   return (
//     <div className={`flex h-screen ${theme.colors.bgMain} ${theme.colors.textPrimary} relative overflow-hidden`}>
//       <div className={`absolute inset-0 ${theme.colors.bgAnimated} animate-pulse`}></div>

//       {isSidebarOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
//       )}

//       <Sidebar room={room} setRoom={setRoom} onlineUsers={onlineUsers} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//       <main className="flex-1 flex flex-col w-full relative z-10 lg:ml-64">
//         <div className={`fixed top-[64px] left-0 lg:left-64 right-0 z-30 flex items-center justify-between ${theme.colors.bgHeader} p-4 md:p-5 border-b ${theme.colors.borderPrimary} shadow-xl pointer-events-auto`}>
//           <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden ${theme.colors.textPrimary} text-xl md:text-2xl focus:outline-none hover:text-blue-400 transition p-2`}>
//             ☰
//           </button>
//           <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.colors.textGradient} truncate flex-1 text-center lg:text-left px-2 flex items-center justify-center lg:justify-start`}>
//             Room: {room} 🚀
//           </h2>
//           <div className="w-10 lg:hidden"></div>
//         </div>

//         <div 
//           ref={chatContainerRef}
//           onScroll={handleScroll}
//           className="flex-1 overflow-y-auto overscroll-contain px-2 sm:px-4 md:px-6 py-4 space-y-3 md:space-y-4 mt-[80px] md:mt-[88px]"
//         >
//           {loadingMore && (
//             <div className="text-center py-2">
//               <div className="inline-block w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}
          
//           {messages.map((msg, idx) => {
//   const isOwn = msg.user === currentUserRef.current.name;
//   const isEditing = editingMessageId === msg._id;
//   const reactions = messageReactions[msg._id] || msg.reactions || {};
//   const hasReactions = Object.keys(reactions).length > 0;

//   return (
//     <div
//       key={msg._id || idx}
//       className={`flex items-start gap-2 md:gap-3 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] animate-slideIn ${isOwn ? "ml-auto flex-row-reverse" : ""}`}
//       onContextMenu={(e) => handleContextMenu(e, msg)}
//     >
//       <div className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs md:text-sm shadow-lg ${isOwn ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gradient-to-br from-gray-600 to-gray-700"}`}>
//         {msg.user?.charAt(0).toUpperCase() || "?"}
//       </div>

//       <div className={`group relative rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base shadow-xl transition-all ${isOwn ? theme.colors.bgMessageOwn + " text-right" : theme.colors.bgMessageOther + " text-left"}`}>
//         <div className={`text-[10px] md:text-xs ${theme.colors.textSecondary} mb-1 flex flex-wrap items-center gap-1 md:gap-2`}>
//           <strong className="text-blue-300 break-words max-w-full">{msg.user}</strong>
//           <span className="opacity-70">•</span>
//           <span className="opacity-70 text-[10px] md:text-xs whitespace-nowrap">{msg.createdAt ? formatTime(msg.createdAt) : ""}</span>
//           {msg.edited && <span className="text-[10px] md:text-xs italic text-purple-300 whitespace-nowrap">(edited)</span>}
//           {msg.replyTo && <span className="text-[10px] text-blue-300">↩️</span>}
//         </div>

//         {msg.fileUrl ? (
//           <div className="mt-2">
//             {msg.fileType === "image" ? (
//               <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
//                 <img src={msg.fileUrl} alt={msg.fileName} className="max-w-full max-h-48 md:max-h-64 rounded-lg hover:opacity-90 transition" />
//               </a>
//             ) : (
//               <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 md:gap-3 ${theme.colors.bgInput} p-2 md:p-3 rounded-lg hover:bg-white/20 transition`}>
//                 <div className="text-2xl md:text-4xl flex-shrink-0">{msg.fileType === "pdf" ? "📄" : "📁"}</div>
//                 <div className="flex-1 min-w-0">
//                   <div className="font-semibold break-words text-xs md:text-sm">{msg.fileName}</div>
//                   <div className={`text-[10px] md:text-xs ${theme.colors.textMuted} mt-1`}>{formatFileSize(msg.fileSize)}</div>
//                 </div>
//                 <div className="text-blue-400 flex-shrink-0">⬇️</div>
//               </a>
//             )}
//             {msg.message && <div className="mt-2 break-words text-sm md:text-base">{msg.message}</div>}
//           </div>
//         ) : isEditing ? (
//           <div className="space-y-2">
//             <input 
//               type="text" 
//               value={editText} 
//               onChange={(e) => setEditText(e.target.value)} 
//               className={`w-full bg-white/20 ${theme.colors.borderPrimary} border rounded-lg px-2 md:px-3 py-1.5 md:py-2 ${theme.colors.textPrimary} text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
//               autoFocus 
//               onKeyDown={(e) => { 
//                 if (e.key === "Enter") saveEdit(msg._id); 
//                 if (e.key === "Escape") cancelEdit(); 
//               }} 
//             />
//             <div className="flex gap-2 justify-end">
//               <button onClick={() => saveEdit(msg._id)} className="px-2 md:px-3 py-1 bg-green-500/80 hover:bg-green-500 rounded-lg text-[10px] md:text-xs font-semibold transition">Save</button>
//               <button onClick={cancelEdit} className="px-2 md:px-3 py-1 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-[10px] md:text-xs font-semibold transition">Cancel</button>
//             </div>
//           </div>
//         ) : (
//           <div className="break-words text-sm md:text-base">{msg.message}</div>
//         )}

//         {!isEditing && (
//           <div className={`absolute -top-2 ${isOwn ? 'right-2' : 'left-2'} hidden group-hover:flex gap-1 ${theme.colors.bgContextMenu} rounded-lg p-1 shadow-lg z-10`}>
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowReactionPicker(showReactionPicker === msg._id ? null : msg._id);
//               }}
//               className="px-1.5 py-1 hover:bg-yellow-500/50 rounded text-xs transition" 
//               title="React"
//             >
//               😀
//             </button>
//             <button onClick={() => handleReply(msg)} className="px-1.5 py-1 hover:bg-purple-500/50 rounded text-xs transition" title="Reply">💬</button>
//             {isOwn && !msg.fileUrl && (
//               <button onClick={() => startEdit(msg._id, msg.message)} className="px-1.5 py-1 hover:bg-blue-500/50 rounded text-xs transition" title="Edit">✏️</button>
//             )}
//             {isOwn && (
//               <button onClick={() => handleDelete(msg._id)} className="px-1.5 py-1 hover:bg-red-500/50 rounded text-xs transition" title="Delete">🗑️</button>
//             )}
//           </div>
//         )}

//         {showReactionPicker === msg._id && (
//           <div 
//             className={`absolute ${isOwn ? 'right-0' : 'left-0'} -top-12 ${theme.colors.bgCard} rounded-xl px-2 py-1 shadow-2xl z-50 flex gap-1`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {['❤️', '😂', '👍', '🔥', '🎉', '😮', '😢', '👏'].map(emoji => (
//               <button
//                 key={emoji}
//                 onClick={() => handleAddReaction(msg._id, emoji)}
//                 className="text-xl hover:scale-125 transition-transform p-1 hover:bg-white/10 rounded"
//               >
//                 {emoji}
//               </button>
//             ))}
//           </div>
//         )}

//         {hasReactions && (
//           <div className="flex flex-wrap gap-1 mt-2">
//             {Object.entries(reactions).map(([emoji, users]) => {
//               const userReacted = users.includes(currentUserRef.current.id);
//               return (
//                 <button
//                   key={emoji}
//                   onClick={() => handleAddReaction(msg._id, emoji)}
//                   className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs transition-all hover:scale-110 ${
//                     userReacted
//                       ? 'bg-blue-500/40 border border-blue-400/80'
//                       : 'bg-white/10 border border-white/20 hover:bg-white/20'
//                   }`}
//                   title={`${users.length} reaction${users.length > 1 ? 's' : ''}`}
//                 >
//                   <span className="text-sm">{emoji}</span>
//                   <span className="text-[10px] font-semibold">{users.length}</span>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// })}

//           <div ref={chatEndRef} />
//         </div>

//         {contextMenu && (
//           <div className={`fixed ${theme.colors.bgContextMenu} rounded-lg shadow-2xl py-2 z-50`} style={{ top: contextMenu.y, left: Math.min(contextMenu.x, window.innerWidth - 200) }} onClick={(e) => e.stopPropagation()}>
//             <button onClick={() => {
//               const msg = messages.find(m => m._id === contextMenu.messageId);
//               handleReply(msg);
//             }} className={`w-full px-4 py-2 text-left hover:bg-purple-500/30 transition text-sm flex items-center gap-2 ${theme.colors.textSecondary}`}>💬 Reply</button>
//             {!contextMenu.hasFile && (
//               <button onClick={() => startEdit(contextMenu.messageId, contextMenu.message)} className={`w-full px-4 py-2 text-left hover:bg-blue-500/30 transition text-sm flex items-center gap-2 ${theme.colors.textSecondary}`}>✏️ Edit Message</button>
//             )}
//             <button onClick={() => handleDelete(contextMenu.messageId)} className="w-full px-4 py-2 text-left hover:bg-red-500/30 transition text-sm flex items-center gap-2 text-red-400">🗑️ Delete Message</button>
//           </div>
//         )}

//         {showDeleteConfirm && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
//             <div className={`${theme.colors.bgCard} rounded-2xl p-4 md:p-6 max-w-sm w-full shadow-2xl`}>
//               <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Delete Message?</h3>
//               <p className={`text-sm md:text-base ${theme.colors.textSecondary} mb-4 md:mb-6`}>This will delete the message {messages.find(m => m._id === showDeleteConfirm)?.fileUrl ? "and file " : ""}permanently.</p>
//               <div className="flex gap-2 md:gap-3">
//                 <button onClick={confirmDelete} className="flex-1 bg-red-500/80 hover:bg-red-500 py-2 rounded-lg font-semibold transition text-sm md:text-base">Delete</button>
//                 <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 bg-gray-600/80 hover:bg-gray-600 py-2 rounded-lg font-semibold transition text-sm md:text-base">Cancel</button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className={`px-2 sm:px-4 md:px-6 pb-2 text-xs md:text-sm italic text-purple-300 min-h-[20px]`}>
//           {typingUsers.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex gap-1">
//                 <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce"></span>
//                 <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
//                 <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
//               </div>
//               <span className="truncate">{typingUsers.join(", ")} {typingUsers.length === 1 ? "is typing..." : "are typing..."}</span>
//             </div>
//           )}
//         </div>

//         {replyingTo && (
//           <div className="px-2 sm:px-4 md:px-6 pb-2">
//             <div className={`flex items-center gap-2 ${theme.colors.bgCard} rounded-xl p-2 border-l-4 border-blue-400`}>
//               <div className="flex-1 min-w-0">
//                 <div className={`text-xs ${theme.colors.textSecondary}`}>
//                   ↩️ <span className="font-semibold">{replyingTo.user}</span>: <span className="truncate">{replyingTo.message || "(file)"}</span>
//                 </div>
//               </div>
//               <button onClick={cancelReply} className="text-red-400 hover:text-red-300 text-lg">✕</button>
//             </div>
//           </div>
//         )}

//         {selectedFile && (
//           <div className="px-2 sm:px-4 md:px-6 pb-2">
//             <div className={`flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl ${theme.colors.bgCard} p-2 md:p-3 shadow-xl`}>
//               <div className="flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-lg md:text-2xl">
//                 {selectedFile.type?.startsWith("image/") ? "🖼️" : selectedFile.type === "application/pdf" ? "📄" : "📁"}
//               </div>
//               <div className="min-w-0 flex-1">
//                 <div className="break-words font-semibold text-xs md:text-sm">{selectedFile.name}</div>
//                 <div className={`text-[10px] md:text-xs ${theme.colors.textSecondary}`}>{formatFileSize(selectedFile.size)}</div>
//                 {uploadingFile && (
//                   <div className="mt-1 h-1 md:h-1.5 w-full overflow-hidden rounded bg-white/10">
//                     <div className="h-full w-2/3 animate-pulse bg-gradient-to-r from-blue-400/60 to-purple-400/60"></div>
//                   </div>
//                 )}
//               </div>
//               <button onClick={() => { setSelectedFile(null); fileInputRef.current.value = ""; }} className="ml-2 rounded-lg bg-white/10 px-2 py-1 text-xs md:text-sm text-red-300 hover:bg-white/20 transition flex-shrink-0">✕</button>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSend} className="flex gap-2 px-2 sm:px-4 md:px-6 pb-3 md:pb-4">
//           <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt,.zip" />
//           <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile} className={`p-2.5 md:p-3 lg:p-4 ${theme.colors.bgInput} rounded-xl md:rounded-2xl hover:bg-white/20 transition disabled:opacity-50 flex-shrink-0 text-lg md:text-xl`} title="Attach file">📎</button>
//           <input 
//             type="text" 
//             placeholder={replyingTo ? `Reply to ${replyingTo.user}...` : selectedFile ? "Caption (optional)..." : "Message..."} 
//             value={newMessage} 
//             onChange={(e) => { 
//               setNewMessage(e.target.value); 
//               socket.emit("typing", { room, user: currentUserRef.current.name }); 
//             }} 
//             disabled={uploadingFile} 
//             className={`flex-1 min-w-0 p-2.5 md:p-3 lg:p-4 text-sm md:text-base rounded-xl md:rounded-2xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-xl disabled:opacity-50`} 
//           />
//           <button type="submit" disabled={uploadingFile || (!newMessage.trim() && !selectedFile)} className={`${theme.colors.bgButton} px-4 md:px-6 lg:px-8 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}>
//             {uploadingFile ? "⏳" : replyingTo ? "Reply" : "Send"}
//           </button>
//         </form>
//       </main>

//       <style>{`
//         @keyframes slideIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }

//UPDATED 
// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { socket } from "../socket";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import api from "../api/axios";

export default function Dashboard() {
  const { theme } = useTheme();
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
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  // 🔥 Reaction states
  const [showReactionPicker, setShowReactionPicker] = useState(null);
  const [messageReactions, setMessageReactions] = useState({});
  
  // 🔥 Reply/Thread states
  const [replyingTo, setReplyingTo] = useState(null);
  
  const currentUserRef = useRef({ name: "Unknown", id: null });
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const oldestMessageId = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        currentUserRef.current.name = decoded.name || decoded.email || "Unknown";
        currentUserRef.current.id = decoded.id || decoded._id || null;
      } catch (err) {
        console.error("JWT decode failed:", err);
      }
    }
  }, []);

  useEffect(() => {
    const userName = currentUserRef.current.name;
    const userId = currentUserRef.current.id;
    socket.emit("joinRoom", { room, user: userName, userId });

    const handleRoomMessages = (msgs) => {
      setMessages(msgs || []);
      setHasMore(msgs.length >= 50);
      if (msgs.length > 0) {
        oldestMessageId.current = msgs[0]._id;
      }
      
      const reactionsMap = {};
      msgs.forEach(msg => {
        if (msg.reactions) {
          reactionsMap[msg._id] = msg.reactions;
        }
      });
      setMessageReactions(reactionsMap);
    };
    
    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.reactions) {
        setMessageReactions(prev => ({...prev, [msg._id]: msg.reactions}));
      }
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    };
    
    const handleTyping = ({ user }) => {
      if (!user || user === userName) return;
      setTypingUsers((prev) => (prev.includes(user) ? prev : [...prev, user]));
      setTimeout(() => setTypingUsers((prev) => prev.filter((u) => u !== user)), 2000);
    };
    
    const handleOnline = (users) => setOnlineUsers(users || []);
    
    const handleMessageDeleted = ({ messageId }) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
      setMessageReactions(prev => {
        const newReactions = {...prev};
        delete newReactions[messageId];
        return newReactions;
      });
    };
    
    const handleMessageEdited = ({ messageId, newMessage }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, message: newMessage, edited: true } : msg))
      );
    };
    
    const handleMessageReaction = ({ messageId, reactions }) => {
      setMessageReactions(prev => ({ ...prev, [messageId]: reactions }));
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, reactions } : msg
      ));
    };

    socket.on("roomMessages", handleRoomMessages);
    socket.on("receiveMessage", handleReceive);
    socket.on("typing", handleTyping);
    socket.on("onlineUsers", handleOnline);
    socket.on("messageDeleted", handleMessageDeleted);
    socket.on("messageEdited", handleMessageEdited);
    socket.on("messageReaction", handleMessageReaction);

    return () => {
      socket.off("roomMessages", handleRoomMessages);
      socket.off("receiveMessage", handleReceive);
      socket.off("typing", handleTyping);
      socket.off("onlineUsers", handleOnline);
      socket.off("messageDeleted", handleMessageDeleted);
      socket.off("messageEdited", handleMessageEdited);
      socket.off("messageReaction", handleMessageReaction);
    };
  }, [room]);

  useEffect(() => {
    if (messages.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = async () => {
    const container = chatContainerRef.current;
    if (!container || loadingMore || !hasMore) return;

    if (container.scrollTop === 0) {
      setLoadingMore(true);
      const prevHeight = container.scrollHeight;

      try {
        const response = await api.get(`/messages/${room}?before=${oldestMessageId.current}&limit=50`);
        const olderMessages = response.data;

        if (olderMessages.length > 0) {
          setMessages((prev) => [...olderMessages, ...prev]);
          oldestMessageId.current = olderMessages[0]._id;
          
          const reactionsMap = {};
          olderMessages.forEach(msg => {
            if (msg.reactions) {
              reactionsMap[msg._id] = msg.reactions;
            }
          });
          setMessageReactions(prev => ({...reactionsMap, ...prev}));
          
          setTimeout(() => {
            container.scrollTop = container.scrollHeight - prevHeight;
          }, 100);
        }

        if (olderMessages.length < 50) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Error loading more messages:", err);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setShowReactionPicker(null);
    };
    if (contextMenu || showReactionPicker) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu, showReactionPicker]);

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
    return date.toLocaleString();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File too large! Max 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSendFile = async () => {
    if (!selectedFile) return;
    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const msgData = {
        room,
        message: newMessage.trim() || "",
        user: currentUserRef.current.name,
        userId: currentUserRef.current.id,
        fileUrl: res.data.fileUrl,
        fileName: res.data.fileName,
        fileType: res.data.fileType,
        fileSize: res.data.fileSize,
      };

      if (replyingTo) {
        msgData.replyTo = replyingTo._id;
        socket.emit("sendReply", msgData);
        setReplyingTo(null);
      } else {
        socket.emit("sendMessage", msgData);
      }
      
      setSelectedFile(null);
      setNewMessage("");
      fileInputRef.current.value = "";
    } catch (err) {
      alert("Error uploading file: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (selectedFile) {
      handleSendFile();
      return;
    }
    const text = newMessage.trim();
    if (!text) return;

    const msgData = {
      room,
      message: text,
      user: currentUserRef.current.name,
      userId: currentUserRef.current.id,
    };

    if (replyingTo) {
      msgData.replyTo = replyingTo._id;
      socket.emit("sendReply", msgData);
      setReplyingTo(null);
    } else {
      socket.emit("sendMessage", msgData);
    }

    setNewMessage("");
  };

  const handleContextMenu = (e, msg) => {
    e.preventDefault();
    if (msg.user === currentUserRef.current.name) {
      setContextMenu({ 
        x: e.clientX, 
        y: e.clientY, 
        messageId: msg._id, 
        message: msg.message,
        hasFile: !!msg.fileUrl 
      });
    }
  };

  const handleDelete = (messageId) => {
    setShowDeleteConfirm(messageId);
    setContextMenu(null);
  };

  const confirmDelete = () => {
    socket.emit("deleteMessage", { room, messageId: showDeleteConfirm });
    setShowDeleteConfirm(null);
  };

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

  const handleAddReaction = (messageId, emoji) => {
    const userId = currentUserRef.current.id;
    if (!userId) return;
    socket.emit("addReaction", { messageId, emoji, userId, room });
    setShowReactionPicker(null);
  };

  const handleReply = (msg) => {
    setReplyingTo(msg);
    setContextMenu(null);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className={`flex h-screen ${theme.colors.bgMain} ${theme.colors.textPrimary} relative overflow-hidden`}>
      <div className={`absolute inset-0 ${theme.colors.bgAnimated} animate-pulse`}></div>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <Sidebar room={room} setRoom={setRoom} onlineUsers={onlineUsers} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col w-full relative z-10 lg:ml-64">
        <div className={`fixed top-[64px] left-0 lg:left-64 right-0 z-30 flex items-center justify-between ${theme.colors.bgHeader} p-4 md:p-5 border-b ${theme.colors.borderPrimary} shadow-xl pointer-events-auto`}>
          <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden ${theme.colors.textPrimary} text-xl md:text-2xl focus:outline-none hover:text-blue-400 transition p-2`}>
            ☰
          </button>
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${theme.colors.textGradient} truncate flex-1 text-center lg:text-left px-2 flex items-center justify-center lg:justify-start`}>
            Room: {room} 🚀
          </h2>
          <div className="w-10 lg:hidden"></div>
        </div>

        <div 
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overscroll-contain px-2 sm:px-4 md:px-6 py-4 space-y-3 md:space-y-4 mt-[80px] md:mt-[88px]"
        >
          {loadingMore && (
            <div className="text-center py-2">
              <div className="inline-block w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {messages.map((msg, idx) => {
            const isOwn = msg.user === currentUserRef.current.name;
            const isEditing = editingMessageId === msg._id;
            const reactions = messageReactions[msg._id] || msg.reactions || {};
            const hasReactions = Object.keys(reactions).length > 0;

            return (
              <div
                key={msg._id || idx}
                className={`flex items-start gap-2 md:gap-3 max-w-[95%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] animate-slideIn ${isOwn ? "ml-auto flex-row-reverse" : ""}`}
                onContextMenu={(e) => handleContextMenu(e, msg)}
              >
                <div className={`w-8 h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs md:text-sm shadow-lg ${isOwn ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gradient-to-br from-gray-600 to-gray-700"}`}>
                  {msg.user?.charAt(0).toUpperCase() || "?"}
                </div>

                <div className={`group relative rounded-xl md:rounded-2xl p-3 md:p-4 text-sm md:text-base shadow-xl transition-all overflow-hidden ${isOwn ? theme.colors.bgMessageOwn + " text-right" : theme.colors.bgMessageOther + " text-left"}`}>
                  <div className={`text-[10px] md:text-xs ${theme.colors.textSecondary} mb-1 flex flex-wrap items-center gap-1 md:gap-2`}>
                    <strong className="text-blue-300 break-words max-w-full">{msg.user}</strong>
                    <span className="opacity-70">•</span>
                    <span className="opacity-70 text-[10px] md:text-xs whitespace-nowrap">{msg.createdAt ? formatTime(msg.createdAt) : ""}</span>
                    {msg.edited && <span className="text-[10px] md:text-xs italic text-purple-300 whitespace-nowrap">(edited)</span>}
                    {msg.replyTo && <span className="text-[10px] text-blue-300">↩️</span>}
                  </div>

                  {msg.fileUrl ? (
                    <div className="mt-2">
                      {msg.fileType === "image" ? (
                        <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                          <img src={msg.fileUrl} alt={msg.fileName} className="max-w-full max-h-48 md:max-h-64 rounded-lg hover:opacity-90 transition" />
                        </a>
                      ) : (
                        <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 md:gap-3 ${theme.colors.bgInput} p-2 md:p-3 rounded-lg hover:bg-white/20 transition`}>
                          <div className="text-2xl md:text-4xl flex-shrink-0">{msg.fileType === "pdf" ? "📄" : "📁"}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold break-words text-xs md:text-sm">{msg.fileName}</div>
                            <div className={`text-[10px] md:text-xs ${theme.colors.textMuted} mt-1`}>{formatFileSize(msg.fileSize)}</div>
                          </div>
                          <div className="text-blue-400 flex-shrink-0">⬇️</div>
                        </a>
                      )}
                      {msg.message && <div className="mt-2 break-words whitespace-pre-wrap text-sm md:text-base">{msg.message}</div>}
                    </div>
                  ) : isEditing ? (
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={editText} 
                        onChange={(e) => setEditText(e.target.value)} 
                        className={`w-full bg-white/20 ${theme.colors.borderPrimary} border rounded-lg px-2 md:px-3 py-1.5 md:py-2 ${theme.colors.textPrimary} text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        autoFocus 
                        onKeyDown={(e) => { 
                          if (e.key === "Enter") saveEdit(msg._id); 
                          if (e.key === "Escape") cancelEdit(); 
                        }} 
                      />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => saveEdit(msg._id)} className="px-2 md:px-3 py-1 bg-green-500/80 hover:bg-green-500 rounded-lg text-[10px] md:text-xs font-semibold transition">Save</button>
                        <button onClick={cancelEdit} className="px-2 md:px-3 py-1 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-[10px] md:text-xs font-semibold transition">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="break-words whitespace-pre-wrap text-sm md:text-base overflow-wrap-anywhere">{msg.message}</div>
                  )}

                  {!isEditing && (
                    <div className={`absolute -top-2 ${isOwn ? 'right-2' : 'left-2'} hidden group-hover:flex gap-1 ${theme.colors.bgContextMenu} rounded-lg p-1 shadow-lg z-10`}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowReactionPicker(showReactionPicker === msg._id ? null : msg._id);
                        }}
                        className="px-1.5 py-1 hover:bg-yellow-500/50 rounded text-xs transition" 
                        title="React"
                      >
                        😀
                      </button>
                      <button onClick={() => handleReply(msg)} className="px-1.5 py-1 hover:bg-purple-500/50 rounded text-xs transition" title="Reply">💬</button>
                      {isOwn && !msg.fileUrl && (
                        <button onClick={() => startEdit(msg._id, msg.message)} className="px-1.5 py-1 hover:bg-blue-500/50 rounded text-xs transition" title="Edit">✏️</button>
                      )}
                      {isOwn && (
                        <button onClick={() => handleDelete(msg._id)} className="px-1.5 py-1 hover:bg-red-500/50 rounded text-xs transition" title="Delete">🗑️</button>
                      )}
                    </div>
                  )}

                  {showReactionPicker === msg._id && (
                    <div 
                      className={`absolute ${isOwn ? 'right-0' : 'left-0'} -top-12 ${theme.colors.bgCard} rounded-xl px-2 py-1 shadow-2xl z-50 flex gap-1`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {['❤️', '😂', '👍', '🔥', '🎉', '😮', '😢', '👏'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleAddReaction(msg._id, emoji)}
                          className="text-xl hover:scale-125 transition-transform p-1 hover:bg-white/10 rounded"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {hasReactions && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(reactions).map(([emoji, users]) => {
                        const userReacted = users.includes(currentUserRef.current.id);
                        return (
                          <button
                            key={emoji}
                            onClick={() => handleAddReaction(msg._id, emoji)}
                            className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-xs transition-all hover:scale-110 ${
                              userReacted
                                ? 'bg-blue-500/40 border border-blue-400/80'
                                : 'bg-white/10 border border-white/20 hover:bg-white/20'
                            }`}
                            title={`${users.length} reaction${users.length > 1 ? 's' : ''}`}
                          >
                            <span className="text-sm">{emoji}</span>
                            <span className="text-[10px] font-semibold">{users.length}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {contextMenu && (
          <div className={`fixed ${theme.colors.bgContextMenu} rounded-lg shadow-2xl py-2 z-50`} style={{ top: contextMenu.y, left: Math.min(contextMenu.x, window.innerWidth - 200) }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => {
              const msg = messages.find(m => m._id === contextMenu.messageId);
              handleReply(msg);
            }} className={`w-full px-4 py-2 text-left hover:bg-purple-500/30 transition text-sm flex items-center gap-2 ${theme.colors.textSecondary}`}>💬 Reply</button>
            {!contextMenu.hasFile && (
              <button onClick={() => startEdit(contextMenu.messageId, contextMenu.message)} className={`w-full px-4 py-2 text-left hover:bg-blue-500/30 transition text-sm flex items-center gap-2 ${theme.colors.textSecondary}`}>✏️ Edit Message</button>
            )}
            <button onClick={() => handleDelete(contextMenu.messageId)} className="w-full px-4 py-2 text-left hover:bg-red-500/30 transition text-sm flex items-center gap-2 text-red-400">🗑️ Delete Message</button>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className={`${theme.colors.bgCard} rounded-2xl p-4 md:p-6 max-w-sm w-full shadow-2xl`}>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Delete Message?</h3>
              <p className={`text-sm md:text-base ${theme.colors.textSecondary} mb-4 md:mb-6`}>This will delete the message {messages.find(m => m._id === showDeleteConfirm)?.fileUrl ? "and file " : ""}permanently.</p>
              <div className="flex gap-2 md:gap-3">
                <button onClick={confirmDelete} className="flex-1 bg-red-500/80 hover:bg-red-500 py-2 rounded-lg font-semibold transition text-sm md:text-base">Delete</button>
                <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 bg-gray-600/80 hover:bg-gray-600 py-2 rounded-lg font-semibold transition text-sm md:text-base">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className={`px-2 sm:px-4 md:px-6 pb-2 text-xs md:text-sm italic text-purple-300 min-h-[20px]`}>
          {typingUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
              </div>
              <span className="truncate">{typingUsers.length === 1 ? `${typingUsers[0]} is typing...` : `${typingUsers.join(", ")} are typing...`}</span>
            </div>
          )}
        </div>

        {replyingTo && (
          <div className="px-2 sm:px-4 md:px-6 pb-2">
            <div className={`flex items-center gap-2 ${theme.colors.bgCard} rounded-xl p-2 border-l-4 border-blue-400`}>
              <div className="flex-1 min-w-0">
                <div className={`text-xs ${theme.colors.textSecondary}`}>
                  ↩️ <span className="font-semibold">{replyingTo.user}</span>: <span className="truncate">{replyingTo.message || "(file)"}</span>
                </div>
              </div>
              <button onClick={cancelReply} className="text-red-400 hover:text-red-300 text-lg">✕</button>
            </div>
          </div>
        )}

        {selectedFile && (
          <div className="px-2 sm:px-4 md:px-6 pb-2">
            <div className={`flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl ${theme.colors.bgCard} p-2 md:p-3 shadow-xl`}>
              <div className="flex h-8 w-8 md:h-10 md:w-10 flex-shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-lg md:text-2xl">
                {selectedFile.type?.startsWith("image/") ? "🖼️" : selectedFile.type === "application/pdf" ? "📄" : "📁"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="break-words font-semibold text-xs md:text-sm">{selectedFile.name}</div>
                <div className={`text-[10px] md:text-xs ${theme.colors.textSecondary}`}>{formatFileSize(selectedFile.size)}</div>
                {uploadingFile && (
                  <div className="mt-1 h-1 md:h-1.5 w-full overflow-hidden rounded bg-white/10">
                    <div className="h-full w-2/3 animate-pulse bg-gradient-to-r from-blue-400/60 to-purple-400/60"></div>
                  </div>
                )}
              </div>
              <button onClick={() => { setSelectedFile(null); fileInputRef.current.value = ""; }} className="ml-2 rounded-lg bg-white/10 px-2 py-1 text-xs md:text-sm text-red-300 hover:bg-white/20 transition flex-shrink-0">✕</button>
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="flex gap-2 px-2 sm:px-4 md:px-6 pb-3 md:pb-4">
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt,.zip" />
          <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile} className={`p-2.5 md:p-3 lg:p-4 ${theme.colors.bgInput} rounded-xl md:rounded-2xl hover:bg-white/20 transition disabled:opacity-50 flex-shrink-0 text-lg md:text-xl`} title="Attach file">📎</button>
          <input 
            type="text" 
            placeholder={replyingTo ? `Reply to ${replyingTo.user}...` : selectedFile ? "Caption (optional)..." : "Message..."} 
            value={newMessage} 
            onChange={(e) => { 
              setNewMessage(e.target.value); 
              socket.emit("typing", { room, user: currentUserRef.current.name }); 
            }} 
            disabled={uploadingFile} 
            className={`flex-1 min-w-0 p-2.5 md:p-3 lg:p-4 text-sm md:text-base rounded-xl md:rounded-2xl ${theme.colors.bgInput} ${theme.colors.textPrimary} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-xl disabled:opacity-50`} 
          />
          <button type="submit" disabled={uploadingFile || (!newMessage.trim() && !selectedFile)} className={`${theme.colors.bgButton} px-4 md:px-6 lg:px-8 rounded-xl md:rounded-2xl text-sm md:text-base font-semibold shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}>
            {uploadingFile ? "⏳" : replyingTo ? "Reply" : "Send"}
          </button>
        </form>
      </main>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .overflow-wrap-anywhere {
          overflow-wrap: anywhere;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}

import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Listen for incoming messages
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage"); // cleanup
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    const msg = { user: "Me", text }; // temp user (later from auth)
    socket.emit("chatMessage", msg); // send to backend
    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chat Room 🚀</h2>
      <div className="bg-gray-800 rounded-lg h-full p-4 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                m.user === "Me" ? "bg-blue-600 self-end" : "bg-gray-700"
              }`}
            >
              <strong>{m.user}:</strong> {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="flex mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-2 rounded-l bg-gray-700 text-white focus:outline-none"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

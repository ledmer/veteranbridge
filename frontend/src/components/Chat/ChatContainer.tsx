import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

const ChatContainer = () => {
  const { user, fetchUser } = useAuthStore();
  const { messages, sendMessage, connectSocket, selectedGroup } = useChatStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    if (user) connectSocket();
  }, [user, connectSocket]);

  useEffect(() => {
    if (!user) fetchUser();
  }, [user, fetchUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user || !selectedGroup) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col h-full p-4 bg-white rounded-lg shadow-md m-4">
      <ChatHeader groupName={selectedGroup || "General"} membersCount={0} />
      <div className="flex-1 bg-gray-50 rounded p-4 mb-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center">No messages yet.</div>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg) => (
              <li key={msg.id} className="">
                <span className="font-semibold text-blue-700 mr-2">
                  {msg.sender}:
                </span>
                <span>{msg.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="flex gap-2" onSubmit={handleSend}>
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!user || !selectedGroup}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={!user || !selectedGroup}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;

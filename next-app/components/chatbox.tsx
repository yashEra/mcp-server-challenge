"use client";

import { useState, useRef, ChangeEvent } from "react";

export function ChatBox() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!inputMessage) return;
    const newMsg = { id: Date.now(), text: inputMessage };
    setMessages([...messages, newMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/tool/cv-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arguments: { question: newMsg.text } }),
      });
      const data = await res.json();
      if (data.content && data.content.length > 0) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, text: data.content[0].text }]);
      }
    } catch {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Error: Cannot get response" }]);
    } finally {
      setLoading(false);
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl flex flex-col max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-500">CV Chat</h1>

      <div ref={chatRef} className="h-[40vh] overflow-y-auto mb-4 p-6 bg-white drop-shadow-md rounded-xl">
        {messages.length === 0 && !loading && <p className="text-gray-400 text-center">Start chatting...</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <p className="inline-block bg-indigo-100 text-indigo-900 py-2 px-4 rounded-lg">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
          placeholder="Enter your question..."
          className="flex-grow border-2 border-indigo-500 p-2 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChatBox } from "../../components/chatbox";
import { EmailForm } from "../../components/email";

export default function HomePage() {
  const [mode, setMode] = useState<"chat" | "email">("chat");

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-2">MCP Dashboard</h1>
        <p className="text-lg text-gray-700">Chat with your CV or send notifications via email</p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg overflow-hidden shadow-md mb-6">
        <button
          className={`px-6 py-3 font-semibold transition-all ${
            mode === "chat" ? "bg-indigo-500 text-white shadow-lg" : "bg-white text-indigo-600 hover:bg-indigo-100"
          }`}
          onClick={() => setMode("chat")}
        >
          Chat
        </button>
        <button
          className={`px-6 py-3 font-semibold transition-all ${
            mode === "email" ? "bg-indigo-500 text-white shadow-lg" : "bg-white text-indigo-600 hover:bg-indigo-100"
          }`}
          onClick={() => setMode("email")}
        >
          Email Notification
        </button>
      </div>

      {/* Content Card */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg transition-all duration-300">
        {mode === "chat" ? <ChatBox /> : <EmailForm />}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500">
        © 2025 Yasith Eranda. All rights reserved.
      </footer>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import { useUser } from "@/hooks/useUser";

export default function ChatBox({ onBack, username }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Load chat history
  useEffect(() => {
    if (!username) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/history/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load history");

        const history = await res.json();

        const formatted = history
          .map((msg) => ({
            id: msg.id,
            text: msg.message || "(empty message)",
            sender: msg.sender === user.username ? "me" : "other",
            time: new Date(msg.timestamp).toLocaleTimeString(),
            timestamp: new Date(msg.timestamp).getTime(),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(formatted);
      } catch (err) {
        console.error("Error loading chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [username, user?.username, API_BASE_URL]);

  // ✅ WebSocket connection
  useEffect(() => {
    if (!username) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) return;

    const wsUrl = `ws://localhost:8000/ws/chat/${username}/?token=${token}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = async (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (data.sender === user.username) return;

      // ✅ case 1: encrypted msg with message_id
      if (data.message_id) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/decrypt/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message_id: data.message_id }),
          });

          const result = await res.json();
          setMessages((prev) => [
            ...prev,
            {
              id: data.message_id,
              text: result.decrypted_message || "(empty message)",
              sender: "other",
              time: new Date().toLocaleTimeString(),
              timestamp: Date.now(),
            },
          ]);
        } catch (err) {
          console.error("Decrypt error:", err);
        }
      }

      // ✅ case 2: plain text from backend
      if (data.message && !data.message_id) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.id || Date.now(),
            text: data.message,
            sender: "other",
            time: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
          },
        ]);
      }
    };

    return () => {
      socketRef.current?.close();
    };
  }, [username, user?.username, API_BASE_URL]);

  // ✅ Send message
  const addMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ message: text, receiver: username })
      );
    }
  };

  return (
    <div className="relative flex flex-col flex-1 h-full">
      {/* ✅ Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <div className="animate-spin h-10 w-10 border-4 border-gray-400 border-t-blue-500 rounded-full"></div>
        </div>
      )}

      <Card className="flex flex-col flex-1 h-full border-0 pb-4 md:p-0 pt-20 md:pt-0">
        <ChatHeader onBack={onBack} />

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-0 space-y-1">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              {...msg}
              senderName={msg.sender === "other" ? username : "Me"}
            />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <MessageInput onSend={addMessage} />
      </Card>
    </div>
  );
}

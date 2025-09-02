import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Sidebar({ onSelectChat }) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // ✅ Fetch conversations
  const fetchConversations = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(`${API_BASE_URL}/api/chats/recent/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch chats:", res.status);
        return;
      }

      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch once on mount + auto-refresh every 10s
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full md:w-[500px] border-0 flex flex-col pt-20 md:pt-0">
      {/* Search */}
      <div className="p-4">
        <Input
          placeholder="Search your conversations"
          className="rounded-full hover:border-transparent focus-visible:ring-1"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-around px-4 mb-2">
        {["All", "Read", "Unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              activeTab === tab.toLowerCase()
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {conversations.map((c) => {
            const displayName = c.other_user.full_name || c.other_user.username;
            return (
              <div
              key={c.id}
              onClick={() => {
                setSelectedChat(c.id);
                if (onSelectChat) onSelectChat(c.other_user.username); // ✅ Pass username
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-lg ${
                selectedChat === c.id ? "bg-indigo-50" : "hover:bg-gray-100"
              }`}
            >
                <Avatar>
                  <AvatarImage src="/avatars/default.png" />
                  <AvatarFallback>
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{displayName}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(c.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {c.last_message_preview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}

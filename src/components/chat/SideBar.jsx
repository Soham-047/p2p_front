import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Pinak Halder", message: "Thanks for the help yesterday!", time: "3m", avatar: "/avatars/1.png", unread: true, unreadCount: 3 },
  { id: 2, name: "Soham Raj Chopra", message: "Hey, how’s the project going?", time: "2m", avatar: "/avatars/2.png", unread: false },
  { id: 3, name: "Ritik Kumar Sen", message: "Thanks for the help yesterday!", time: "2 days", avatar: "/avatars/3.png", unread: false },
  { id: 4, name: "Roshan Singh", message: "Hey, Mahendra how are you doing. Let’s catch up today", time: "1h", avatar: "/avatars/4.png", unread: false },
  { id: 5, name: "Ritik Kumar Sen", message: "Thanks for the help yesterday!", time: "July 13", avatar: "/avatars/3.png", unread: false },
];

export default function Sidebar({ onSelectChat }) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState(2);

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
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedChat(c.id);
                if (onSelectChat) onSelectChat(); // mobile: switch to ChatBox
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-lg ${
                selectedChat === c.id ? "bg-indigo-50" : "hover:bg-gray-100"
              }`}
            >
              <Avatar>
                <AvatarImage src={c.avatar} />
                <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{c.name}</p>
                  <span className="text-xs text-gray-400">{c.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{c.message}</p>
              </div>

              {c.unread && (
                <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {c.unreadCount || ""}
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}


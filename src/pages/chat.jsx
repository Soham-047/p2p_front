import { useState } from "react";
import Sidebar from "../components/chat/SideBar";
import ChatBox from "../components/chat/ChatBox";

export default function ChatLayout() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex flex-1 h-screen bg-white shadow-lg rounded-lg md:p-4 overflow-hidden">
      {/* Desktop / Tablet view: both visible */}
      <div className="hidden md:flex w-full">
        <Sidebar onSelectChat={() => setShowChat(true)} />
        <ChatBox onBack={() => setShowChat(false)} />
      </div>

      {/* Mobile view: conditional rendering */}
      <div className="flex md:hidden w-full">
        {!showChat ? (
          <Sidebar onSelectChat={() => setShowChat(true)} />
        ) : (
          <ChatBox onBack={() => setShowChat(false)} />
        )}
      </div>
    </div>
  );
}

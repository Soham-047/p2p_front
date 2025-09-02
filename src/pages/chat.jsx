import { useState } from "react";
import Sidebar from "../components/chat/SideBar";
import ChatBox from "../components/chat/ChatBox";

export default function ChatLayout() {
  const [showChat, setShowChat] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className="flex flex-1 h-screen bg-white shadow-lg rounded-lg md:p-4 overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:flex w-full">
        <Sidebar
          onSelectChat={(username) => {
            setActiveUser(username);
            setShowChat(true);
          }}
        />
        {showChat ? (
          <ChatBox username={activeUser} onBack={() => setShowChat(false)} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <img src="/placeholder.png" alt="Welcome" className="w-80" />
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full">
        {!showChat ? (
          <Sidebar
            onSelectChat={(username) => {
              setActiveUser(username);
              setShowChat(true);
            }}
          />
        ) : (
          <ChatBox username={activeUser} onBack={() => setShowChat(false)} />
        )}
      </div>
    </div>
  );
}

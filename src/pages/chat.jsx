// import { useState } from "react";
// import Sidebar from "../components/chat/SideBar";
// import ChatBox from "../components/chat/ChatBox";

// export default function ChatLayout() {
//   const [showChat, setShowChat] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);

//   return (
//     <div className="flex flex-1 h-screen bg-white shadow-lg rounded-lg md:p-4 overflow-hidden">
//       {/* Desktop */}
//       <div className="hidden md:flex w-full">
//         <Sidebar
//           onSelectChat={(username) => {
//             setActiveUser(username);
//             setShowChat(true);
//           }}
//         />
//         {showChat ? (
//           <ChatBox username={activeUser} onBack={() => setShowChat(false)} />
//         ) : (
//           <div className="flex-1 flex items-center justify-center">
//             <img src="/placeholder.png" alt="Welcome" className="w-80" />
//           </div>
//         )}
//       </div>

//       {/* Mobile */}
//       <div className="flex md:hidden w-full">
//         {!showChat ? (
//           <Sidebar
//             onSelectChat={(username) => {
//               setActiveUser(username);
//               setShowChat(true);
//             }}
//           />
//         ) : (
//           <ChatBox username={activeUser} onBack={() => setShowChat(false)} />
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Sidebar from "../components/chat/SideBar";
import ChatBox from "../components/chat/ChatBox";
import EmptyConversations from "../components/chat/EmptyConversations";
import SearchConversations from "../components/chat/SearchConversations";

export default function ChatLayout() {
  const [showChat, setShowChat] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // ✅ Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token =
          parts.length === 2 ? parts.pop().split(";").shift() : null;

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
      } catch (err) {
        console.error("Error fetching conversations:", err);
      }
    };

    fetchConversations();
  }, []);

  // ✅ Show Empty screen
  if (conversations && conversations.length === 0 && !showSearch) {
    return <EmptyConversations onSearch={() => setShowSearch(true)} />;
  }

  // ✅ Show Search screen
  if (showSearch) {
    return (
      <SearchConversations
        onSelectUser={(username) => {
          setActiveUser(username);
          setShowSearch(false);
          setShowChat(true);
        }}
      />
    );
  }

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

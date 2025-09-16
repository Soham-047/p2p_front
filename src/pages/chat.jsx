

// import { useEffect, useState } from "react";
// import Sidebar from "../components/chat/SideBar";
// import ChatBox from "../components/chat/ChatBox";
// import EmptyConversations from "../components/chat/EmptyConversations";
// import SearchConversations from "../components/chat/SearchConversations";

// export default function ChatLayout() {
//   const [showChat, setShowChat] = useState(false);
//   const [activeUser, setActiveUser] = useState(null);
//   const [conversations, setConversations] = useState(null);
//   const [showSearch, setShowSearch] = useState(false);
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//   // ✅ Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; token=`);
//         const token =
//           parts.length === 2 ? parts.pop().split(";").shift() : null;

//         if (!token) return;

//         const res = await fetch(`${API_BASE_URL}/api/messages-app/chats/recent/`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) {
//           console.error("Failed to fetch chats:", res.status);
//           return;
//         }

//         const data = await res.json();
//         setConversations(data);
//       } catch (err) {
//         console.error("Error fetching conversations:", err);
//       }
//     };

//     fetchConversations();
//   }, []);

//   // ✅ Show Empty screen (only if no active chat and not searching)
//   if (!showChat && conversations && conversations.length === 0 && !showSearch) {
//     return <EmptyConversations onSearch={() => setShowSearch(true)} />;
//   }

//   // ✅ Show Search screen
//   if (showSearch) {
//     return (
//       <SearchConversations
//         onSelectUser={(user) => {
//           setActiveUser({
//             username: user.username,
//             fullName:  user.full_name,
//           });
//           setShowSearch(false);
//           setShowChat(true);
//         }}
//       />
//     );
//   }

//   return (
//     <div className="flex flex-1 h-screen bg-white shadow-lg rounded-lg md:p-4 overflow-hidden">
//       {/* Desktop */}
//       <div className="hidden md:flex w-full">
//         <Sidebar
//           onSelectChat={(username) => {
//             // wrap username as object
//             setActiveUser({ username, fullName: username });
//             setShowChat(true);
//           }}
//         />
//         {showChat && activeUser ? (
//           <ChatBox
//           key={activeUser.username}   // ✅ force remount on user change
//           username={activeUser.username}
//           fullName={activeUser.fullName}
//           onBack={() => setShowChat(false)}
//         />
//         ) : (
//           <div className="flex-1 flex flex-col items-center justify-center">
//             <h2 className="text-4xl font-semibold mb-4">
//           Initiate a great conversation just <br /> before asking for referrals
//         </h2>
//             <img src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757238460/Graduation_2_h3qc2a.png"
//              alt="Welcome" className="w-[600px] h-[600px]" />
//           </div>
//         )}
//       </div>

//       {/* Mobile */}
//       <div className="flex md:hidden w-full">
//         {!showChat ? (
//           <Sidebar
//             onSelectChat={(username) => {
//               setActiveUser({ username, fullName: username });
//               setShowChat(true);
//             }}
//           />
//         ) : (
//           <ChatBox
//             username={activeUser.username}
//             fullName={activeUser.fullName}
//             onBack={() => setShowChat(false)}
//           />
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

export default function ChatLayout({ pendingChatUser, onChatUserUsed }) {
  const [showChat, setShowChat] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle pending chat user from ProfileDialog
  useEffect(() => {
    if (pendingChatUser) {
      setActiveUser(pendingChatUser);
      setShowChat(true);
      setShowSearch(false);
      // Clear the pending user
      if (onChatUserUsed) {
        onChatUserUsed();
      }
    }
  }, [pendingChatUser, onChatUserUsed]);

  // ✅ Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token =
          parts.length === 2 ? parts.pop().split(";").shift() : null;

        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/messages-app/chats/recent/`, {
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

  // ✅ Show Empty screen (only if no active chat and not searching)
  if (!showChat && conversations && conversations.length === 0 && !showSearch) {
    return <EmptyConversations onSearch={() => setShowSearch(true)} />;
  }

  // ✅ Show Search screen
  if (showSearch) {
    return (
      <SearchConversations
        onSelectUser={(user) => {
          setActiveUser({
            username: user.username,
            fullName: user.full_name,
          });
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
          onSelectChat={(username,full_name) => {
            // wrap username as object
           
            setActiveUser({ username, fullName: full_name });
            setShowChat(true);
          }}
        />
       

        {showChat && activeUser ? (
          <ChatBox
            key={activeUser.username} 
            username={activeUser.username}
            fullName={activeUser.fullName}
            onBack={() => setShowChat(false)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-semibold mb-4">
              Initiate a great conversation just <br /> before asking for referrals
              </h2>

                       <img src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757238460/Graduation_2_h3qc2a.png"
             alt="Welcome" className="w-[600px] h-[600px]" />
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex md:hidden w-full">
        {!showChat ? (
          <Sidebar
            onSelectChat={(username,full_name) => {
              setActiveUser({ username, fullName: full_name });
              setShowChat(true);
            }}
          />
        ) : (
          <ChatBox
            username={activeUser.username}
            fullName={activeUser.fullName}
            onBack={() => setShowChat(false)}
          />
        )}
      </div>
    </div>
  );
}
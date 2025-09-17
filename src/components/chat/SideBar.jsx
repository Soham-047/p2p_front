import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { Image } from "@radix-ui/react-avatar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Sidebar({ onSelectChat }) {
  
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  
  // Search states
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);

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
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // ✅ Search users function
  const fetchUsers = useCallback(
    async (searchTerm) => {
      try {
        setLoading(true);

        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token =
          parts.length === 2 ? parts.pop().split(";").shift() : null;

        if (!token) return;

        const res = await fetch(
          `${API_BASE_URL}/api/posts-app/users/search?search=${encodeURIComponent(
            searchTerm
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to search users:", res.status);
          setSearchResults([]);
          return;
        }

        const data = await res.json();
        setSearchResults(data|| []);
      } catch (err) {
        console.error("Error searching users:", err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // ✅ Debounce effect: call API only after user stops typing for 300ms
  useEffect(() => {
    if (query.length <= 2) {
      setSearchResults([]);
      setIsSearchMode(false);
      return;
    }

    setIsSearchMode(true);
    const handler = setTimeout(() => {
      fetchUsers(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, fetchUsers]);

  // Fetch conversations once on mount + auto-refresh every 10s
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setIsSearchMode(false);
  };

  // Handle user selection from search results
 // Search result selection
const handleSelectUser = (user) => {
  setSelectedChat(null);
  if (onSelectChat) {
    onSelectChat(user.username, user.full_name || user.username ,user.avatar_url);
  }
  setQuery("");
  setSearchResults([]);
  setIsSearchMode(false);
};

// Conversation selection
const handleSelectConversation = (conversation) => {
  setSelectedChat(conversation.id);
  if (onSelectChat) {
    onSelectChat(
      conversation.other_user.username,
      conversation.other_user.full_name || conversation.other_user.username,
      conversation.other_user.avatar_url
    );
  }
};

  const formatLastMessage = (text) => {
    if (!text) return "";
  
    // Detect Cloudinary image URL
    const cloudinaryRegex = /https?:\/\/res\.cloudinary\.com\/[^\s]+/g;
  
    if (cloudinaryRegex.test(text)) {
      // Remove the actual URL
      const withoutUrl = text.replace(cloudinaryRegex, "").trim();
  
      return (
        <span className="flex items-center gap-1 text-gray-500 text-sm truncate">
          {withoutUrl && <span>{withoutUrl}</span>}
          <span className="flex items-center gap-1 text-gray-900 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img">
  <title>Photo</title>
  <rect x="2" y="4" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/>
  <path d="M8 15l2.5-3 2 2.5L16 11l4 6H4l4-2z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
</svg>

         
            Photo
          </span>
        </span>
      );
    }
  
    return <span className="text-gray-500 text-sm truncate">{text}</span>;
  };
  

  return (
    <Card className="w-full md:w-[500px] border-0 flex flex-col pt-20 md:pt-0">
      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search conversations or find users"
            value={query}
            onChange={handleSearchChange}
            className="rounded-full pl-10 pr-10 hover:border-transparent focus-visible:ring-1"
          />
          {query && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs - Hide when in search mode */}
     

      {/* Content Area */}
      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {/* Search Results */}
          {isSearchMode && (
            <>
              {loading && (
                <div className="px-4 py-3 text-center text-gray-500">
                  Searching users...
                </div>
              )}
              
              {!loading && searchResults.length === 0 && query.length > 2 && (
                <div className="px-4 py-3 text-center text-gray-500">
                  No users found for "{query}"
                </div>
              )}

              {searchResults.map((user) => {
                const displayName = user.full_name || user.username;
                return (
                  <div
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-lg hover:bg-gray-200 bg-gray-100"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar_url|| "/avatars/default.png"} />
                      <AvatarFallback>
                        {displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col  ">
                        <p className="font-medium truncate">{displayName}</p>
                        <p>{user.headline}</p>
                      </div>
                     
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Existing Conversations */}
         {!isSearchMode &&
  conversations.map((c) => {
    const displayName = c.other_user.full_name || c.other_user.username;
    const isSelected = selectedChat === c.id;
    const hasUnread = c.unread_count > 0;
    const hasMultipleUnread = c.unread_count > 0; // ✅ check >1

    return (
      <div
        key={c.id}
        onClick={() => handleSelectConversation(c)}
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-lg
          ${isSelected 
            ? "bg-indigo-100 " 
            : hasUnread 
              ? "bg-gray-50 hover:bg-gray-100" 
              : "hover:bg-gray-50"
          }`}
      >
      <Avatar>
  {c.other_user?.avatar_url ? (
    <AvatarImage src={c.other_user.avatar_url} alt={displayName} />
  ) : (
    <AvatarImage src="/avatars/default.png" alt={displayName} />
  )}
  <AvatarFallback>
    {displayName?.charAt(0).toUpperCase()}
  </AvatarFallback>
</Avatar>


        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p
              className={`font-medium truncate ${
                hasUnread ? "text-gray-900 font-semibold" : "text-gray-700"
              }`}
            >
              {displayName}
            </p>

            {/* ✅ hide time if unread_count > 1 */}
            {!hasMultipleUnread && (
              <span className="text-xs text-gray-400">
                {new Date(c.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          {/* ✅ message preview */}
          <p
            className={`text-sm truncate ${
              hasMultipleUnread
                ? "text-blue-600 font-semibold"
                : hasUnread
                ? "text-gray-800 font-medium"
                : "text-gray-500"
            }`}
            style={{
              maxWidth: hasMultipleUnread ? "250px" : "250px", // restrict width
            }}
          >
           <span className="text-sm text-gray-500 truncate">
  {formatLastMessage(c.last_message_preview)}
</span>
          </p>
        </div>

        {/* Unread count badge */}
        {hasUnread && (
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-indigo-600 text-white">
            {c.unread_count}
          </span>
        )}
      </div>
    );
  })}


        </div>
      </ScrollArea>
    </Card>
  );
}
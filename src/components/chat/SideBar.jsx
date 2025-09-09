import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Sidebar({ onSelectChat }) {
  const [activeTab, setActiveTab] = useState("all");
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
        setSearchResults(data || []);
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
  const handleSelectUser = (user) => {
    setSelectedChat(null); // Clear selected chat since this is a new conversation
    if (onSelectChat) {
      onSelectChat(user.username); // Pass username to open chat
    }
    // Clear search after selection
    setQuery("");
    setSearchResults([]);
    setIsSearchMode(false);
  };

  // Handle existing conversation selection
  const handleSelectConversation = (conversation) => {
    setSelectedChat(conversation.id);
    if (onSelectChat) {
      onSelectChat(conversation.other_user.username);
    }
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
      {!isSearchMode && (
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
      )}

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
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-lg hover:bg-gray-100"
                  >
                    <Avatar>
                      <AvatarImage src={user.profile_picture || "/avatars/default.png"} />
                      <AvatarFallback>
                        {displayName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{displayName}</p>
                        
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Existing Conversations */}
          {!isSearchMode && conversations.map((c) => {
            const displayName = c.other_user.full_name || c.other_user.username;
            return (
              <div
                key={c.id}
                onClick={() => handleSelectConversation(c)}
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
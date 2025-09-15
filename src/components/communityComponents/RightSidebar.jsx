// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

// export default function CommunityRightSidebar() {
//   const topics = ["Job", "Experience", "Layoffs"];

//   const favorites = [
//     { name: "Soham Raj Chopra", desc: "Software Engineer @Google", avatar: "/avatars/soham.jpg" },
//     { name: "Roshan Singh", desc: "SDE Intern @Infosys", avatar: "/avatars/roshan.jpg" },
//     { name: "Aru Gupta", desc: "Batch of 2026", avatar: "/avatars/aru.jpg" },
//     { name: "Anil Meena", desc: "Batch of 2026", avatar: "/avatars/anil.jpg" },
//     { name: "Rawat Harsh", desc: "ML Engineer @MuSigma", avatar: "/avatars/rawat.jpg" },
//   ];

//   return (
//     <div className="space-y-4">
//       {/* Topics */}
//       <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
//         <p className="font-medium mb-2">Topics you’ve searched for</p>
//         <div className="flex flex-wrap gap-2">
//           {topics.map((topic) => (
//             <span
//               key={topic}
//               className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
//             >
//               {topic}
//             </span>
//           ))}
//         </div>
//       </Card>

//       {/* Favorites */}
//       <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
//         <p className="font-medium mb-4">Catch Up With Your Favorites</p>
//         <div className="flex flex-col gap-3">
//           {favorites.map((fav, idx) => (
//             <div key={idx} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Avatar>
//                   <AvatarImage src={fav.avatar} />
//                   <AvatarFallback>{fav.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="text-sm font-medium">{fav.name}</p>
//                   <p className="text-xs text-gray-500">{fav.desc}</p>
//                 </div>
//               </div>
//               <Button size="icon" variant="ghost">
//                 ↗
//               </Button>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// }






import React, { useState, useCallback, useEffect } from "react";
import { Search, X, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileDialog from "../dashboardComponent/ProfileDailog";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchBar = ({ onMessageClick }) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const navigate = useNavigate();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // 🔎 Search users
  const searchUsers = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(
        `${API_BASE_URL}/api/posts-app/global-search/?q=${encodeURIComponent(
          searchTerm
        )}&type=people`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setSearchResults([]);
        return;
      }

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Error searching users:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔎 Search posts
  const searchPosts = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(
        `${API_BASE_URL}/api/posts-app/global-search/?q=${encodeURIComponent(
          searchTerm
        )}&type=posts`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setSearchResults([]);
        return;
      }

      const data = await res.json();
      setSearchResults(data.results || []);
    } catch (err) {
      console.error("Error searching posts:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 👤 Fetch user profile
  const fetchUserProfile = async (username) => {
    try {
      setProfileLoading(true);
      const token = getCookie("token");
      if (!token) return;

      const res = await fetch(
        `${API_BASE_URL}/api/users-app/profile/${username}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setSelectedProfile(data);
      setShowProfileDialog(true);
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle direct message from dropdown
  const handleDirectMessage = (user) => {
    navigate('/message');
    // Use setTimeout to ensure navigation completes
    setTimeout(() => {
      if (onMessageClick) {
        onMessageClick({
          username: user.username,
          fullName: user.full_name || user.username,
        });
      }
    }, 100);
  };

  // Handle message from profile dialog
  const handleProfileMessage = (userInfo) => {
    if (onMessageClick) {
      onMessageClick(userInfo);
    }
  };

  // ⏳ Debounce search
  useEffect(() => {
    if (query.length <= 2) {
      setSearchResults([]);
      return;
    }
    const handler = setTimeout(() => {
      if (activeTab === "people") {
        searchUsers(query);
      } else if (activeTab === "posts") {
        searchPosts(query);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query, activeTab, searchUsers, searchPosts]);

  return (
    <div className="w-full mx-auto p-4 border-1 border-gray-50 shadow-sm">
      {/* 🔍 Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for people, posts, and more"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-12 py-3 rounded-full border-2 text-lg h-12 focus-visible:ring-2 focus-visible:ring-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* 🗂 Tabs */}
      <div className="flex gap-1 mb-6">
        {["People", "Posts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.toLowerCase()
                ? "bg-blue-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 📋 Search Results */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-8 text-gray-500">Searching...</div>
        )}
        {!loading && searchResults.length === 0 && query.length > 2 && (
          <div className="text-center py-8 text-gray-500">
            No results found for "{query}"
          </div>
        )}

        {activeTab === "people" &&
          searchResults.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user.avatar || "/placeholder-avatar.jpg"} />
                  <AvatarFallback className="text-lg">
                    {user.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {user.full_name || user.username}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {user.headline || "No headline available"}
                  </p>
                </div>

                {/* 3-dot menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-100 ">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border border-gray-200 bg-white shadow-sm md:w-60"
                  >
                    <DropdownMenuItem
                      onClick={() => handleDirectMessage(user)}
                      className="text-[17px] text-gray-700 hover:bg-gray-100"
                    >
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => fetchUserProfile(user.username)}
                      className="text-[17px] text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("View posts", user.username)}
                      className="text-[17px] text-gray-700 hover:bg-gray-100"
                    >
                      View Posts
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

        {activeTab === "posts" &&
          searchResults.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={post.author?.avatar || "/placeholder-avatar.jpg"}
                  />
                  <AvatarFallback className="text-sm">
                    {post.author?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {post.content || "No content"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    By {post.author?.full_name || post.author?.username} •{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* 🪟 Profile Dialog */}
      <ProfileDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        profile={selectedProfile}
        onMessageClick={handleProfileMessage}
        loading={profileLoading}
      />
    </div>
  );
};

export default SearchBar;

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Image, Video, X } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Cookie helper
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// API client
const apiClient = {
  async request(method, url, data = null) {
    const headers = {};
    const config = { method, headers };
    const authToken = getCookie("token");
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    if (data && !(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data);
    } else if (data instanceof FormData) {
      config.body = data;
    }

    const fullUrl = `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, config);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
  get: (url) => apiClient.request("GET", url),
  post: (url, data) => apiClient.request("POST", url, data),
};

// Name initials
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function CreatePostCard({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionResults, setMentionResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  
  // ✅ New state for media dropdown
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const isUploading = mediaItems.some(item => item.progress < 100 && !item.url);
  const editorRef = useRef(null);
  const dropdownRef = useRef(null);
  const mediaDropdownRef = useRef(null);
  const isInsertingMention = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = getCookie("token");
      if (!authToken) {
        setUserLoading(false);
        return;
      }
      try {
        const profileData = await apiClient.get("/api/users-app/profile/me/");
        setUser(profileData);
        if (profileData?.avatar_url) setAvatarSrc(profileData.avatar_url);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const saveCursorPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      setCursorPosition(sel.getRangeAt(0).cloneRange());
    }
  };

  const restoreCursorPosition = () => {
    if (cursorPosition) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(cursorPosition);
    }
  };

  const getBeforeCursorText = () => {
    const sel = window.getSelection();
    if (sel.rangeCount === 0) return "";
    const range = sel.getRangeAt(0);
    const textNode = range.startContainer;
    const offset = range.startOffset;
    if (textNode.nodeType === Node.TEXT_NODE) {
      return textNode.textContent.slice(0, offset);
    }
    return "";
  };

  const handleInput = () => {
    if (isInsertingMention.current) return;
    const beforeCursor = getBeforeCursorText();
    const match = beforeCursor.match(/@([\w\s]*)$/);
    if (match) {
      setMentionQuery(match[1]);
      saveCursorPosition();
    } else {
      setShowDropdown(false);
    }
  };

  const checkAndCloseDropdown = () => {
    const beforeCursor = getBeforeCursorText();
    const match = beforeCursor.match(/@([\w\s]*)$/);
    if (!match) {
      setShowDropdown(false);
    }
  };

  const handleClick = () => {
    checkAndCloseDropdown();
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (e.key === 'Escape') {
      setShowDropdown(false);
      e.preventDefault();
    } else if (navigationKeys.includes(e.key)) {
      setTimeout(checkAndCloseDropdown, 0);
    }
  };

  useEffect(() => {
    if (mentionQuery === "") {
      setShowDropdown(false);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const results = await apiClient.get(`/api/posts-app/users/search/?search=${mentionQuery}`);
        setMentionResults(results);
        setShowDropdown(results.length > 0);
      } catch (err) {
        console.error("Mention search failed:", err);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [mentionQuery]);

  const insertMention = (username, fullName) => {
    setMentionedUsers(prevUsers => {
      if (!prevUsers.some(user => user.username === username)) {
        return [...prevUsers, { username, fullName }];
      }
      return prevUsers;
    });

    isInsertingMention.current = true;
    restoreCursorPosition();

    const sel = window.getSelection();
    if (sel.rangeCount === 0) {
      isInsertingMention.current = false;
      return;
    }

    const range = sel.getRangeAt(0);
    const textNode = range.startContainer;
    if (textNode.nodeType === Node.TEXT_NODE) {
      const text = textNode.textContent;
      const atIndex = text.slice(0, range.startOffset).lastIndexOf('@');
      if (atIndex !== -1) {
        range.setStart(textNode, atIndex);
        range.deleteContents();
      }
    }

    const span = document.createElement("span");
    span.textContent = `@${fullName}`;
    span.style.color = "#2563eb";
    span.style.fontWeight = "500";
    span.setAttribute("data-mention", "true");
    span.setAttribute("data-username", username);
    span.setAttribute("data-fullname", fullName);

    range.insertNode(span);

    const space = document.createTextNode("\u00A0");
    range.setStartAfter(span);
    range.collapse(true);
    range.insertNode(space);

    range.setStartAfter(space);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    setShowDropdown(false);
    setMentionQuery("");
    editorRef.current.focus();

    setTimeout(() => {
      isInsertingMention.current = false;
    }, 10);
  };

  const getContentForBackend = () => {
    if (!editorRef.current) return "";

    let contentString = "";
    const nodes = editorRef.current.childNodes;

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        contentString += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.getAttribute('data-mention') === 'true') {
          const username = node.getAttribute('data-username');
          contentString += `@${username}`;
        } else {
          contentString += node.textContent;
        }
      }
    });
    return contentString.replace(/\u00A0/g, ' ');
  };

  const handlePostSubmit = async () => {
    const contentForBackend = getContentForBackend();

    if (!title.trim() || !contentForBackend.trim()) {
      alert("Please provide a title and content.");
      return;
    }
    setIsSubmitting(true);

    const mentionedUsernames = mentionedUsers.map(user => user.username);

    const formattedMediaItems = mediaItems
    .filter(item => item.url)
    .map((item) => ({
      url: item.url,
      media_type: item.media_type || "image",
    }));

    const postData = {
      title,
      content: contentForBackend,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      mentions: mentionedUsernames,
      media_data: formattedMediaItems,
    };

    try {
      console.log("🚀 Final postData before submit:", postData);
      await apiClient.post("/api/posts-app/posts/", postData);

      setTitle("");
      setTags("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setMentionedUsers([]);
      setMediaItems([]);
      onPostCreated?.();
    } catch (error) {
      alert(`Error creating post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Handle file upload with specific type
  const handleFileUpload = async (acceptType) => {
    const files = await new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptType;
      input.multiple = true;
      
      input.onchange = (e) => {
        resolve(Array.from(e.target.files));
      };
      
      input.click();
    });

    if (!files.length) return;
    setShowMediaDropdown(false);

    files.forEach(async (file, index) => {
      const tempId = Date.now() + index;
      setMediaItems((prev) => [
        ...prev,
        { 
          id: tempId, 
          url: "", 
          media_type: file.type.startsWith("video") ? "video" : "image", 
          progress: 0 
        }
      ]);

      try {
        const url = await uploadToCloudinary(file, (percent) => {
          setMediaItems((prev) =>
            prev.map((m) =>
              m.id === tempId ? { ...m, progress: percent } : m
            )
          );
        });

        setMediaItems((prev) =>
          prev.map((m) =>
            m.id === tempId
              ? { ...m, url, progress: 100, display_order: prev.length }
              : m
          )
        );
      } catch (err) {
        alert("Upload failed: " + err.message);
        setMediaItems((prev) => prev.filter((m) => m.id !== tempId));
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        editorRef.current && !editorRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(e.target)) {
        setShowMediaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <div className="w-full md:w-1/3">
          <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
          {userLoading ? (
            <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarSrc} alt={user.full_name} />
                <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-neutral-900 text-sm font-medium">{user.full_name}</p>
                <p className="text-neutral-600 text-xs">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please log in to post.</p>
          )}
        </div>
        
        <div className="flex-1 space-y-3 w-full relative">
          <Input 
            type="text" 
            placeholder="Post Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="text-sm placeholder:text-gray-500 border-gray-200 whitespace-pre-wrap break-words break-all overflow-hidden" 
            disabled={!user} 
          />
          
          <div className="relative">
            <div
              ref={editorRef}
              contentEditable={!!user}
              onInput={handleInput}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] max-h-48 w-full rounded-md border border-gray-200 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:pointer-events-none empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words break-all overflow-y-auto"
              data-placeholder="What's on your mind? Use @ to mention someone"
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                document.execCommand('insertText', false, text);
              }}
            ></div>
            
            {showDropdown && mentionResults.length > 0 && (
              <div ref={dropdownRef} className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-64 max-h-48 overflow-y-auto z-50">
                {mentionResults.map((u) => (
                  <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertMention(u.username, u.full_name);
                    }}>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={u.avatar_url} />
                      <AvatarFallback className="text-xs">{getInitials(u.full_name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">@{u.username}</p>
                      <p className="text-xs text-gray-500">{u.full_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Input 
            type="text" 
            placeholder="Tags (e.g., django, react, news)" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
            className="text-sm border-gray-200" 
            disabled={!user} 
          />
          
          {mediaItems.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {mediaItems.map((m) => (
                <div key={m.id} className="relative w-24 h-24 rounded overflow-hidden border">
                  {m.media_type === "image" && m.url ? (
                    <img src={m.url} alt="" className="w-full h-full object-cover" />
                  ) : m.media_type === "video" && m.url ? (
                    <video src={m.url} className="w-full h-full object-cover" controls />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-500">
                      {m.progress}%
                    </div>
                  )}

                  <button
                    onClick={() =>
                      setMediaItems((prev) => prev.filter((item) => item.id !== m.id))
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/80 transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            {/* ✅ Enhanced Media Button with Dropdown */}
            <div className="relative" ref={mediaDropdownRef}>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 transition-colors"
                onClick={() => setShowMediaDropdown(!showMediaDropdown)}
              >
                <Paperclip size={16} />
              </Button>

              {/* ✅ Animated Dropdown Menu */}
              <div className={`
                absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden
                transition-all duration-200 ease-out z-50
                ${showMediaDropdown 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                }
              `}>
                <div className="py-1 min-w-[140px]">
                  <button
                    onClick={() => handleFileUpload('image/*')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Image size={16} className="text-blue-500" />
                    <span>Add Photos</span>
                  </button>
                  
                  <button
                    onClick={() => handleFileUpload('video/*')}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Video size={16} className="text-purple-500" />
                    <span>Add Videos</span>
                  </button>
                </div>
              </div>
            </div>

            <Button 
              onClick={handlePostSubmit} 
              disabled={isSubmitting || !title.trim() || !editorRef.current?.textContent?.trim() || !user || isUploading} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300 transition-colors"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
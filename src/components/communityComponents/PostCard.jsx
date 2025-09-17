
import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, ThumbsUp, Reply, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DOMPurify from 'dompurify';
import SearchProfile from "./SearchProfile";
import { ChevronLeft, ChevronRight, X, Expand, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import EditPostModal from "./EditPostModal";
import axios from "axios";
import ProfileDialog from "../dashboardComponent/ProfileDailog";
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const apiClient = {
  async request(method, url) {
    const headers = { 'Content-Type': 'application/json' };
    const config = { method, headers };
    const authToken = getCookie("token");
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

    const fullUrl = `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, config);
    if (!response.ok) throw new Error(await response.text());
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  },
  get: (url) => apiClient.request("GET", url),
};

function formatTimeAgo(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

// ------------------ Comment Component ------------------
function Comment({ comment, onReply, onDelete, depth = 0, authToken, currentUserAvatar, currentUser, onCommentUpdate }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReplies, setIsLoadingReplies] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionResults, setMentionResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const editorRef = useRef(null);
  const dropdownRef = useRef(null);
  const isInsertingMention = useRef(false);
  //const [replyCount, setReplyCount] = useState(0);

  // Only show likes for main comments (depth === 0)
  const [showLikes] = useState(depth === 0);

  // Fetch comment likes on mount
  useEffect(() => {
    const fetchCommentLikes = async () => {
      if (!authToken || !comment.slug) return;
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/like-count/`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        if (response.ok) {
          const data = await response.json();
          setLikeCount(data.count || 0);
          setIsLiked(data.is_like || false);
        }
      } catch (error) {
        console.error("Failed to fetch comment likes:", error);
      }
    };

    fetchCommentLikes();
  }, [comment.slug, authToken]);



  useEffect(() => {
    // When the reply box opens...
    if (isReplying && editorRef.current) {
      const username = comment.author_username;
      const fullName = comment.author_full_name;

      // 1. Add this user to our list of mentioned users for this reply.
      setMentionedUsers([{ username, fullName }]);

      // 2. Clear the editor to start fresh.
      editorRef.current.innerHTML = '';

      // 3. Create a proper mention <span>, just like in insertMention()
      const span = document.createElement("span");
      span.textContent = `@${fullName}`;
      span.style.color = "#2563eb"; // Blue color
      span.style.fontWeight = "500";
      span.setAttribute("data-mention", "true");
      span.setAttribute("data-username", username);
      span.setAttribute("data-fullname", fullName);

      // 4. Insert the new span into the editor.
      editorRef.current.appendChild(span);

      // 5. Add a space after the mention for a better typing experience.
      const space = document.createTextNode("\u00A0"); // Non-breaking space
      editorRef.current.appendChild(space);

      // 6. Focus the editor and move the cursor to the very end.
      editorRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false); // Move to the end
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (!isReplying) {
      // Optional: Clear mentioned users when the reply box is closed.
      setMentionedUsers([]);
    }
  }, [isReplying, comment.author_username, comment.author_full_name]);


  const fetchReplies = async () => {
    if (!authToken || !comment.slug) return;

    setIsLoadingReplies(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/replies/`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched replies for comment:', comment.slug, data); // Debug log
        setReplies(data);
      } else {
        throw new Error(`Failed to fetch replies: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    } finally {
      setIsLoadingReplies(false);
    }
  };

  const toggleReplies = async () => {
    if (!showReplies) {
      await fetchReplies(); // Fetch replies before showing them
    }
    setShowReplies(!showReplies);
  };

  const handleCommentLike = async () => {
    if (!authToken) {
      alert("Please log in to like comments.");
      return;
    }

    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount(prev => prev + (newLiked ? 1 : -1));

    try {
      await fetch(
        `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/like/`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );
    } catch (error) {
      // Rollback on error
      setIsLiked(!newLiked);
      setLikeCount(prev => prev - (newLiked ? 1 : -1));
      console.error("Failed to like comment:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(comment.content || "");
  };

  const handleSaveEdit = async () => {
    if (!editText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ content: editText })
        }
      );

      if (response.ok) {
        setIsEditing(false);
        onCommentUpdate?.();
      }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/posts-app/delete-comment/${comment.slug}/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${authToken}` }
        }
      );

      if (response.ok) {
        onCommentUpdate?.();
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const isOwnComment = currentUser?.id === comment.author;

  useEffect(() => {
    if (showReplies) {
      fetchReplies();
    }
  }, [showReplies, comment.slug]);

  // ✅ ADDED: All helper functions for the mention editor
  const saveCursorPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) setCursorPosition(sel.getRangeAt(0).cloneRange());
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
    return textNode.nodeType === Node.TEXT_NODE ? textNode.textContent.slice(0, offset) : "";
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


  const insertMention = (username, fullName) => {
    setMentionedUsers(prev => {
      if (!prev.some(user => user.username === username)) {
        return [...prev, { username, fullName }];
      }
      return prev;
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
      const atIndex = textNode.textContent.slice(0, range.startOffset).lastIndexOf('@');
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

    setTimeout(() => { isInsertingMention.current = false; }, 10);
  };

  const getContentForBackend = () => {
    if (!editorRef.current) return "";
    let contentString = "";
    editorRef.current.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        contentString += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('data-mention') === 'true') {
        contentString += `@${node.getAttribute('data-username')}`;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        contentString += node.textContent;
      }
    });
    return contentString.replace(/\u00A0/g, ' ');
  };

  // ✅ ADDED: useEffect for searching users to mention
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

  // 🔄 MODIFIED: Reply submission now uses the new editor
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const replyContent = getContentForBackend();
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onReply?.(comment.slug, replyContent, mentionedUsers);

      if (editorRef.current) editorRef.current.innerHTML = "";
      setMentionedUsers([]);
      setIsReplying(false);

      await fetchReplies();
      setShowReplies(true);
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const repliesSection = showReplies && (
    <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
      {isLoadingReplies ? (
        <div className="text-center py-2">
          <span className="text-sm text-gray-500">Loading replies...</span>
        </div>
      ) : replies.length > 0 ? (
        replies.map((reply) => (
          <Comment
            key={reply.slug}
            comment={reply}
            onReply={onReply}
            onDelete={onDelete}
            depth={depth + 1}  // Increment depth for nested replies
            authToken={authToken}
            currentUserAvatar={currentUserAvatar}
            currentUser={currentUser}
            onCommentUpdate={onCommentUpdate}
          />
        ))
      ) : (
        <div className="text-center py-2">
          <span className="text-sm text-gray-500">No replies yet</span>
        </div>
      )}
    </div>
  );

  return (
    <div className={`${depth === 0 ? "ml-8 pl-4 border-l-2 border-gray-100" : ""}`}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Avatar
            className="h-8 w-8 flex-shrink-0 cursor-pointer"
            onClick={() => {
              setSelectedUsername(comment.author_username);
              setOpenProfile(true);
            }}
          >
            <AvatarImage src={comment.avatar_url || 'U'} />
            <AvatarFallback className="text-xs bg-blue-500 text-white">
              {getInitials(comment.author_full_name || comment.author_username)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-3 relative group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold text-gray-900 cursor-pointer hover:underline"
                    onClick={() => {
                      setSelectedUsername(comment.author_username);
                      setOpenProfile(true);
                    }}
                  >
                    {comment.author_full_name || comment.author_username || "User"}
                  </span>
                  <span className="text-xs text-gray-500">• {formatTimeAgo(comment.created_at)}</span>
                </div>

                {isOwnComment && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-blue-600"
                    >
                      <Edit3 size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                )}
              </div>

              <SearchProfile
                open={openProfile}
                onOpenChange={setOpenProfile}
                username={selectedUsername}
              />

              {comment.author_headline && (
                <div className="text-xs text-gray-600 mb-2">{comment.author_headline}</div>
              )}



              {isEditing ? (
                <div className="flex gap-2 items-center">
                  <Input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 h-8 text-sm border-gray-300"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSaveEdit();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSaveEdit}
                    size="sm"
                    disabled={!editText.trim() || isSubmitting}
                    className="h-8 px-3 text-xs"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <RenderContentWithMentions
                  content={comment.content}
                  mentions={comment.mentions}
                  onMentionClick={(username) => {
                    setSelectedUsername(username);
                    setOpenProfile(true);
                  }}
                />
              )}

            </div>

            <div className="flex items-center gap-4 mt-2 ml-1">
              {/* Only show like button for main comments */}
              {showLikes && (
                <button
                  className={`flex items-center gap-1 text-xs font-medium transition-colors ${isLiked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                    }`}
                  onClick={handleCommentLike}
                >
                  <ThumbsUp size={12} className={isLiked ? "fill-current" : ""} />
                  <span>{likeCount > 0 ? likeCount : ""} {isLiked ? "Liked" : "Like"}</span>
                </button>
              )}

              {/* Only show reply button for main comments and first-level replies */}
              {depth <= 2 && (
                <button
                  className="text-xs text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1"
                  onClick={() => setIsReplying(prev => !prev)}
                >
                  <Reply size={12} />
                  Reply
                </button>
              )}

              {/* Only show replies button if there are replies or it's a main comment */}
              {/* {(depth === 0 || replies.length > 0) && (
                <button
                  className="text-xs text-blue-600 font-medium hover:text-blue-700"
                  onClick={toggleReplies}
                >
                  {showReplies ? "Hide Replies" : `View ${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`}
                </button>
              )} */}
              {(depth === 0 || depth <= 2) && (
                <button
                  className="text-xs text-blue-600 font-medium hover:text-blue-700"
                  onClick={toggleReplies}
                >
                  {showReplies ? "Hide Replies" : "View Replies"}
                </button>
              )}

              <span className="text-xs text-gray-500">{formatTimeAgo(comment.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Reply form - only show for main comments and first-level replies */}
        {isReplying && (
          <div className="flex gap-3 items-start ml-11 mt-2 animate-in slide-in-from-top-2 duration-200">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUserAvatar} />
              <AvatarFallback className="text-xs bg-green-500 text-white">
                {getInitials(currentUser?.full_name || currentUser?.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="relative">
                <div
                  ref={editorRef}
                  contentEditable={true}
                  onInput={handleInput}
                  className="min-h-[36px] w-full rounded-2xl bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap"
                  data-placeholder={`Reply to ${comment.author_full_name}...`}
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData('text/plain');
                    document.execCommand('insertText', false, text);
                  }}
                ></div>
                {showDropdown && (
                  <div ref={dropdownRef} className="absolute bg-white border rounded-lg shadow-lg mt-1 w-64 max-h-48 overflow-y-auto z-50">
                    {mentionResults.map((u) => (
                      <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          insertMention(u.username, u.full_name);
                        }}>
                        <Avatar className="h-6 w-6"><AvatarImage src={u.avatar_url} /><AvatarFallback className="text-xs">{getInitials(u.full_name)}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-xs text-gray-500">{u.full_name}</p>
                          <p className="text-sm font-medium">{u.username}</p>

                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Button onClick={() => setIsReplying(false)} variant="ghost" size="sm">Cancel</Button>
                <Button onClick={handleReplySubmit} size="sm" disabled={isSubmitting}>
                  {isSubmitting ? "Replying..." : "Reply"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Show replies at any depth when showReplies is true */}
        {repliesSection}
        <SearchProfile
          open={openProfile}
          onOpenChange={setOpenProfile}
          username={selectedUsername}
        />
      </div>
    </div>
  );
}



// ------------------ Content with Mentions ------------------




function RenderContentWithMentions({ content, mentions, onMentionClick }) {
  if (!content) return null;

  // If no mentions, just return plain text
  if (!mentions || mentions.length === 0) {
    return <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{content}</p>;
  }

  // Create a regex to match @username patterns
  const mentionRegex = /@(\w[\w.-]*)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  // Find all matches and split the content
  while ((match = mentionRegex.exec(content)) !== null) {
    // Add the text before the mention
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }

    // Add the mention
    const username = match[1];
    const mentionData = mentions.find(m => m.username === username);
    const fullName = mentionData?.full_name || username;
    parts.push({
      type: 'mention',
      username: username,
      fullName: fullName
    });

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after the last mention
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  return (
    <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.type === 'mention') {
          return (
            <span
              key={index}
              onClick={() => onMentionClick(part.username)}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              {part.fullName}
            </span>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </p>
  );
}






// ---------------- Media CAROUSEL ----------------






function MediaCarousel({ mediaItems = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mediaError, setMediaError] = useState({});
  const [videoStates, setVideoStates] = useState({});

  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const currentItem = mediaItems[currentIndex];
    if (isVideo(currentItem)) {
      const currentState = videoStates[currentIndex] || { playing: true, muted: true };

      videoElement.muted = currentState.muted;

      if (currentState.playing) {
        videoElement.play().catch(error => {
          console.warn("Autoplay was prevented by the browser.", error);
          setVideoStates(prev => ({ ...prev, [currentIndex]: { ...prev[currentIndex], playing: false } }));
        });
      } else {
        videoElement.pause();
      }
    }

    return () => {
      if (videoElement) {
        videoElement.pause();
      }
    };
  }, [currentIndex, mediaItems]);

  if (!mediaItems || mediaItems.length === 0) return null;

  const prevSlide = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const handleMediaError = (index) => {
    setMediaError(prev => ({ ...prev, [index]: true }));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = 'unset';
  };

  const isVideo = (item) => {
    return item.media_type === 'video' || item.url?.includes('.mp4') || item.url?.includes('.webm') || item.url?.includes('.mov');
  };

  const toggleVideoPlay = (index) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement.play();
      if (videoElement.muted) {
        videoElement.muted = false;
      }
      // When user manually plays, we assume they want sound.
      setVideoStates(prev => ({ ...prev, [index]: { playing: true, muted: false } }));
    } else {
      videoElement.pause();
      // Don't change muted state on pause
      setVideoStates(prev => ({ ...prev, [index]: { ...prev[index], playing: false } }));
    }
  };

  const toggleVideoMute = (index) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newMutedState = !videoElement.muted;
    videoElement.muted = newMutedState;
    setVideoStates(prev => ({ ...prev, [index]: { ...prev[index], muted: newMutedState } }));
  };

  const renderMediaItem = (item, index, isFullscreenView = false) => {
    const currentVideoState = videoStates[index] || { playing: true, muted: true };

    if (mediaError[index]) {
      return (
        <div className="flex flex-col items-center justify-center text-gray-400 p-8 h-full">
          <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <p className="text-sm">Media could not be loaded</p>
        </div>
      );
    }

    if (isVideo(item)) {
      return (
        <div className="relative w-full h-full group/video">
          <video src={item.url} className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-40" muted loop autoPlay playsInline aria-hidden="true" />

          <video
            ref={videoRef}
            src={item.url}
            className={`relative z-10 w-full h-full object-contain cursor-pointer transition-transform duration-300 ${!isFullscreenView ? 'group-hover:scale-105' : ''}`}
            controls={isFullscreenView}
            loop
            playsInline
            onError={() => handleMediaError(index)}
            onClick={(e) => {
              if (!isFullscreenView) openFullscreen();
              else {
                e.stopPropagation();
                toggleVideoPlay(index);
              }
            }}
            // CORRECTED onPlay and onPause HANDLERS
            onPlay={() => {
              setVideoStates(prev => ({ ...prev, [index]: { ...(prev[index] || {}), playing: true } }));
            }}
            onPause={() => {
              setVideoStates(prev => ({ ...prev, [index]: { ...(prev[index] || {}), playing: false } }));
            }}
          />

          {!isFullscreenView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideoPlay(index);
                }}
                className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                aria-label={currentVideoState.playing ? "Pause video" : "Play video"}
              >
                {currentVideoState.playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>
          )}

          {!isFullscreenView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVideoMute(index);
              }}
              className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover/video:opacity-100 transition-all duration-300 hover:bg-black/70 z-20"
              aria-label={currentVideoState.muted ? "Unmute video" : "Mute video"}
            >
              {currentVideoState.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          )}
        </div>
      );
    }

    return (
      <>
        <img src={item.url} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60" />
        <img src={item.url} alt={`Media item ${index + 1}`} className={`relative z-10 w-full h-full object-contain cursor-pointer transition-transform duration-300 ${!isFullscreenView ? 'group-hover:scale-105' : ''}`} onClick={isFullscreenView ? (e) => e.stopPropagation() : openFullscreen} onError={() => handleMediaError(index)} />
      </>
    );
  };

  return (
    <>
      <div className="relative w-full bg-gray-900 rounded-xl overflow-hidden mb-4 group">
        <div className="relative w-full" style={{ paddingBottom: '50%' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {renderMediaItem(mediaItems[currentIndex], currentIndex)}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          <button onClick={openFullscreen} className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 z-30" aria-label="View fullscreen">
            <Expand size={18} />
          </button>
        </div>
        {mediaItems.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 transform z-30" aria-label="Previous media">
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/90 backdrop-blur-sm text-gray-800 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 transform z-30" aria-label="Next media">
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </>
        )}
        {mediaItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full z-30">
            {mediaItems.map((item, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`transition-all duration-300 rounded-full relative ${currentIndex === index ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/70"}`} aria-label={`Go to ${isVideo(item) ? 'video' : 'image'} ${index + 1}`}>
                {isVideo(item) && currentIndex !== index && (<div className="absolute inset-0 flex items-center justify-center"><div className="w-1 h-1 bg-blue-400 rounded-full"></div></div>)}
              </button>
            ))}
          </div>
        )}
        {mediaItems.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full font-medium z-30 flex items-center gap-1">
            <span>{currentIndex + 1} / {mediaItems.length}</span>
            {isVideo(mediaItems[currentIndex]) && (<Play size={12} className="text-blue-400" />)}
          </div>
        )}
      </div>
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4" onClick={closeFullscreen}>
          <button onClick={closeFullscreen} className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-200 z-50" aria-label="Close fullscreen"><X size={24} /></button>
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <div className="max-w-full max-h-[90vh] relative rounded-lg overflow-hidden">
              {renderMediaItem(mediaItems[currentIndex], currentIndex, true)}
            </div>
            {mediaItems.length > 1 && (
              <>
                <button onClick={(e) => prevSlide(e)} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-200" aria-label="Previous media"><ChevronLeft size={28} /></button>
                <button onClick={(e) => nextSlide(e)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-200" aria-label="Next media"><ChevronRight size={28} /></button>
              </>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            <span>{currentIndex + 1} of {mediaItems.length}</span>
            {isVideo(mediaItems[currentIndex]) && (<Play size={14} className="text-blue-400" />)}
          </div>
        </div>
      )}
    </>
  );
}











// ------------------ PostCard Component ------------------
export default function PostCard({ post, currentUser, currentUserAvatar, onPostUpdated }) {
  const {
    author_full_name,
    author_username,
    headline,
    content,
    title,
    created_at,
    slug,
    tag_names,
    avatar_url,
    mentions,
    media_items,
    likes_count,      // New property
    comment_count,    // New property
    is_liked_by_user, // **IMPORTANT**: Your API should send this boolean field
  } = post;

  const isLikeStatusLoading = is_liked_by_user === undefined;

  const [likeCount, setLikeCount] = useState(likes_count || 0);
  const [commentCount, setCommentCount] = useState(comment_count || 0);
  const [isLiked, setIsLiked] = useState(is_liked_by_user || false);

  // const [newComment, setNewComment] = useState("");

  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const [isSharing, setIsSharing] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [mainMentionQuery, setMainMentionQuery] = useState("");
  const [mainMentionResults, setMainMentionResults] = useState([]);
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [mainMentionedUsers, setMainMentionedUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(null);
  const mainCommentEditorRef = useRef(null);
  const mainCommentDropdownRef = useRef(null);
  const isInsertingMainMention = useRef(false);

  const mainSaveCursorPosition = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      setCursorPosition(sel.getRangeAt(0).cloneRange());
    }
  };
  const mainRestoreCursorPosition = () => {
    if (cursorPosition) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(cursorPosition);
    }
  };
  const mainGetBeforeCursorText = () => {
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

  const mainHandleInput = () => {
    if (isInsertingMainMention.current) return;
    const beforeCursor = mainGetBeforeCursorText();
    const match = beforeCursor.match(/@([\w\s]*)$/);
    if (match) {
      setMainMentionQuery(match[1]);
      mainSaveCursorPosition();
    } else {
      setShowMainDropdown(false);
    }
  };
  const mainInsertMention = (username, fullName) => {
    setMainMentionedUsers(prev => {
      if (!prev.some(user => user.username === username)) {
        return [...prev, { username, fullName }];
      }
      return prev;
    });

    isInsertingMainMention.current = true;
    mainRestoreCursorPosition();
    const sel = window.getSelection();
    if (sel.rangeCount === 0) {
      isInsertingMainMention.current = false;
      return;
    }

    const range = sel.getRangeAt(0);
    const textNode = range.startContainer;
    if (textNode.nodeType === Node.TEXT_NODE) {
      const atIndex = textNode.textContent.slice(0, range.startOffset).lastIndexOf('@');
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

    setShowMainDropdown(false);
    setMainMentionQuery("");
    mainCommentEditorRef.current.focus();

    setTimeout(() => { isInsertingMainMention.current = false; }, 10);
  };

  const getMainCommentContentForBackend = () => {
    if (!mainCommentEditorRef.current) return "";
    let contentString = "";
    mainCommentEditorRef.current.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        contentString += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute('data-mention') === 'true') {
        contentString += `@${node.getAttribute('data-username')}`;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        contentString += node.textContent;
      }
    });
    return contentString.replace(/\u00A0/g, ' ');
  };


  useEffect(() => {
    if (mainMentionQuery === "") { setShowMainDropdown(false); return; }
    const delay = setTimeout(async () => {
      try {
        const results = await apiClient.get(`/api/posts-app/users/search/?search=${mainMentionQuery}`);
        setMainMentionResults(results);
        setShowMainDropdown(results.length > 0);
      } catch (err) { console.error("Main mention search failed:", err); }
    }, 300);
    return () => clearTimeout(delay);
  }, [mainMentionQuery])


  useEffect(() => {
    setIsLiked(is_liked_by_user || false);
  }, [is_liked_by_user]);

  const isOwnPost = currentUser?.username === post.author_username;

  const authToken = getCookie("token");


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!authToken || !slug) return;
  //     try {
  //       const [likesRes, commentsRes] = await Promise.all([
  //         fetch(`${API_BASE_URL}/api/posts-app/${slug}/like-count/`, {
  //           headers: { Authorization: `Bearer ${authToken}` },
  //         }),
  //         fetch(`${API_BASE_URL}/api/posts-app/count-comments/${slug}/`, {
  //           headers: { Authorization: `Bearer ${authToken}` },
  //         }),
  //         // fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
  //         //   headers: { Authorization: `Bearer ${authToken}` },
  //         // }),
  //         // fetch(`${API_BASE_URL}/api/users-app/profile/me/avatar/`, {
  //         //   headers: { Authorization: `Bearer ${authToken}` },
  //         // }),
  //       ]);

  //       if (likesRes.ok) {
  //         const d = await likesRes.json();
  //         setLikeCount(d.count);
  //         setIsLiked(d.is_like);
  //       }
  //       if (commentsRes.ok) setCommentCount((await commentsRes.json()).count);
  //       // if (profileRes.ok) setCurrentUser(await profileRes.json());
  //       // if (avatarRes.ok) {
  //       //   const blob = await avatarRes.blob();
  //       //   if (blob.size > 0) setCurrentUserAvatar(URL.createObjectURL(blob));
  //       // }
  //     } catch (error) {
  //       console.error("Failed to fetch post data:", error);
  //     }
  //   };

  //   fetchData();

  //   // return () => {
  //   //   if (currentUserAvatar) URL.revokeObjectURL(currentUserAvatar);
  //   // };
  // }, [slug, authToken]);

  const toggleLike = async () => {
    if (!authToken) return alert("Please log in to like.");
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikeCount((prev) => prev + (newLiked ? 1 : -1));

    try {
      await fetch(`${API_BASE_URL}/api/posts-app/${slug}/${newLiked ? "like-post" : "unlike-post"}/`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch {
      // rollback
      setIsLiked(!newLiked);
      setLikeCount((prev) => prev - (newLiked ? 1 : -1));
      alert("Failed to update like.");
    }
  };

  const fetchComments = async () => {
    if (!authToken || !slug) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts-app/list-comments/${slug}/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const commentsData = await res.json();
        setComments(commentsData);
        // Update comment count from actual data
        //setCommentCount(commentsData.length);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleToggleComments = () => {
    const newShow = !showComments;
    setShowComments(newShow);
    if (newShow) {
      fetchComments();
    }
  };

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!newComment.trim()) return;
  //   if (!authToken) return alert("Please log in to comment.");
  //   setIsSubmittingComment(true);

  //   try {
  //     const res = await fetch(`${API_BASE_URL}/api/posts-app/${slug}/comments/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: newComment }),
  //     });
  //     if (res.ok) {
  //       setNewComment("");
  //       setCommentCount((c) => c + 1);
  //       fetchComments();
  //     } else {
  //       alert("Failed to post comment.");
  //     }
  //   } catch {
  //     alert("Error posting comment.");
  //   } finally {
  //     setIsSubmittingComment(false);
  //   }
  // };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const commentContent = getMainCommentContentForBackend();
    if (!commentContent.trim() || isSubmittingComment) return;
    setIsSubmittingComment(true);
    const mentionedUsernames = mainMentionedUsers.map(user => user.username);
    try {
      await fetch(`${API_BASE_URL}/api/posts-app/${post.slug}/comments/`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentContent, mentions: mentionedUsernames }),
      });
      if (mainCommentEditorRef.current) mainCommentEditorRef.current.innerHTML = "";
      setMainMentionedUsers([]);
      setCommentCount(c => c + 1);
      fetchComments();
    } catch (err) {
      alert("Error posting comment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };


  // const handleReply = async (commentSlug, replyContent) => {
  //   if (!authToken) return alert("Please log in to reply.");
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ content: replyContent }),
  //     });

  //     if (response.ok) {
  //       // Update comment count and refresh comments
  //       setCommentCount(prev => prev + 1);
  //       await fetchComments();
  //     } else {
  //       throw new Error("Failed to post reply");
  //     }
  //   } catch (error) {
  //     console.error("Error posting reply:", error);
  //     alert("Failed to post reply.");
  //     throw error;
  //   }
  // };
  const handleReply = async (commentSlug, replyContent, mentionedUsers) => {
    if (!authToken) return alert("Please log in to reply.");

    // ✅ Get just the usernames from the mentionedUsers array
    const mentionedUsernames = mentionedUsers.map(user => user.username);

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        // ✅ Add the 'mentions' array to the request body
        body: JSON.stringify({
          content: replyContent,
          mentions: mentionedUsernames
        }),
      });

      if (response.ok) {
        // Update comment count and refresh comments
        setCommentCount(prev => prev + 1);
        await fetchComments();
      } else {
        throw new Error("Failed to post reply");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
      alert("Failed to post reply.");
    }
  };



  // const handleShare = async () => {
  //   setIsSharing(true);
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: title || `Post by ${author_full_name || author_username}`,
  //         text: content,
  //         url: window.location.href
  //       });
  //     } else {
  //       // Fallback: copy to clipboard
  //       await navigator.clipboard.writeText(window.location.href);
  //       alert("Link copied to clipboard!");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing:", error);
  //   } finally {
  //     setIsSharing(false);
  //   }
  // };


// PostCard.js ke andar

const handleShare = async () => {
  // ✅ Step 1: Post ke slug se naya, shareable URL banayein
  const postUrl = `${window.location.origin}/posts/${slug}`;

  setIsSharing(true);
  try {
    // Check agar browser `navigator.share` support karta hai (mobile pe aam taur par)
    if (navigator.share) {
      await navigator.share({
        title: title || `Post by ${author_full_name || author_username}`,
        text: "Check out this post!",
        url: postUrl // ✅ Naya URL yahan use karein
      });
    } else {
      // Fallback: Agar `navigator.share` nahi hai, to link ko clipboard pe copy karein
      await navigator.clipboard.writeText(postUrl); // ✅ Naya URL yahan bhi use karein
      alert("Post link copied to clipboard!");
    }
  } catch (error) {
    console.error("Error sharing:", error);
    // Agar user share cancel karta hai to error aa sakta hai, isliye alert na dikhayein
  } finally {
    setIsSharing(false);
  }
};

  const handleDelete = async () => {
    // Show a confirmation dialog before deleting
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    console.log("Attempting to delete post with slug:", post.slug);

    const authToken = getCookie("token");
    try {
      await axios.delete(`${API_BASE_URL}/api/posts-app/posts/${post.slug}/`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      alert("Post deleted successfully.");
      if (onPostUpdated) {
        onPostUpdated();
      }// Refresh the list on the parent page
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post.");
    }
  };


  const CONTENT_LIMIT = 250; // Aap is limit ko apni zaroorat ke hisaab se badal sakte hain
  const isContentLong = content.length > CONTENT_LIMIT;

  // Decide karein ki kitna content dikhana hai
  const displayedContent = isExpanded ? content : `${content.slice(0, CONTENT_LIMIT)}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 mb-4 relative">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 cursor-pointer" onClick={() => { setOpenProfile(true); setSelectedUsername(author_username); }}>
              <AvatarImage src={avatar_url} />
              <AvatarFallback className="text-sm font-semibold bg-blue-500 text-white">
                {getInitials(author_full_name || author_username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p
                  onClick={() => { setSelectedUsername(author_username); setOpenProfile(true); }}
                  className="font-semibold text-gray-900 text-sm cursor-pointer">
                  {/* {author?.full_name || author?.username || "Unknown User"} */}
                  {author_full_name || author_username || "Unknown User"}
                </p>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-sm text-gray-500">{formatTimeAgo(created_at)}</span>
              </div>
              {/* {author?.headline && <p className="text-sm text-gray-600">{author.headline}</p>} */}
              {headline && <p className="text-sm text-gray-600">{headline}</p>}
            </div>
          </div>

          {isOwnPost && (
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MoreHorizontal size={16} />
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Post
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleDelete}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete Post
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        {title && <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>}
        {/* <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{content}</p> */}

        <div className="text-gray-800 text-m whitespace-pre-wrap break-words break-all overflow-hidden">
          <RenderContentWithMentions
            content={displayedContent}
            mentions={mentions}
            onMentionClick={(username) => {
              setSelectedUsername(username);
              setOpenProfile(true);
            }}
          />
          <SearchProfile
            open={openProfile}
            onOpenChange={setOpenProfile}
            username={selectedUsername}
          />

        </div>

        {isContentLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline text-sm font-semibold mt-2"
          >
            {isExpanded ? "View Less" : "... View More"}
          </button>
        )}

        {/* This block now only renders the tags if they exist */}
        {tag_names && tag_names.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tag_names.map((tag, index) => (
              <Link key={index} to={`/tags/${tag}`}>
                <span className="text-sm font-medium text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-full transition-colors">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* This separate block renders the media carousel if it exists */}
        {media_items && media_items.length > 0 && (
          <div className="mt-4"> {/* Added a little margin for spacing */}
            <MediaCarousel mediaItems={media_items} />
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            {likeCount > 0 && (
              <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {commentCount > 0 && (
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLike}
              disabled={isLikeStatusLoading}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isLiked
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
                } ${isLikeStatusLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
            >
              <Heart className={`w-5 h-5 transition-all duration-200 ${isLiked ? "fill-red-500 scale-110" : ""}`} />
              <span className="text-sm font-medium">{isLiked ? "Liked" : "Like"}</span>
            </Button>

            {/* Comment Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleComments}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${showComments
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                }`}
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">Comment</span>
            </Button>

            {/* Share Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              disabled={isSharing}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors"
            >
              <Share2 size={18} />
              <span className="text-sm font-medium">{isSharing ? "Sharing..." : "Share"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 duration-300">
          {/* --- ADD COMMENT SECTION (Compact style like old one) --- */}
          <div className="p-4 bg-white border-b border-gray-100">
            <div className="flex gap-3 items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUserAvatar || 'U'} />
                <AvatarFallback className="text-xs bg-green-500 text-white">
                  {getInitials(currentUser?.full_name || currentUser?.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 flex gap-2 items-center">
                {/* ✅ contentEditable with same UI as Input */}
                <div
                  ref={mainCommentEditorRef}
                  contentEditable={!!currentUser}
                  onInput={mainHandleInput}
                  className="flex-1 min-h-[40px] max-h-24 overflow-y-auto rounded-full bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap"
                  data-placeholder="Add a thoughtful comment..."
                  onPaste={(e) => {
                    e.preventDefault();
                    const text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertText", false, text);
                  }}
                ></div>

                <Button
                  onClick={handleCommentSubmit}
                  disabled={isSubmittingComment}
                  size="sm"
                  className="h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {isSubmittingComment ? "Posting..." : <Send size={16} />}
                </Button>
              </div>
            </div>

            {/* ✅ Mention dropdown (positioned below input) */}
            {showMainDropdown && (
              <div
                ref={mainCommentDropdownRef}
                className="absolute bg-white border rounded-lg shadow-lg mt-1 ml-12 w-64 max-h-48 overflow-y-auto z-50"
              >
                {mainMentionResults.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      mainInsertMention(u.username, u.full_name);
                    }}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={u.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {getInitials(u.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{u.full_name}</p>
                      <p className="text-xs text-gray-500">@{u.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- COMMENTS LIST (unchanged) --- */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={handleReply}
                    authToken={authToken}
                    currentUserAvatar={currentUserAvatar}
                    currentUser={currentUser}
                    onCommentUpdate={fetchComments}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle
                    size={48}
                    className="mx-auto text-gray-300 mb-3"
                  />
                  <p className="text-sm text-gray-500">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}



      <EditPostModal
        post={post}
        open={isEditing}
        onOpenChange={setIsEditing}
        onPostUpdated={() => {
          setIsEditing(false);
          if (onPostUpdated) onPostUpdated();
        }}
      />

      {/* Custom Scrollbar and Animations */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slide-in-from-top 0.2s ease-out;
        }
      `}</style>

    </div>
  );
}





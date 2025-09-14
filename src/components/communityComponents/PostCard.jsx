
import { useState, useEffect,useRef } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, ThumbsUp, Reply, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DOMPurify from 'dompurify';
import SearchProfile from "./SearchProfile";
import { ChevronLeft, ChevronRight, X, Expand, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

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

  // useEffect(() => {
  //   const fetchReplyCount = async () => {
  //     if (!authToken || !comment.slug) return;

  //     try {
  //       const response = await fetch(
  //         `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/reply-count/`,
  //         { headers: { Authorization: `Bearer ${authToken}` } }
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         // if (data.count > 0) {
  //         //   setReplies(new Array(data.count).fill({})); // Placeholder for reply count
  //         // }
  //         setReplyCount(data.count || 0);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch reply count:", error);
  //     }
  //   };

  //   fetchReplyCount();
  // }, [comment.slug, authToken]);

  // const handleReplyClick = () => setIsReplying(!isReplying);
  const handleReplyClick = () => {
    // Jab reply box khule, author ka full name pre-fill ho jaye
    if (!isReplying) {
      setReplyText(`@${comment.author_full_name} `);
    }
    setIsReplying(!isReplying);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newReply = await onReply?.(comment.slug, replyText);
      setReplyText("");
      setIsReplying(false);

      if (newReply) {
        setReplies(prev => [...prev, newReply]);
      }

      // Show replies after successful reply
      setShowReplies(true);
      await fetchReplies();
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <div className="text-sm text-gray-800 leading-relaxed">{comment.content}</div>
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
                  onClick={handleReplyClick}
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
          <div className="flex gap-3 items-start ml-11 animate-in slide-in-from-top-2 duration-200">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUserAvatar} />
              <AvatarFallback className="text-xs bg-green-500 text-white">
                {getInitials(currentUser?.full_name || currentUser?.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply to ${comment.author_full_name || comment.author_username || "user"}...`}
                className="flex-1 h-9 rounded-full bg-gray-100 border-none text-sm"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleReplySubmit(e);
                  }
                }}
                disabled={isSubmitting}
              />
              <Button
                onClick={handleReplySubmit}
                size="sm"
                className="h-9 px-3 rounded-full"
                disabled={!replyText.trim() || isSubmitting}
              >
                <Send size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Show replies at any depth when showReplies is true */}
        {repliesSection}
      </div>
    </div>
  );
}



// ------------------ Content with Mentions ------------------


function RenderContentWithMentions({ content, mentions, onMentionClick }) {
  if (!mentions || mentions.length === 0) {
    return <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{content}</p>;
  }

  let parts = content.split(/(\s+)/); // split by spaces to preserve text spacing

  return (
    <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
      {parts.map((part, i) => {
        const mention = mentions.find(m => part === `@${m.username}`);
        if (mention) {
          return (
            <span
              key={i}
              onClick={() => onMentionClick(mention.username)}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              {mention.full_name || `@${mention.username}`}
            </span>
          );
        }
        return part;
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
      if(videoElement.muted) {
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
export default function PostCard({ post, currentUser, currentUserAvatar }) {
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

  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
 
  const [isSharing, setIsSharing] = useState(false);
  
  const [openProfile, setOpenProfile] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);

   useEffect(() => {
    setIsLiked(is_liked_by_user || false);
  }, [is_liked_by_user]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!authToken) return alert("Please log in to comment.");
    setIsSubmittingComment(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/posts-app/${slug}/comments/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
        setCommentCount((c) => c + 1);
        fetchComments();
      } else {
        alert("Failed to post comment.");
      }
    } catch {
      alert("Error posting comment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReply = async (commentSlug, replyContent) => {
    if (!authToken) return alert("Please log in to reply.");
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: replyContent }),
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
      throw error;
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || `Post by ${author_full_name || author_username}`,
          text: content,
          url: window.location.href
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };
  const CONTENT_LIMIT = 250; // Aap is limit ko apni zaroorat ke hisaab se badal sakte hain
  const isContentLong = content.length > CONTENT_LIMIT;
  
  // Decide karein ki kitna content dikhana hai
  const displayedContent = isExpanded ? content : `${content.slice(0, CONTENT_LIMIT)}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 mb-4">
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
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={16} />
          </Button>
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

        {tag_names && tag_names.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tag_names.map((tag, index) => (
              <span
                key={index}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {media_items.length > 0 && (
              <MediaCarousel mediaItems={media_items} />
            )}
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isLiked
                  ? "text-red-500 bg-red-50 hover:bg-red-100"
                  : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
              } ${
                isLikeStatusLoading ? "cursor-not-allowed opacity-50" : ""
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
          {/* Add Comment */}
          <div className="p-4 bg-white border-b border-gray-100">
            <div className="flex gap-3 items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUserAvatar || 'U'} />
                <AvatarFallback className="text-xs bg-green-500 text-white">
                  {getInitials(currentUser?.full_name || currentUser?.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Add a thoughtful comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isSubmittingComment}
                  className="flex-1 h-10 rounded-full bg-gray-100 border-none text-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit(e);
                    }
                  }}
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!newComment.trim() || isSubmittingComment}
                  size="sm"
                  className="h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {isSubmittingComment ? "Posting..." : <Send size={16} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
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
                  <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

// export default function PostCard({ post, currentUser, currentUserAvatar }) {
//   // 1. DESTRUCTURE PROPS FROM PARENT
//   // Includes counts and like status, which are now passed down from CommunityFeed.
//   const {
//     author_full_name,
//     author_username,
//     headline,
//     content,
//     title,
//     created_at,
//     slug,
//     tag_names,
//     avatar_url,
//     mentions,
//     media_items,
//     likes_count,
//     comment_count,
//     isLiked: initialIsLiked, // Aliased to avoid naming conflict
//   } = post;

//   // 2. INITIALIZE STATE DIRECTLY FROM PROPS
//   // No more fetching! The card renders instantly with the correct data.
//   const [likeCount, setLikeCount] = useState(likes_count);
//   const [commentCount, setCommentCount] = useState(comment_count);
//   const [isLiked, setIsLiked] = useState(initialIsLiked);

//   // UI-specific state remains the same
//   const [newComment, setNewComment] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [isSharing, setIsSharing] = useState(false);
//   const [openProfile, setOpenProfile] = useState(false);
//   const [selectedUsername, setSelectedUsername] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const authToken = getCookie("token");

//   // NOTE: The data-fetching useEffect has been intentionally removed to prevent N+1 API calls.

//   // 3. INTERACTION HANDLERS (Unchanged)
//   // These functions handle user actions like liking, commenting, etc., and are still needed.

//   const toggleLike = async () => {
//     if (!authToken) return alert("Please log in to like.");
//     const newLiked = !isLiked;
//     setIsLiked(newLiked);
//     setLikeCount((prev) => prev + (newLiked ? 1 : -1));

//     try {
//       await fetch(`${API_BASE_URL}/api/posts-app/${slug}/${newLiked ? "like-post" : "unlike-post"}/`, {
//         method: "PUT",
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//     } catch {
//       setIsLiked(!newLiked);
//       setLikeCount((prev) => prev - (newLiked ? 1 : -1));
//       alert("Failed to update like.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/posts-app/list-comments/${slug}/`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       if (res.ok) {
//         const commentsData = await res.json();
//         setComments(commentsData);
//         setCommentCount(commentsData.length);
//       }
//     } catch (error) {
//       console.error("Failed to fetch comments:", error);
//     }
//   };

//   const handleToggleComments = () => {
//     const newShow = !showComments;
//     setShowComments(newShow);
//     if (newShow) {
//       fetchComments();
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     if (!authToken) return alert("Please log in to comment.");
//     setIsSubmittingComment(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/posts-app/${slug}/comments/`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (res.ok) {
//         setNewComment("");
//         setCommentCount((c) => c + 1);
//         await fetchComments(); // Refresh comments list
//       } else {
//         alert("Failed to post comment.");
//       }
//     } catch {
//       alert("Error posting comment.");
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   const handleReply = async (commentSlug, replyContent) => {
//     // This function logic would be inside the Comment component, but if handled here:
//     if (!authToken) return alert("Please log in to reply.");
//     try {
//       await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ content: replyContent }),
//         }
//       );
//       setCommentCount(prev => prev + 1);
//       await fetchComments(); // Refresh to show the new reply
//     } catch (error) {
//       console.error("Error posting reply:", error);
//       alert("Failed to post reply.");
//     }
//   };

//   const handleShare = async () => {
//     setIsSharing(true);
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: title || `Post by ${author_full_name || author_username}`,
//           text: content,
//           url: window.location.origin + `/post/${slug}`, // A direct link to the post
//         });
//       } else {
//         await navigator.clipboard.writeText(window.location.origin + `/post/${slug}`);
//         alert("Link copied to clipboard!");
//       }
//     } catch (error) {
//       console.error("Error sharing:", error);
//     } finally {
//       setIsSharing(false);
//     }
//   };

//   const CONTENT_LIMIT = 250;
//   const isContentLong = content.length > CONTENT_LIMIT;
//   const displayedContent = isExpanded ? content : `${content.slice(0, CONTENT_LIMIT)}`;

//   // 4. JSX RENDER (Unchanged)
//   // This JSX uses the state variables which are now correctly initialized.
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 mb-4">
//       {/* Post Header */}
//       <div className="p-4 pb-3">
//         <div className="flex justify-between items-start">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-12 w-12 cursor-pointer" onClick={() => { setOpenProfile(true); setSelectedUsername(author_username); }}>
//               <AvatarImage src={avatar_url} />
//               <AvatarFallback className="text-sm font-semibold bg-blue-500 text-white">
//                 {getInitials(author_full_name || author_username)}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <div className="flex items-center gap-2">
//                 <p onClick={() => { setSelectedUsername(author_username); setOpenProfile(true); }} className="font-semibold text-gray-900 text-sm cursor-pointer">
//                   {author_full_name || author_username || "Unknown User"}
//                 </p>
//                 <span className="text-gray-400 text-sm">•</span>
//                 <span className="text-sm text-gray-500">{formatTimeAgo(created_at)}</span>
//               </div>
//               {headline && <p className="text-sm text-gray-600">{headline}</p>}
//             </div>
//           </div>
//           <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
//             <MoreHorizontal size={16} />
//           </Button>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="px-4 pb-3">
//         {title && <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>}
//         <div className="text-gray-800 text-m whitespace-pre-wrap break-words break-all overflow-hidden">
//           <RenderContentWithMentions
//             content={displayedContent}
//             mentions={mentions}
//             onMentionClick={(username) => {
//               setSelectedUsername(username);
//               setOpenProfile(true);
//             }}
//           />
//           <SearchProfile open={openProfile} onOpenChange={setOpenProfile} username={selectedUsername} />
//         </div>
//         {isContentLong && (
//           <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline text-sm font-semibold mt-2">
//             {isExpanded ? "View Less" : "... View More"}
//           </button>
//         )}
//         {tag_names && tag_names.length > 0 && (
//           <div className="mt-3 flex flex-wrap gap-2">
//             {tag_names.map((tag, index) => (
//               <span key={index} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors">
//                 #{tag}
//               </span>
//             ))}
//           </div>
//         )}
//         {media_items && media_items.length > 0 && (
//           <div className="mt-4">
//              <MediaCarousel mediaItems={media_items} />
//           </div>
//         )}
//       </div>

//       {/* Engagement Stats */}
//       <div className="px-4 pb-2">
//         <div className="flex items-center justify-between text-sm text-gray-500">
//           <div className="flex items-center gap-3">
//             {likeCount > 0 && (
//               <div className="flex items-center gap-1 hover:text-red-500 cursor-pointer transition-colors">
//                 <Heart size={14} className="text-red-500 fill-red-500" />
//                 <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
//               </div>
//             )}
//           </div>
//           <div className="flex items-center gap-4">
//             {commentCount > 0 && (
//               <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={handleToggleComments}>
//                 {commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="border-t border-gray-100 px-4 py-2">
//         <div className="flex justify-around items-center">
//             <Button variant="ghost" size="sm" onClick={toggleLike} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 w-full ${isLiked ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-600 hover:bg-gray-100 hover:text-red-500"}`}>
//               <Heart className={`w-5 h-5 transition-all duration-200 ${isLiked ? "fill-red-500 scale-110" : ""}`} />
//               <span className="text-sm font-medium">{isLiked ? "Liked" : "Like"}</span>
//             </Button>
//             <Button variant="ghost" size="sm" onClick={handleToggleComments} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors w-full ${showComments ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`}>
//               <MessageCircle size={18} />
//               <span className="text-sm font-medium">Comment</span>
//             </Button>
//             <Button variant="ghost" size="sm" onClick={handleShare} disabled={isSharing} className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors w-full">
//               <Share2 size={18} />
//               <span className="text-sm font-medium">{isSharing ? "Sharing..." : "Share"}</span>
//             </Button>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {showComments && (
//         <div className="border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 duration-300">
//           <div className="p-4 bg-white border-b border-gray-100">
//             <div className="flex gap-3 items-start">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage src={currentUserAvatar || 'U'} />
//                 <AvatarFallback className="text-xs bg-green-500 text-white">
//                   {getInitials(currentUser?.full_name || currentUser?.username)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 flex gap-2">
//                 <Input
//                   placeholder="Add a thoughtful comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   disabled={isSubmittingComment}
//                   className="flex-1 h-10 rounded-full bg-gray-100 border-none text-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
//                   onKeyPress={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleCommentSubmit(e); }}}
//                 />
//                 <Button onClick={handleCommentSubmit} disabled={!newComment.trim() || isSubmittingComment} size="sm" className="h-10 px-4 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
//                   {isSubmittingComment ? "..." : <Send size={16} />}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <div className="max-h-96 overflow-y-auto custom-scrollbar">
//             <div className="p-4 space-y-4">
//               {comments.length > 0 ? (
//                 comments.map((comment) => (
//                   <Comment key={comment.id} comment={comment} onReply={handleReply} authToken={authToken} currentUserAvatar={currentUserAvatar} currentUser={currentUser} onCommentUpdate={fetchComments}/>
//                 ))
//               ) : (
//                 <div className="text-center py-8">
//                   <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
//                   <p className="text-sm text-gray-500">No comments yet. Be the first!</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom Styles */}
//       <style jsx>{`
//         .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 #f1f5f9; }
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
//         @keyframes slide-in-from-top {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-in { animation: slide-in-from-top 0.3s ease-out; }
//       `}</style>
//     </div>
//   );
// }



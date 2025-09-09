



// import { useState, useEffect } from "react";
// import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// function formatTimeAgo(dateString) {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   const seconds = Math.floor((new Date() - date) / 1000);
//   let interval = seconds / 31536000;
//   if (interval > 1) return Math.floor(interval) + " years ago";
//   interval = seconds / 2592000;
//   if (interval > 1) return Math.floor(interval) + " months ago";
//   interval = seconds / 86400;
//   if (interval > 1) return Math.floor(interval) + " days ago";
//   interval = seconds / 3600;
//   if (interval > 1) return Math.floor(interval) + " hours ago";
//   interval = seconds / 60;
//   if (interval > 1) return Math.floor(interval) + " minutes ago";
//   return Math.floor(seconds) + " seconds ago";
// }

// const getInitials = (name = "") => {
//     return name
//         .split(' ')
//         .map(n => n[0])
//         .slice(0, 2)
//         .join('')
//         .toUpperCase() || 'U';
// };

// function Comment({ comment, onReply, depth = 0, authToken, currentUserAvatar }) {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replies, setReplies] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [isReplying, setIsReplying] = useState(false);

//   const handleReplyClick = () => setIsReplying(!isReplying);

//   const handleReplySubmit = (e) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;
//     onReply?.(comment.slug, replyText);
//     setReplyText("");
//     setIsReplying(false);
//   };

//   const fetchReplies = async () => {
//     if (!authToken || !comment.slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${comment.slug}/replies/`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       if (response.ok) setReplies(await response.json());
//     } catch (error) {
//       console.error("Failed to fetch replies:", error);
//     }
//   };

//   const toggleReplies = () => {
//     const newShowState = !showReplies;
//     setShowReplies(newShowState);
//     if (newShowState && replies.length === 0) fetchReplies();
//   };

//   return (
//     <div className={`${depth > 0 ? 'ml-8 pl-4 border-l' : ''}`}>
//       <div className="flex flex-col gap-4">
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <div className="flex justify-between items-start mb-2">
//             <div className="flex gap-3">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage src={comment.author?.avatar_url} />
//                 <AvatarFallback>{getInitials(comment.author?.full_name || comment.author?.username)}</AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-semibold text-gray-900">{comment.author?.full_name || comment.author?.username || 'User'}</span>
//                   <span className="text-xs text-gray-500">• {formatTimeAgo(comment.created_at)}</span>
//                 </div>
//                 {comment.author?.headline && <div className="text-xs text-gray-600">{comment.author.headline}</div>}
//               </div>
//             </div>
//             <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} className="text-gray-600" /></Button>
//           </div>
//           <div className="text-sm text-gray-800 font-medium leading-tight mb-3 pl-12">{comment.content}</div>
//           <div className="flex items-center gap-4 pl-12">
//             <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900">Like</Button>
//             <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900" onClick={handleReplyClick}>Reply</Button>
//             <Button variant="link" size="sm" className="text-blue-600 text-xs p-0 h-auto" onClick={toggleReplies}>{showReplies ? 'Hide Replies' : 'View Replies'}</Button>
//           </div>
//         </div>
//         {isReplying && (
//           <div className="flex gap-3 items-start mt-2">
//             <Avatar className="h-9 w-9">
//               <AvatarImage src={currentUserAvatar} />
//               <AvatarFallback>ME</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleReplySubmit} className="flex-1">
//               <Input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="h-9 rounded-full bg-gray-100" />
//             </form>
//           </div>
//         )}
//         {showReplies && replies.length > 0 && (
//           <div className="space-y-4 mt-4">
//             {replies.map(reply => <Comment key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} authToken={authToken} currentUserAvatar={currentUserAvatar} />)}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function PostCard({ post }) {
//   const { author, content, title, created_at, slug, tag_names } = post;
//   const [likeCount, setLikeCount] = useState(0);
//   const [commentCount, setCommentCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
  
//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentUserAvatar, setCurrentUserAvatar] = useState('');
//   const authToken = getCookie('token');

//   useEffect(() => {
//     const fetchCurrentUserData = async () => {
//         if (!authToken) return;
//         try {
//             const [profileRes, avatarRes] = await Promise.all([
//                 fetch(`${API_BASE_URL}/api/users-app/profile/me/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//                 fetch(`${API_BASE_URL}/api/users-app/profile/me/avatar/`, { headers: { Authorization: `Bearer ${authToken}` } })
//             ]);
//             if (profileRes.ok) setCurrentUser(await profileRes.json());
//             if (avatarRes.ok) {
//                 const blob = await avatarRes.blob();
//                 if (blob.size > 0) setCurrentUserAvatar(URL.createObjectURL(blob));
//             }
//         } catch (error) {
//             console.error("Failed to fetch current user data:", error);
//         }
//     };
    
//     const fetchInitialData = async () => {
//       if (!authToken || !slug) return;
//       try {
//         const [likesRes, commentsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/posts-app/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//           fetch(`${API_BASE_URL}/api/posts-app/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//         ]);
//         if (likesRes.ok) {
//           const d = await likesRes.json();
//           setLikeCount(d.count);
//           setIsLiked(d.is_like);
//         }
//         if (commentsRes.ok) setCommentCount((await commentsRes.json()).count);
//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       }
//     };

//     fetchInitialData();
//     fetchCurrentUserData();

//     return () => {
//         if (currentUserAvatar) URL.revokeObjectURL(currentUserAvatar);
//     }
//   }, [slug, authToken]);

//   const handleLike = async () => {
//     if (!authToken) return alert("Please log in to like posts.");
//     setIsLiked(!isLiked);
//     setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
//     try {
//       await fetch(`${API_BASE_URL}/api/posts-app/${slug}/${isLiked ? 'unlike-post' : 'like-post'}/`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${authToken}` },
//       });
//     } catch {
//       setIsLiked(!isLiked);
//       setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
//       alert("Like action failed.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
//       if (response.ok) setComments(await response.json());
//     } catch (error) {
//       console.error("Failed to fetch comments:", error);
//     }
//   };

//   const handleToggleComments = () => {
//     const newShowState = !showComments;
//     setShowComments(newShowState);
//     if (newShowState && comments.length === 0) fetchComments();
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     setIsSubmittingComment(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/${slug}/comments/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (response.ok) {
//         setNewComment("");
//         setCommentCount(prev => prev + 1);
//         fetchComments();
//       } else alert("Failed to post comment.");
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   const handleReply = async (commentSlug, replyContent) => {
//     if (!authToken) return alert("Please log in to reply.");
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: replyContent }),
//       });
//       if (response.ok) fetchComments();
//       else alert("Failed to post reply.");
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-white space-y-4">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <Avatar className="h-12 w-12">
//             <AvatarImage src={author?.avatar_url} />
//             <AvatarFallback>{getInitials(author?.full_name || author?.username)}</AvatarFallback>
//           </Avatar>
//           <div className="ml-3">
//             <div className="flex items-center gap-2">
//               <p className="font-semibold text-gray-900">{author?.full_name || author?.username || "Unknown User"}</p>
//               <span className="text-sm text-gray-500">• {formatTimeAgo(created_at)}</span>
//             </div>
//             {author?.headline && <p className="text-sm text-gray-500">{author.headline}</p>}
//           </div>
//         </div>
//         <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} className="text-gray-600" /></Button>
//       </div>
      
//       <div>
//         {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
//         <p className="text-gray-800 leading-snug">{content}</p>
//         <div className="mt-3">
//           {tag_names?.map((tag, index) => <span key={index} className="text-sm font-medium text-blue-600 mr-3 cursor-pointer hover:underline">#{tag}</span>)}
//         </div>
//       </div>

//       <div className="flex justify-between items-center border-t pt-2">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-2 p-1 text-gray-600 font-semibold ${isLiked ? 'text-red-500' : ''}`}>
//             <Heart size={20} className={isLiked ? "fill-current" : ""} /><span>Like</span>
//           </Button>
//           <Button variant="ghost" size="sm" onClick={handleToggleComments} className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
//             <MessageCircle size={20} /><span>Comment</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
//             <Share2 size={20} /><span>Share</span>
//           </Button>
//         </div>
//         <div className="text-sm text-gray-500">
//           <span>{likeCount} Likes</span>
//           <span className="ml-4">{commentCount} Comments</span>
//         </div>
//       </div>

//       {showComments && (
//         <div className="border-t pt-4 space-y-4">
//           <div className="flex gap-3 items-start">
//             <Avatar className="h-9 w-9">
//               <AvatarImage src={currentUserAvatar} />
//               <AvatarFallback>{getInitials(currentUser?.full_name || currentUser?.username)}</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleCommentSubmit} className="flex-1">
//               <Input placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} className="h-9 rounded-full bg-gray-100" />
//             </form>
//           </div>
//           <div className="space-y-4">
//             {comments.length > 0 ? (
//               comments.map(comment => <Comment key={comment.id} comment={comment} onReply={handleReply} authToken={authToken} currentUserAvatar={currentUserAvatar} />)
//             ) : <p className="text-sm text-center text-gray-500">No comments yet.</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
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

const getInitials = (name = "") => {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';
};

// Reaction popup component
function ReactionPopup({ isVisible, onReactionSelect, onClose }) {
  const reactions = [
    { type: 'like', icon: '👍', label: 'Like', color: 'text-blue-600' },
    { type: 'love', icon: '❤️', label: 'Love', color: 'text-red-500' },
    { type: 'laugh', icon: '😂', label: 'Haha', color: 'text-yellow-500' },
    { type: 'wow', icon: '😮', label: 'Wow', color: 'text-orange-500' },
    { type: 'sad', icon: '😢', label: 'Sad', color: 'text-blue-400' },
    { type: 'angry', icon: '😡', label: 'Angry', color: 'text-red-600' },
  ];

  if (!isVisible) return null;

  return (
    <div 
      className="absolute bottom-12 left-0 bg-white border rounded-full shadow-xl flex items-center gap-1 p-2 z-50 animate-in slide-in-from-bottom-2 duration-200"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction.type}
          onClick={() => onReactionSelect(reaction)}
          className="hover:scale-125 transition-transform duration-200 p-2 rounded-full hover:bg-gray-100"
          title={reaction.label}
        >
          <span className="text-2xl">{reaction.icon}</span>
        </button>
      ))}
    </div>
  );
}

function Comment({ comment, onReply, depth = 0, authToken, currentUserAvatar }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleReplyClick = () => setIsReplying(!isReplying);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply?.(comment.slug, replyText);
    setReplyText("");
    setIsReplying(false);
  };

  const fetchReplies = async () => {
    if (!authToken || !comment.slug) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${comment.slug}/replies/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) setReplies(await response.json());
    } catch (error) {
      console.error("Failed to fetch replies:", error);
    }
  };

  const toggleReplies = () => {
    const newShowState = !showReplies;
    setShowReplies(newShowState);
    if (newShowState && replies.length === 0) fetchReplies();
  };

  const handleCommentLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 pl-4 border-l-2 border-gray-100' : ''}`}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.author?.avatar_url} />
            <AvatarFallback className="text-xs bg-blue-500 text-white">{getInitials(comment.author?.full_name || comment.author?.username)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{comment.author?.full_name || comment.author?.username || 'User'}</span>
                <span className="text-xs text-gray-500">• {formatTimeAgo(comment.created_at)}</span>
              </div>
              {comment.author?.headline && <div className="text-xs text-gray-600 mb-2">{comment.author.headline}</div>}
              <div className="text-sm text-gray-800 leading-relaxed">{comment.content}</div>
            </div>
            <div className="flex items-center gap-4 mt-2 ml-1">
              <button 
                className={`text-xs font-medium transition-colors ${
                  isLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={handleCommentLike}
              >
                {isLiked ? '👍 Liked' : 'Like'}
              </button>
              <button className="text-xs text-gray-600 hover:text-blue-600 font-medium" onClick={handleReplyClick}>
                Reply
              </button>
              {replies.length > 0 && (
                <button className="text-xs text-blue-600 font-medium" onClick={toggleReplies}>
                  {showReplies ? 'Hide Replies' : `View Replies (${replies.length})`}
                </button>
              )}
              <span className="text-xs text-gray-500">{formatTimeAgo(comment.created_at)}</span>
            </div>
          </div>
        </div>
        
        {isReplying && (
          <div className="flex gap-3 items-start ml-11">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUserAvatar} />
              <AvatarFallback className="text-xs bg-green-500 text-white">ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input 
                value={replyText} 
                onChange={(e) => setReplyText(e.target.value)} 
                placeholder="Write a reply..." 
                className="flex-1 h-9 rounded-full bg-gray-100 border-none text-sm" 
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleReplySubmit(e);
                  }
                }}
              />
              <Button 
                onClick={handleReplySubmit} 
                size="sm" 
                className="h-9 px-3 rounded-full"
                disabled={!replyText.trim()}
              >
                <Send size={14} />
              </Button>
            </div>
          </div>
        )}
        
        {showReplies && replies.length > 0 && (
          <div className="space-y-3 ml-11 max-h-64 overflow-y-auto">
            {replies.map(reply => (
              <Comment 
                key={reply.id} 
                comment={reply} 
                onReply={onReply} 
                depth={depth + 1} 
                authToken={authToken} 
                currentUserAvatar={currentUserAvatar} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PostCard({ post }) {
  const { author, content, title, created_at, slug, tag_names } = post;
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [currentReaction, setCurrentReaction] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showReactionPopup, setShowReactionPopup] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState('');
  const authToken = getCookie('token');

  useEffect(() => {
    const fetchCurrentUserData = async () => {
      if (!authToken) return;
      try {
        const [profileRes, avatarRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/users-app/profile/me/`, { headers: { Authorization: `Bearer ${authToken}` } }),
          fetch(`${API_BASE_URL}/api/users-app/profile/me/avatar/`, { headers: { Authorization: `Bearer ${authToken}` } })
        ]);
        if (profileRes.ok) setCurrentUser(await profileRes.json());
        if (avatarRes.ok) {
          const blob = await avatarRes.blob();
          if (blob.size > 0) setCurrentUserAvatar(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Failed to fetch current user data:", error);
      }
    };
    
    const fetchInitialData = async () => {
      if (!authToken || !slug) return;
      try {
        const [likesRes, commentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/posts-app/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
          fetch(`${API_BASE_URL}/api/posts-app/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
        ]);
        if (likesRes.ok) {
          const d = await likesRes.json();
          setLikeCount(d.count);
          if (d.is_like) {
            setCurrentReaction({ type: 'like', icon: '👍', label: 'Like', color: 'text-blue-600' });
          }
        }
        if (commentsRes.ok) setCommentCount((await commentsRes.json()).count);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();
    fetchCurrentUserData();

    return () => {
      if (currentUserAvatar) URL.revokeObjectURL(currentUserAvatar);
    }
  }, [slug, authToken]);

  const handleReaction = async (reaction) => {
    if (!authToken) return alert("Please log in to react to posts.");
    
    const wasLiked = currentReaction !== null;
    const isSameReaction = currentReaction?.type === reaction.type;
    
    if (isSameReaction) {
      // Remove reaction
      setCurrentReaction(null);
      setLikeCount(prev => prev - 1);
    } else {
      // Add or change reaction
      setCurrentReaction(reaction);
      if (!wasLiked) {
        setLikeCount(prev => prev + 1);
      }
    }
    
    setShowReactionPopup(false);
    
    try {
      const endpoint = isSameReaction ? 'unlike-post' : 'like-post';
      await fetch(`${API_BASE_URL}/api/posts-app/${slug}/${endpoint}/`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
    } catch  {
      // Revert on error
      if (isSameReaction) {
        setCurrentReaction(reaction);
        setLikeCount(prev => prev + 1);
      } else {
        setCurrentReaction(wasLiked ? { type: 'like', icon: '👍', label: 'Like', color: 'text-blue-600' } : null);
        if (!wasLiked) {
          setLikeCount(prev => prev - 1);
        }
      }
      alert("Reaction failed. Please try again.");
    }
  };

  const handleLikeHover = () => {
    setShowReactionPopup(true);
  };

  const handleLikeClick = () => {
    if (!currentReaction) {
      handleReaction({ type: 'like', icon: '👍', label: 'Like', color: 'text-blue-600' });
    } else {
      handleReaction(currentReaction);
    }
  };

  const fetchComments = async () => {
    if (!authToken || !slug) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/list-comments/${slug}/`, { 
        headers: { Authorization: `Bearer ${authToken}` } 
      });
      if (response.ok) setComments(await response.json());
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleToggleComments = () => {
    const newShowState = !showComments;
    setShowComments(newShowState);
    if (newShowState && comments.length === 0) fetchComments();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!authToken) return alert("Please log in to comment.");
    
    setIsSubmittingComment(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/${slug}/comments/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        setCommentCount(prev => prev + 1);
        fetchComments();
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to post comment.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReply = async (commentSlug, replyContent) => {
    if (!authToken) return alert("Please log in to reply.");
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/comments/${commentSlug}/replies/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent }),
      });
      if (response.ok) {
        fetchComments();
      } else {
        alert("Failed to post reply.");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to post reply.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={author?.avatar_url} />
              <AvatarFallback className="text-sm font-semibold bg-blue-500 text-white">
                {getInitials(author?.full_name || author?.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900 text-sm">
                  {author?.full_name || author?.username || "Unknown User"}
                </p>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-sm text-gray-500">{formatTimeAgo(created_at)}</span>
              </div>
              {author?.headline && <p className="text-sm text-gray-600">{author.headline}</p>}
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
        <p className="text-gray-800 leading-relaxed text-sm">{content}</p>
        {tag_names && tag_names.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tag_names.map((tag, index) => (
              <span key={index} className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {likeCount > 0 && (
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  <span className="text-lg">👍</span>
                  {likeCount > 1 && <span className="text-lg">❤️</span>}
                  {likeCount > 2 && <span className="text-lg">😂</span>}
                </div>
                <span>{likeCount}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {commentCount > 0 && <span>{commentCount} Comments</span>}
            <span>Share</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-100 px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                onMouseEnter={handleLikeHover}
                onMouseLeave={() => setTimeout(() => setShowReactionPopup(false), 100)}
                onClick={handleLikeClick}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentReaction ? currentReaction.color : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {currentReaction ? (
                  <>
                    <span className="text-lg">{currentReaction.icon}</span>
                    <span className="text-sm font-medium">{currentReaction.label}</span>
                  </>
                ) : (
                  <>
                    <Heart size={18} />
                    <span className="text-sm font-medium">Like</span>
                  </>
                )}
              </Button>
              <ReactionPopup 
                isVisible={showReactionPopup}
                onReactionSelect={handleReaction}
                onClose={() => setShowReactionPopup(false)}
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleComments}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle size={18} />
              <span className="text-sm font-medium">Comment</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Share2 size={18} />
              <span className="text-sm font-medium">Share</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50">
          {/* Add Comment */}
          <div className="p-4 bg-white border-b border-gray-100">
            <div className="flex gap-3 items-start">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUserAvatar} />
                <AvatarFallback className="text-xs bg-green-500 text-white">
                  {getInitials(currentUser?.full_name || currentUser?.username)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input 
                  placeholder="Add a comment..." 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  disabled={isSubmittingComment} 
                  className="flex-1 h-10 rounded-full bg-gray-100 border-none text-sm placeholder:text-gray-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCommentSubmit(e);
                    }
                  }}
                />
                <Button 
                  onClick={handleCommentSubmit} 
                  disabled={!newComment.trim() || isSubmittingComment} 
                  size="sm" 
                  className="h-10 px-4 rounded-full"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Comments List with Scrollbar */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-4">
              {comments.length > 0 ? (
                comments.map(comment => (
                  <Comment 
                    key={comment.id} 
                    comment={comment} 
                    onReply={handleReply} 
                    authToken={authToken} 
                    currentUserAvatar={currentUserAvatar} 
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
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
      `}</style>
    </div>
  );
}
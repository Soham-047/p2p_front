

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
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, ThumbsUp, Reply, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
    const fetchReplyCount = async () => {
      if (!authToken || !comment.slug) return;
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/posts-app/comments/${comment.slug}/reply-count/`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.count > 0) {
            setReplies(new Array(data.count).fill({})); // Placeholder for reply count
          }
        }
      } catch (error) {
        console.error("Failed to fetch reply count:", error);
      }
    };

    fetchReplyCount();
  }, [comment.slug, authToken]);

  const handleReplyClick = () => setIsReplying(!isReplying);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onReply?.(comment.slug, replyText);
      setReplyText("");
      setIsReplying(false);
      
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

  const isOwnComment = currentUser?.id === comment.author?.id;

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
            key={reply.id}
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
    <div className={`${depth > 0 ? "ml-8 pl-4 border-l-2 border-gray-100" : ""}`}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.author?.avatar_url} />
            <AvatarFallback className="text-xs bg-blue-500 text-white">
              {getInitials(comment.author?.full_name || comment.author?.username)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="bg-gray-50 rounded-2xl px-4 py-3 relative group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {comment.author?.full_name || comment.author?.username || "User"}
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
              
              {comment.author?.headline && (
                <div className="text-xs text-gray-600 mb-2">{comment.author.headline}</div>
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
                  className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                    isLiked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
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
              {(depth === 0 || replies.length > 0) && (
                <button
                  className="text-xs text-blue-600 font-medium hover:text-blue-700"
                  onClick={toggleReplies}
                >
                  {showReplies ? "Hide Replies" : `View ${replies.length} ${replies.length === 1 ? 'Reply' : 'Replies'}`}
                </button>
              )}
              
              <span className="text-xs text-gray-500">{formatTimeAgo(comment.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Reply form - only show for main comments and first-level replies */}
        {isReplying&& (
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
                placeholder={`Reply to ${comment.author?.full_name || comment.author?.username || "user"}...`}
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

// ------------------ PostCard Component ------------------
export default function PostCard({ post }) {
  const { author, content, title, created_at, slug, tag_names } = post;
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const authToken = getCookie("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!authToken || !slug) return;
      try {
        const [likesRes, commentsRes, profileRes, avatarRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/posts-app/${slug}/like-count/`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(`${API_BASE_URL}/api/posts-app/count-comments/${slug}/`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          fetch(`${API_BASE_URL}/api/users-app/profile/me/avatar/`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        if (likesRes.ok) {
          const d = await likesRes.json();
          setLikeCount(d.count);
          setIsLiked(d.is_like);
        }
        if (commentsRes.ok) setCommentCount((await commentsRes.json()).count);
        if (profileRes.ok) setCurrentUser(await profileRes.json());
        if (avatarRes.ok) {
          const blob = await avatarRes.blob();
          if (blob.size > 0) setCurrentUserAvatar(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };

    fetchData();

    return () => {
      if (currentUserAvatar) URL.revokeObjectURL(currentUserAvatar);
    };
  }, [slug, authToken]);

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
        setCommentCount(commentsData.length);
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
    } catch  {
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
          title: title || `Post by ${author?.full_name || author?.username}`,
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
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
        <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{content}</p>
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                isLiked 
                  ? "text-red-500 bg-red-50 hover:bg-red-100" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-red-500"
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
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                showComments 
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
                <AvatarImage src={currentUserAvatar} />
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








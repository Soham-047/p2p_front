// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { MoreHorizontal } from "lucide-react";

// export default function PostCard({ post }) {
//   return (
//     <Card className="border border-gray-200 hover:shadow-md transition-shadow">
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Avatar>
//               <AvatarImage src={post.avatar} />
//               <AvatarFallback>{post.name[0]}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{post.name}</p>
//               <p className="text-sm text-gray-500">
//                 {post.role} • {post.time}
//               </p>
//             </div>
//           </div>
//           <MoreHorizontal className="text-gray-500" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <p className="mb-3">{post.content}</p>
//         <Separator className="mb-3" />
//         <div className="flex items-center gap-6 text-sm text-gray-500">
//           <span>👍 Like</span>
//           <span>💬 {post.comments} Comments</span>
//           <span>↗ Share</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




// import { useState, useEffect, useRef } from "react";
// import { Heart, MessageCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Share2 } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to read a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// // Helper function to format date
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

// export default function PostCard({ post }) {
//   // Destructure for easier access
//   const { author, content, title, created_at, slug } = post;

//   const [likeCount, setLikeCount] = useState(0);
//   const [commentCount, setCommentCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
  
//   const commentInputRef = useRef(null);
//   const authToken = getCookie('token'); // Read auth token from cookie

//   useEffect(() => {
//     const fetchCounts = async () => {
//       if (!authToken || !slug) return;
//       try {
//         const [likesRes, commentsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//           fetch(`${API_BASE_URL}/api/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//         ]);
//         const likesData = await likesRes.json();
//         const commentsData = await commentsRes.json();
//         if (likesRes.ok) setLikeCount(likesData.count);
//         if (commentsRes.ok) setCommentCount(commentsData.count);
//       } catch (error) {
//         console.error("Failed to fetch counts:", error);
//       }
//     };
//     fetchCounts();
//   }, [slug, authToken]);

//   const handleLike = async () => {
//     if (!authToken) return alert("Please log in to like posts.");
//     const originalLikeState = isLiked;
//     const originalLikeCount = likeCount;
//     setIsLiked(!originalLikeState);
//     setLikeCount(originalLikeState ? originalLikeCount - 1 : originalLikeCount + 1);
//     const endpoint = originalLikeState ? 'unlike-post' : 'like-post';
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/${endpoint}/`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error("Failed to update like status");
//     } catch (error) {
//       setIsLiked(originalLikeState);
//       setLikeCount(originalLikeCount);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
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
//     if (!newComment.trim() || !authToken) return;
//     setIsSubmittingComment(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/comments/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (response.ok) {
//         setNewComment("");
//         setCommentCount(prev => prev + 1);
//         if (showComments) fetchComments();
//       } else {
//         alert("Failed to post comment.");
//       }
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-white space-y-3">
//       <div className="flex items-center">
//         <Avatar className="h-11 w-11">
//             <AvatarImage src={author?.avatar_url} />
//             <AvatarFallback>{author?.username ? author.username[0].toUpperCase() : 'U'}</AvatarFallback>
//         </Avatar>
//         <div className="ml-3">
//           <p className="font-bold">{author || "Unknown User"}</p>
//           <p className="text-sm text-gray-500">{author?.role || "Member"} • {formatTimeAgo(created_at)}</p>
//         </div>
//       </div>
      
//       <div>
//         <h3 className="font-semibold text-lg mb-1">{title}</h3>
//         <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
//       </div>

//       <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-2">
//         <span>{likeCount} Likes</span>
//         <button onClick={handleToggleComments} className="hover:underline">{commentCount} Comments</button>
//       </div>

//       <div className="flex justify-around items-center pt-1">
//         <Button variant="ghost" onClick={handleLike} className="flex items-center gap-2 w-full">
//           <Heart size={20} className={isLiked ? "text-red-500 fill-current" : ""} />
//           <span>{isLiked ? "Liked" : "Like"}</span>
//         </Button>
//         <Button variant="ghost" onClick={() => commentInputRef.current?.focus()} className="flex items-center gap-2 w-full">
//           <MessageCircle size={20} />
//           <span>Comment</span>
//         </Button>
//       </div>
      
//       <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2 border-t">
//         <Input ref={commentInputRef} placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} className="bg-gray-100" />
//         <Button type="submit" disabled={isSubmittingComment || !newComment.trim()}>{isSubmittingComment ? "..." : "Post"}</Button>
//       </form>

//       {showComments && (
//         <div className="pt-2 space-y-2">
//           {comments.length > 0 ? (
//             comments.map(comment => (
//               <div key={comment.id} className="text-sm flex items-start gap-2 bg-gray-50 p-2 rounded-md">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={comment.author?.avatar_url} />
//                   <AvatarFallback>{comment.author?.username ? comment.author.username[0].toUpperCase() : 'U'}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p>
//                     <span className="font-semibold">{comment.author || 'User'}</span>
//                     <span className="text-xs text-gray-500 ml-2">{formatTimeAgo(comment.created_at)}</span>
//                   </p>
//                   <p>{comment.content}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-center text-gray-500">Be the first to comment.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }






// import { useState, useEffect, useRef } from "react";
// import { Heart, MessageCircle, Share2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to read a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// // Helper function to format date
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

// export default function PostCard({ post }) {
//   // Destructure for easier access
//   const { author, content, title, created_at, slug , tag_names} = post;

//   const [likeCount, setLikeCount] = useState(0);
//   const [commentCount, setCommentCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
  
//   const commentInputRef = useRef(null);
//   const authToken = getCookie('token'); // Read auth token from cookie

//   useEffect(() => {
//     const fetchCounts = async () => {
//       if (!authToken || !slug) return;
//       try {
//         const [likesRes, commentsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//           fetch(`${API_BASE_URL}/api/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//         ]);
//         const likesData = await likesRes.json();
//         const commentsData = await commentsRes.json();
//         if (likesRes.ok) {
//           setLikeCount(likesData.count)
//         setIsLiked(likesData.is_liked);
//         };
        
//         if (commentsRes.ok) setCommentCount(commentsData.count);
//       } catch (error) {
//         console.error("Failed to fetch counts:", error);
//       }
//     };
//     fetchCounts();
//   }, [slug, authToken]);

//   const handleLike = async () => {
//     if (!authToken) return alert("Please log in to like posts.");
//     const originalLikeState = isLiked;
//     const originalLikeCount = likeCount;
//     setIsLiked(!originalLikeState);
//     setLikeCount(originalLikeState ? originalLikeCount - 1 : originalLikeCount + 1);
//     const endpoint = originalLikeState ? 'unlike-post' : 'like-post';
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/${endpoint}/`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error("Failed to update like status");
//     } catch (error) {
//       setIsLiked(originalLikeState);
//       setLikeCount(originalLikeCount);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
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
//     if (!newComment.trim() || !authToken) return;
//     setIsSubmittingComment(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/comments/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (response.ok) {
//         setNewComment("");
//         setCommentCount(prev => prev + 1);
//         if (showComments) fetchComments();
//       } else {
//         alert("Failed to post comment.");
//       }
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-white space-y-3">
//       {/* --- POST HEADER --- */}
//       <div className="flex items-center">
//         <Avatar className="h-11 w-11">
//           <AvatarImage src={author?.avatar_url} />
//           <AvatarFallback>{author ? author[0].toUpperCase() : 'U'}</AvatarFallback>
//         </Avatar>
//         <div className="ml-3">
//           <p className="font-bold">{author || "Unknown User"}</p>
//           <p className="text-sm text-gray-500">{"Member"} • {formatTimeAgo(created_at)}</p>
//         </div>
//       </div>
      
//       {/* --- POST CONTENT  & TAGS --- */}
//       {/* <div>
//         <h3 className="font-semibold text-lg mb-1">{title}</h3>
//         <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
//       </div> */}

//         <div>
//         <h3 className="font-semibold text-lg mb-1">{title}</h3>
//         <p className="text-gray-700 whitespace-pre-wrap">{content}</p>

//         <div className="mt-3">
//           {/* ✅ 2. UPDATED: Loop over 'tag_names' to display the tags */}
//           {tag_names && tag_names.map((tag, index) => (
//             <span 
//               key={index} 
//               className="text-sm font-medium text-blue-600 mr-3 cursor-pointer hover:underline"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* --- NEW ACTIONS BAR UI --- */}
//       <div className="flex justify-between items-center text-sm font-medium text-gray-600 border-t pt-2">
//         {/* Left Side: Like, Comment, Share Buttons */}
//         <div className="flex items-center gap-6">
//           <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-2 p-1 ${isLiked ? 'text-red-500' : 'hover:text-gray-900'}`}>
//             <Heart size={18} className={isLiked ? "fill-current" : ""} />
//             <span>{likeCount}</span>
//             <span>{isLiked ? "Liked" : "Like" }</span>
//           </Button>
//           <Button variant="ghost" size="sm" onClick={handleToggleComments} className="flex items-center gap-2 p-1 hover:text-gray-900">
//             <MessageCircle size={18} />
//             <span>{commentCount} Comments</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 hover:text-gray-900">
//             <Share2 size={18} />
//             <span>Share</span>
//           </Button>
//         </div>

//         {/* Right Side: Reactions and Like Count */}
//         {/* <div className="flex items-center gap-2">
//           <span className="text-base">👍</span> 
//           <span className="font-semibold text-indigo-600">{likeCount}</span>
//         </div> */}
//       </div>
      
//       {/* --- ADD A COMMENT FORM --- */}
//       <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2 border-t">
//         <Input ref={commentInputRef} placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} className="bg-gray-100" />
//         <Button type="submit" disabled={isSubmittingComment || !newComment.trim()}>{isSubmittingComment ? "..." : "Post"}</Button>
//       </form>

//       {/* --- DISPLAY COMMENTS SECTION --- */}
//       {showComments && (
//         <div className="pt-2 space-y-2">
//           {comments.length > 0 ? (
//             comments.map(comment => (
//               <div key={comment.id} className="text-sm flex items-start gap-2 bg-gray-50 p-2 rounded-md">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={comment.author?.avatar_url} />
//                   <AvatarFallback>{comment.author?.username ? comment.author.username[0].toUpperCase() : 'U'}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p>
//                     <span className="font-semibold">{comment.author || 'User'}</span>
//                     <span className="text-xs text-gray-500 ml-2">{formatTimeAgo(comment.created_at)}</span>
//                   </p>
//                   <p>{comment.content}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-center text-gray-500">Be the first to comment.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Smile } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to read a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// // Helper function to format date
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

// // Comment component for threaded display
// function Comment({ comment, onReply, depth = 0 }) {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [isReplying, setIsReplying] = useState(false);

//   const handleReplyClick = () => {
//     setIsReplying(!isReplying);
//   };

//   const handleReplySubmit = (e) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;
    
//     if (onReply) {
//       // ✅ CORRECTED: Pass comment.slug instead of comment.id
//       onReply(comment.slug, replyText);
//     }
//     setReplyText("");
//     setIsReplying(false);
//   };

//   const toggleReplies = () => {
//     setShowReplies(!showReplies);
//   };

//   const replyCount = comment.replies?.length || comment.reply_count || 0;

//   return (
//     <div className={`${depth > 0 ? 'ml-12' : ''}`}>
//       <div className="flex flex-col gap-4">
//         {/* Comment Content */}
//         <div className="p-4 bg-gray-50 rounded-lg">
//           {/* Comment Header */}
//           <div className="flex justify-between items-start mb-4">
//             <div className="flex gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={comment.author?.avatar_url} />
//                 <AvatarFallback>
//                   {comment.author?.username?.[0]?.toUpperCase() || comment.author?.[0]?.toUpperCase() || 'U'}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-1">
//                   <span className="text-sm font-normal text-gray-900">
//                     {comment.author?.username || comment.author || 'User'}
//                   </span>
//                   <span className="text-xs text-gray-700">• Alumni</span>
//                   <span className="text-xs text-gray-700">• {formatTimeAgo(comment.created_at)}</span>
//                 </div>
//                 <div className="text-xs text-gray-600">SDE at Salesforce</div>
//               </div>
//             </div>
//             <Button variant="ghost" size="sm" className="p-2">
//               <MoreHorizontal size={16} className="text-blue-950" />
//             </Button>
//           </div>

//           {/* Comment Text */}
//           <div className="text-sm text-blue-950 font-medium leading-tight mb-4">
//             {comment.content}
//           </div>

//           {/* Comment Actions */}
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="sm" className="text-blue-950 text-sm p-0 h-auto">
//                 Like
//               </Button>
//               <div className="w-4 h-px bg-blue-950/50"></div>
//               <div className="flex items-center gap-1.5">
//                 <Button 
//                   variant="ghost" 
//                   size="sm" 
//                   className="text-blue-950 text-sm p-0 h-auto"
//                   onClick={handleReplyClick}
//                 >
//                   Reply
//                 </Button>
//                 {replyCount > 0 && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full h-auto"
//                     onClick={toggleReplies}
//                   >
//                     {replyCount}
//                   </Button>
//                 )}
//               </div>
//             </div>
            
//             {/* Reaction Emojis and Count */}
//             <div className="flex items-center gap-2">
//               <div className="flex gap-0.5">
//                 <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-sm">😊</div>
//                 <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-sm">😄</div>
//                 <div className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center text-sm">😂</div>
//               </div>
//               <span className="text-indigo-600 text-base font-medium">356</span>
//             </div>
//           </div>
//         </div>

//         {/* Reply Form */}
//         {isReplying && (
//           <div className="flex gap-3 items-start">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="" />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleReplySubmit} className="flex-1 flex gap-2">
//               <div className="flex-1 relative">
//                 <Input
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                   placeholder="Add a Comment..."
//                   className="pr-16 bg-white border border-gray-400 rounded-full"
//                 />
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
//                   <Button variant="ghost" size="sm" className="p-1 h-auto">
//                     <Camera size={16} className="text-indigo-950" />
//                   </Button>
//                   <Button variant="ghost" size="sm" className="p-1 h-auto">
//                     <Smile size={16} className="text-indigo-950" />
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Nested Replies */}
//         {showReplies && comment.replies && comment.replies.length > 0 && (
//           <div className="space-y-4">
//             {comment.replies.map(reply => (
//               <Comment 
//                 key={reply.id} 
//                 comment={reply} 
//                 onReply={onReply} 
//                 depth={depth + 1} 
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function PostCard({ post }) {
//   // Destructure for easier access
//   const { author, content, title, created_at, slug, tag_names } = post;

//   const [likeCount, setLikeCount] = useState(0);
//   const [commentCount, setCommentCount] = useState(0);
//   const [isLiked, setIsLiked] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [isSubmittingComment, setIsSubmittingComment] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
  
//   const commentInputRef = useRef(null);
//   const authToken = getCookie('token'); // Read auth token from cookie

//   useEffect(() => {
//     const fetchCounts = async () => {
//       if (!authToken || !slug) return;
//       try {
//         const [likesRes, commentsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//           fetch(`${API_BASE_URL}/api/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//         ]);
//         const likesData = await likesRes.json();
//         const commentsData = await commentsRes.json();
//         if (likesRes.ok) {
//           setLikeCount(likesData.count);
//           setIsLiked(likesData.is_liked);
//         }
        
//         if (commentsRes.ok) setCommentCount(commentsData.count);
//       } catch (error) {
//         console.error("Failed to fetch counts:", error);
//       }
//     };
//     fetchCounts();
//   }, [slug, authToken]);

//   const handleLike = async () => {
//     if (!authToken) return alert("Please log in to like posts.");
//     const originalLikeState = isLiked;
//     const originalLikeCount = likeCount;
//     setIsLiked(!originalLikeState);
//     setLikeCount(originalLikeState ? originalLikeCount - 1 : originalLikeCount + 1);
//     const endpoint = originalLikeState ? 'unlike-post' : 'like-post';
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/${endpoint}/`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error("Failed to update like status");
//     } catch (error) {
//       setIsLiked(originalLikeState);
//       setLikeCount(originalLikeCount);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
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
//     if (!newComment.trim() || !authToken) return;
//     setIsSubmittingComment(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/comments/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (response.ok) {
//         setNewComment("");
//         setCommentCount(prev => prev + 1);
//         if (showComments) fetchComments();
//       } else {
//         alert("Failed to post comment.");
//       }
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   const handleReply = async (commentSlug, replyContent) => {
//     if (!authToken) return alert("Please log in to reply.");
//     try {
//       // ✅ CORRECTED: Using commentSlug in the URL
//       const response = await fetch(`${API_BASE_URL}/api/comments/${commentSlug}/replies/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         // ✅ CORRECTED: Body is simplified
//         body: JSON.stringify({ 
//           content: replyContent 
//         }),
//       });
//       if (response.ok) {
//         fetchComments(); // Refresh comments to show new reply
//       } else {
//         // Improved error logging
//         const errorData = await response.json();
//         console.error("Failed to post reply:", response.status, errorData);
//         alert("Failed to post reply. Check console for details.");
//       }
//     } catch (error) {
//       console.error("Error submitting reply:", error);
//     }
//   };

//   return (
//     <div className="border rounded-lg p-4 bg-white space-y-3">
//       {/* --- POST HEADER --- */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <Avatar className="h-12 w-12">
//             <AvatarImage src={author?.avatar_url} />
//             <AvatarFallback>{author ? author[0].toUpperCase() : 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="ml-3">
//             <div className="flex items-center gap-2">
//               <p className="font-normal text-gray-900">{author || "Unknown User"}</p>
//               <span className="text-sm text-gray-700">• Alumni</span>
//               <span className="text-sm text-gray-700">• {formatTimeAgo(created_at)}</span>
//             </div>
//             <p className="text-sm text-gray-500">Posted 2min ago</p>
//           </div>
//         </div>
//         <Button variant="ghost" size="sm" className="p-2">
//           <MoreHorizontal size={16} className="text-blue-950" />
//         </Button>
//       </div>
      
//       {/* --- POST CONTENT --- */}
//       <div>
//         {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
//         <p className="text-blue-950 font-medium text-base leading-tight">{content}</p>

//         <div className="mt-3">
//           {tag_names && tag_names.map((tag, index) => (
//             <span 
//               key={index} 
//               className="text-sm font-medium text-blue-600 mr-3 cursor-pointer hover:underline"
//             >
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* --- ACTIONS BAR --- */}
//       <div className="flex justify-between items-center border-t pt-3">
//         <div className="flex items-center gap-4">
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             onClick={handleLike} 
//             className={`flex items-center gap-2 p-1 text-blue-950 ${isLiked ? 'text-red-500' : ''}`}
//           >
//             <Heart size={16} className={isLiked ? "fill-current" : ""} />
//             <span className="text-sm">Like</span>
//           </Button>
          
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             onClick={handleToggleComments} 
//             className="flex items-center gap-2 p-1 text-blue-950"
//           >
//             <MessageCircle size={15} />
//             <span className="text-sm">{commentCount} Comments</span>
//           </Button>
          
//           <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 text-blue-950">
//             <Share2 size={16} />
//             <span className="text-sm">Share</span>
//           </Button>
//         </div>

//         {/* Right Side: Reaction Emojis and Count */}
//         <div className="flex items-center gap-2">
//           <div className="flex gap-0.5">
//             <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-sm">😊</div>
//             <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center text-sm">😄</div>
//             <div className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center text-sm">😂</div>
//           </div>
//           <span className="text-indigo-600 text-base font-medium">{likeCount || 356}</span>
//         </div>
//       </div>

//       {/* --- COMMENTS SECTION --- */}
//       {showComments && (
//         <div className="space-y-4">
//           {/* Add Comment Form */}
//           <div className="flex gap-4 items-center">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="" />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleCommentSubmit} className="flex-1">
//               <div className="relative">
//                 <Input
//                   ref={commentInputRef}
//                   placeholder="Add a Comment..."
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   disabled={isSubmittingComment}
//                   className="pr-16 bg-white border border-gray-400 rounded-full"
//                 />
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
//                   <Button variant="ghost" size="sm" className="p-1 h-auto">
//                     <Camera size={16} className="text-indigo-950" />
//                   </Button>
//                   <Button variant="ghost" size="sm" className="p-1 h-auto">
//                     <Smile size={16} className="text-indigo-950" />
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Display Comments */}
//           <div className="space-y-4">
//             {comments.length > 0 ? (
//               comments.map(comment => (
//                 <Comment 
//                   key={comment.id} 
//                   comment={comment} 
//                   onReply={handleReply}
//                   depth={0}
//                 />
//               ))
//             ) : (
//               <p className="text-sm text-center text-gray-500">Be the first to comment.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to read a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// // Helper function to format date
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

// // Comment component for threaded display
// function Comment({ comment, onReply, depth = 0, authToken }) {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replies, setReplies] = useState([]);
//   const [replyText, setReplyText] = useState("");
//   const [isReplying, setIsReplying] = useState(false);

//   const handleReplyClick = () => {
//     setIsReplying(!isReplying);
//   };

//   const handleReplySubmit = (e) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;
    
//     if (onReply) {
//       onReply(comment.slug, replyText);
//     }
//     setReplyText("");
//     setIsReplying(false);
//   };

//   const fetchReplies = async () => {
//     if (!authToken || !comment.slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/comments/${comment.slug}/replies/`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setReplies(data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch replies:", error);
//     }
//   };

//   const toggleReplies = () => {
//     const newShowState = !showReplies;
//     setShowReplies(newShowState);
//     if (newShowState && replies.length === 0) {
//       fetchReplies();
//     }
//   };

//   const replyCount = comment.reply_count || 0;

//   return (
//     <div className={`${depth > 0 ? 'ml-8 pl-4 border-l' : ''}`}>
//       <div className="flex flex-col gap-4">
//         <div className="p-3 bg-gray-50 rounded-lg">
//           <div className="flex justify-between items-start mb-2">
//             <div className="flex gap-3">
//               <Avatar className="h-9 w-9">
//                 <AvatarImage src={comment.author?.avatar_url} />
//                 <AvatarFallback>
//                   {comment.author?.username?.[0]?.toUpperCase() || 'U'}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-semibold text-gray-900">
//                     {comment.author?.username || comment.author || 'User'}
//                   </span>
//                   <span className="text-xs text-gray-500">• {formatTimeAgo(comment.created_at)}</span>
//                 </div>
//                 <div className="text-xs text-gray-600">SDE at Salesforce</div>
//               </div>
//             </div>
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <MoreHorizontal size={16} className="text-gray-600" />
//             </Button>
//           </div>
//           <div className="text-sm text-gray-800 font-medium leading-tight mb-3 pl-12">
//             {comment.content}
//           </div>
//           <div className="flex items-center gap-4 pl-12">
//             <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900">
//               Like
//             </Button>
//             <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900" onClick={handleReplyClick}>
//               Reply
//             </Button>
//             {replyCount > 0 && (
//               <Button variant="link" size="sm" className="text-blue-600 text-xs p-0 h-auto" onClick={toggleReplies}>
//                 {showReplies ? 'Hide' : 'View'} {replyCount} replies
//               </Button>
//             )}
//           </div>
//         </div>
//         {isReplying && (
//           <div className="flex gap-3 items-start mt-2">
//             <Avatar className="h-9 w-9">
//               <AvatarImage src="" />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleReplySubmit} className="flex-1">
//               <Input
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//                 className="h-9 rounded-full bg-gray-100"
//               />
//             </form>
//           </div>
//         )}
//         {showReplies && replies.length > 0 && (
//           <div className="space-y-4 mt-4">
//             {replies.map(reply => (
//               <Comment 
//                 key={reply.id} 
//                 comment={reply} 
//                 onReply={onReply} 
//                 depth={depth + 1}
//                 authToken={authToken}
//               />
//             ))}
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
  
//   const authToken = getCookie('token');

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       if (!authToken || !slug) return;
//       try {
//         const [likesRes, commentsRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//           fetch(`${API_BASE_URL}/api/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
//         ]);

//         if (likesRes.ok) {
//           const likesData = await likesRes.json();
//           setLikeCount(likesData.count);
//           setIsLiked(likesData.is_like); // ✅ Likes Fix
//         } else {
//           console.error("Failed to fetch like count:", likesRes.status);
//         }
        
//         if (commentsRes.ok) {
//           const commentsData = await commentsRes.json();
//           setCommentCount(commentsData.count);
//         } else {
//           console.error("Failed to fetch comment count:", commentsRes.status);
//         }
//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       }
//     };
//     fetchInitialData();
//   }, [slug, authToken]);

//   const handleLike = async () => {
//     if (!authToken) return alert("Please log in to like posts.");
//     const originalLikeState = isLiked;
//     const originalLikeCount = likeCount;
//     setIsLiked(!originalLikeState);
//     setLikeCount(originalLikeState ? originalLikeCount - 1 : originalLikeCount + 1);
//     const endpoint = originalLikeState ? 'unlike-post' : 'like-post';
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/${endpoint}/`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//       });
//       if (!response.ok) throw new Error("Failed to update like status");
//     } catch (error) {
//       setIsLiked(originalLikeState);
//       setLikeCount(originalLikeCount);
//       alert("Something went wrong with the like action.");
//     }
//   };

//   const fetchComments = async () => {
//     if (!authToken || !slug) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
//       if (response.ok) {
//         setComments(await response.json());
//       }
//     } catch (error) {
//       console.error("Failed to fetch comments:", error);
//     }
//   };

//   const handleToggleComments = () => {
//     const newShowState = !showComments;
//     setShowComments(newShowState);
//     if (newShowState && comments.length === 0) {
//       fetchComments();
//     }
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     setIsSubmittingComment(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/${slug}/comments/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newComment }),
//       });
//       if (response.ok) {
//         setNewComment("");
//         setCommentCount(prev => prev + 1);
//         fetchComments();
//       } else {
//         alert("Failed to post comment.");
//       }
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     } finally {
//       setIsSubmittingComment(false);
//     }
//   };

//   const handleReply = async (commentSlug, replyContent) => {
//     if (!authToken) return alert("Please log in to reply.");
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/comments/${commentSlug}/replies/`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: replyContent }),
//       });
//       if (response.ok) {
//         fetchComments();
//       } else {
//         const errorData = await response.json();
//         console.error("Failed to post reply:", response.status, errorData);
//         alert("Failed to post reply.");
//       }
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
//             <AvatarFallback>{author ? author[0].toUpperCase() : 'U'}</AvatarFallback>
//           </Avatar>
//           <div className="ml-3">
//             <div className="flex items-center gap-2">
//               <p className="font-semibold text-gray-900">{author || "Unknown User"}</p>
//               {/* ✅ Time Fix */}
//               <span className="text-sm text-gray-500">• {formatTimeAgo(created_at)}</span>
//             </div>
//             <p className="text-sm text-gray-500">Alumni • SDE at Salesforce</p>
//           </div>
//         </div>
//         <Button variant="ghost" size="icon" className="h-8 w-8">
//           <MoreHorizontal size={16} className="text-gray-600" />
//         </Button>
//       </div>
      
//       <div>
//         {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
//         <p className="text-gray-800 leading-snug">{content}</p>
//         <div className="mt-3">
//           {tag_names && tag_names.map((tag, index) => (
//             <span key={index} className="text-sm font-medium text-blue-600 mr-3 cursor-pointer hover:underline">
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center border-t pt-2">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-2 p-1 text-gray-600 font-semibold ${isLiked ? 'text-red-500' : ''}`}>
//             <Heart size={20} className={isLiked ? "fill-current" : ""} />
//             <span>Like</span>
//           </Button>
//           <Button variant="ghost" size="sm" onClick={handleToggleComments} className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
//             <MessageCircle size={20} />
//             <span>Comment</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
//             <Share2 size={20} />
//             <span>Share</span>
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
//               <AvatarImage src="" />
//               <AvatarFallback>U</AvatarFallback>
//             </Avatar>
//             <form onSubmit={handleCommentSubmit} className="flex-1">
//               <Input
//                 placeholder="Add a comment..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 disabled={isSubmittingComment}
//                 className="h-9 rounded-full bg-gray-100"
//               />
//             </form>
//           </div>

//           <div className="space-y-4">
//             {comments.length > 0 ? (
//               comments.map(comment => (
//                 <Comment 
//                   key={comment.id} 
//                   comment={comment} 
//                   onReply={handleReply} 
//                   authToken={authToken} // ✅ Nested Replies Fix: Pass token down
//                 />
//               ))
//             ) : (
//               <p className="text-sm text-center text-gray-500">No comments yet.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
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

function Comment({ comment, onReply, depth = 0, authToken, currentUserAvatar }) {
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

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

  return (
    <div className={`${depth > 0 ? 'ml-8 pl-4 border-l' : ''}`}>
      <div className="flex flex-col gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={comment.author?.avatar_url} />
                <AvatarFallback>{getInitials(comment.author?.full_name || comment.author?.username)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{comment.author?.full_name || comment.author?.username || 'User'}</span>
                  <span className="text-xs text-gray-500">• {formatTimeAgo(comment.created_at)}</span>
                </div>
                {comment.author?.headline && <div className="text-xs text-gray-600">{comment.author.headline}</div>}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} className="text-gray-600" /></Button>
          </div>
          <div className="text-sm text-gray-800 font-medium leading-tight mb-3 pl-12">{comment.content}</div>
          <div className="flex items-center gap-4 pl-12">
            <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900">Like</Button>
            <Button variant="ghost" size="sm" className="text-gray-600 text-xs p-0 h-auto hover:text-gray-900" onClick={handleReplyClick}>Reply</Button>
            <Button variant="link" size="sm" className="text-blue-600 text-xs p-0 h-auto" onClick={toggleReplies}>{showReplies ? 'Hide Replies' : 'View Replies'}</Button>
          </div>
        </div>
        {isReplying && (
          <div className="flex gap-3 items-start mt-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUserAvatar} />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <form onSubmit={handleReplySubmit} className="flex-1">
              <Input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." className="h-9 rounded-full bg-gray-100" />
            </form>
          </div>
        )}
        {showReplies && replies.length > 0 && (
          <div className="space-y-4 mt-4">
            {replies.map(reply => <Comment key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} authToken={authToken} currentUserAvatar={currentUserAvatar} />)}
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
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  
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
          setIsLiked(d.is_like);
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

  const handleLike = async () => {
    if (!authToken) return alert("Please log in to like posts.");
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    try {
      await fetch(`${API_BASE_URL}/api/posts-app/${slug}/${isLiked ? 'unlike-post' : 'like-post'}/`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
    } catch (error) {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      alert("Like action failed.");
    }
  };

  const fetchComments = async () => {
    if (!authToken || !slug) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts-app/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
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
      } else alert("Failed to post comment.");
    } catch (error) {
      console.error("Error submitting comment:", error);
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
      if (response.ok) fetchComments();
      else alert("Failed to post reply.");
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={author?.avatar_url} />
            <AvatarFallback>{getInitials(author?.full_name || author?.username)}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{author?.full_name || author?.username || "Unknown User"}</p>
              <span className="text-sm text-gray-500">• {formatTimeAgo(created_at)}</span>
            </div>
            {author?.headline && <p className="text-sm text-gray-500">{author.headline}</p>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} className="text-gray-600" /></Button>
      </div>
      
      <div>
        {title && <h3 className="font-semibold text-lg mb-1">{title}</h3>}
        <p className="text-gray-800 leading-snug">{content}</p>
        <div className="mt-3">
          {tag_names?.map((tag, index) => <span key={index} className="text-sm font-medium text-blue-600 mr-3 cursor-pointer hover:underline">#{tag}</span>)}
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-2 p-1 text-gray-600 font-semibold ${isLiked ? 'text-red-500' : ''}`}>
            <Heart size={20} className={isLiked ? "fill-current" : ""} /><span>Like</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleToggleComments} className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
            <MessageCircle size={20} /><span>Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 text-gray-600 font-semibold">
            <Share2 size={20} /><span>Share</span>
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          <span>{likeCount} Likes</span>
          <span className="ml-4">{commentCount} Comments</span>
        </div>
      </div>

      {showComments && (
        <div className="border-t pt-4 space-y-4">
          <div className="flex gap-3 items-start">
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUserAvatar} />
              <AvatarFallback>{getInitials(currentUser?.full_name || currentUser?.username)}</AvatarFallback>
            </Avatar>
            <form onSubmit={handleCommentSubmit} className="flex-1">
              <Input placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} className="h-9 rounded-full bg-gray-100" />
            </form>
          </div>
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => <Comment key={comment.id} comment={comment} onReply={handleReply} authToken={authToken} currentUserAvatar={currentUserAvatar} />)
            ) : <p className="text-sm text-center text-gray-500">No comments yet.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
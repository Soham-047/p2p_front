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






import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to read a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Helper function to format date
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

export default function PostCard({ post }) {
  // Destructure for easier access
  const { author, content, title, created_at, slug } = post;

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  
  const commentInputRef = useRef(null);
  const authToken = getCookie('token'); // Read auth token from cookie

  useEffect(() => {
    const fetchCounts = async () => {
      if (!authToken || !slug) return;
      try {
        const [likesRes, commentsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/${slug}/like-count/`, { headers: { Authorization: `Bearer ${authToken}` } }),
          fetch(`${API_BASE_URL}/api/count-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } }),
        ]);
        const likesData = await likesRes.json();
        const commentsData = await commentsRes.json();
        if (likesRes.ok) setLikeCount(likesData.count);
        if (commentsRes.ok) setCommentCount(commentsData.count);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };
    fetchCounts();
  }, [slug, authToken]);

  const handleLike = async () => {
    if (!authToken) return alert("Please log in to like posts.");
    const originalLikeState = isLiked;
    const originalLikeCount = likeCount;
    setIsLiked(!originalLikeState);
    setLikeCount(originalLikeState ? originalLikeCount - 1 : originalLikeCount + 1);
    const endpoint = originalLikeState ? 'unlike-post' : 'like-post';
    try {
      const response = await fetch(`${API_BASE_URL}/api/${slug}/${endpoint}/`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error("Failed to update like status");
    } catch (error) {
      setIsLiked(originalLikeState);
      setLikeCount(originalLikeCount);
      alert("Something went wrong. Please try again.");
    }
  };

  const fetchComments = async () => {
    if (!authToken || !slug) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/list-comments/${slug}/`, { headers: { Authorization: `Bearer ${authToken}` } });
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
    if (!newComment.trim() || !authToken) return;
    setIsSubmittingComment(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/${slug}/comments/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      if (response.ok) {
        setNewComment("");
        setCommentCount(prev => prev + 1);
        if (showComments) fetchComments();
      } else {
        alert("Failed to post comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white space-y-3">
      {/* --- POST HEADER --- */}
      <div className="flex items-center">
        <Avatar className="h-11 w-11">
          <AvatarImage src={author?.avatar_url} />
          <AvatarFallback>{author ? author[0].toUpperCase() : 'U'}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="font-bold">{author || "Unknown User"}</p>
          <p className="text-sm text-gray-500">{"Member"} • {formatTimeAgo(created_at)}</p>
        </div>
      </div>
      
      {/* --- POST CONTENT --- */}
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
      </div>

      {/* --- NEW ACTIONS BAR UI --- */}
      <div className="flex justify-between items-center text-sm font-medium text-gray-600 border-t pt-2">
        {/* Left Side: Like, Comment, Share Buttons */}
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-2 p-1 ${isLiked ? 'text-red-500' : 'hover:text-gray-900'}`}>
            <Heart size={18} className={isLiked ? "fill-current" : ""} />
            <span>{likeCount}</span>
            <span>{isLiked ? "Liked" : "Like" }</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleToggleComments} className="flex items-center gap-2 p-1 hover:text-gray-900">
            <MessageCircle size={18} />
            <span>{commentCount} Comments</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 p-1 hover:text-gray-900">
            <Share2 size={18} />
            <span>Share</span>
          </Button>
        </div>

        {/* Right Side: Reactions and Like Count */}
        {/* <div className="flex items-center gap-2">
          <span className="text-base">👍</span> 
          <span className="font-semibold text-indigo-600">{likeCount}</span>
        </div> */}
      </div>
      
      {/* --- ADD A COMMENT FORM --- */}
      <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2 border-t">
        <Input ref={commentInputRef} placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={isSubmittingComment} className="bg-gray-100" />
        <Button type="submit" disabled={isSubmittingComment || !newComment.trim()}>{isSubmittingComment ? "..." : "Post"}</Button>
      </form>

      {/* --- DISPLAY COMMENTS SECTION --- */}
      {showComments && (
        <div className="pt-2 space-y-2">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="text-sm flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author?.avatar_url} />
                  <AvatarFallback>{comment.author?.username ? comment.author.username[0].toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p>
                    <span className="font-semibold">{comment.author || 'User'}</span>
                    <span className="text-xs text-gray-500 ml-2">{formatTimeAgo(comment.created_at)}</span>
                  </p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">Be the first to comment.</p>
          )}
        </div>
      )}
    </div>
  );
}
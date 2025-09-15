
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { MoreVertical, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

// export default function RecentPosts() {
//   const posts = [
//     {
//       name: "Ritik Kumar Sen",
//       role: "Alumni",
//       time: "3 hours ago",
//       content:
//         "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
//       likes: 356,
//       comments: 63,
//     },
//     {
//       name: "Soham Raj Chopra",
//       role: "Alumni",
//       time: "3 hours ago",
//       content:
//         "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
//       likes: 356,
//       comments: 63,
//     },
//     {
//       name: "Mahendra Seervi",
//       role: "Alumni",
//       time: "3 hours ago",
//       content:
//         "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
//       likes: 356,
//       comments: 63,
//     }
//   ];

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Recent Posts</h2>
//         <button className="text-sm text-purple-600 hover:underline">View All →</button>
//       </div>
//       {posts.map((post, i) => (
//         <Card key={i} className="mb-4 border border-gray-200 hover:shadow-md transition-shadow">
//           <CardHeader className="flex justify-between">
//             <div>
//               <p className="font-semibold">{post.name}</p>
//               <p className="text-xs text-gray-500">
//                 {post.role} • {post.time}
//               </p>
//             </div>
//             <MoreVertical className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <p className="mb-3 text-gray-700">{post.content}</p>
//             <div className="flex items-center gap-6 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <ThumbsUp className="h-4 w-4" /> {post.likes}
//               </div>
//               <div className="flex items-center gap-1">
//                 <MessageCircle className="h-4 w-4" /> {post.comments} Comments
//               </div>
//               <div className="flex items-center gap-1">
//                 <Share2 className="h-4 w-4" /> Share
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../communityComponents/PostCard"; // 1. Import your main PostCard component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      const authToken = getCookie('token');
      if (!authToken) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!response.ok) throw new Error("Failed to fetch posts");
        
        const allPosts = await response.json();
        const postsWithLikeStatus = allPosts.map(post => ({
          ...post,
          is_liked_by_user: false, // Add the key with a default value
        }));
        setPosts(postsWithLikeStatus.slice(0, 5));

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (loading) return <p>Loading recent posts...</p>;
  if (error) return <p className="text-red-500">Could not load posts.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <Link to="/community" className="text-sm text-purple-600 hover:underline">
          View All →
        </Link>
      </div>
      
      {/* 2. Map over the posts and render the full PostCard for each one */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
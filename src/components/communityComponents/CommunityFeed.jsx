// import SearchBarWithFilter from "./SearchBarWithFilter";
// import CreatePostCard from "./CreatePostCard";
// import PostCard from "./PostCard";

// export default function CommunityFeed() {
//   const posts = [
//     {
//       id: 1,
//       name: "Ritik Kumar Sen",
//       role: "Alumni",
//       time: "3 hours ago",
//       content:
//         "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it! Happy to share insights with anyone interested in full-stack development.",
//       likes: 356,
//       comments: 63,
//       avatar: "/avatars/ritik.jpg",
//     },
//     {
//       id: 2,
//       name: "Ritik Kumar Sen",
//       role: "Alumni",
//       time: "3 hours ago",
//       content:
//         "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it! Happy to share insights with anyone interested in full-stack development.",
//       likes: 356,
//       comments: 63,
//       avatar: "/avatars/ritik.jpg",
//     },
//   ];
  

//   return (
//     <div className="space-y-6">
//       <SearchBarWithFilter />
//       <CreatePostCard />
//       {posts.map((post) => (
//         <PostCard key={post.id} post={post} />
//       ))}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import SearchBarWithFilter from "./SearchBarWithFilter";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to read a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      // ✅ CHANGE HERE: Read from the cookie instead of localStorage
      const authToken = getCookie('token'); 

      if (!authToken) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        });

        
        // ... (rest of the component is the same)
        

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch posts:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading feed...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <SearchBarWithFilter />
      <CreatePostCard />
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
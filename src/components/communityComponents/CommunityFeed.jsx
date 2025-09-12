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


// import { useState, useEffect } from "react";
// import SearchBarWithFilter from "./SearchBarWithFilter";
// import CreatePostCard from "./CreatePostCard";
// import PostCard from "./PostCard";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to read a specific cookie by name
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// export default function CommunityFeed() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       // ✅ CHANGE HERE: Read from the cookie instead of localStorage
//       const authToken = getCookie('token'); 

//       if (!authToken) {
//         setError("You are not logged in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
//           headers: {
//             "Accept": "application/json",
//             "Authorization": `Bearer ${authToken}`,
//           },
//         });

        
//         // ... (rest of the component is the same)
        

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPosts(data);
//       } catch (e) {
//         setError(e.message);
//         console.error("Failed to fetch posts:", e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-8">Loading feed...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <SearchBarWithFilter />
//       <CreatePostCard />
//       {posts.map((post) => (
//         <PostCard key={post.slug} post={post} />
//       ))}
//     </div>
//   );
// }


// import { useState, useEffect, useCallback } from "react"; // Import useCallback
// import SearchBarWithFilter from "./SearchBarWithFilter";
// import CreatePostCard from "./CreatePostCard";
// import PostCard from "./PostCard";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// export default function CommunityFeed() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Step 1: Wrap your fetch logic in useCallback for optimization
//   const fetchPosts = useCallback(async () => {
//     const authToken = getCookie('token'); 
//     if (!authToken) {
//       setError("You are not logged in.");
//       setLoading(false);
//       return;
//     }
//     try {
//       // Set loading to true when re-fetching
//       setLoading(true); 
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
//         headers: {
//           "Accept": "application/json",
//           "Authorization": `Bearer ${authToken}`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setPosts(data);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch posts:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Empty dependency array means this function is created only once

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]); // Run fetchPosts on initial mount

//   // Step 2: Create the handler function to be passed down
//   const handlePostCreated = () => {
//     // This function simply calls fetchPosts again to get the new list
//     fetchPosts();
//   };

//   // We show a loading indicator for the initial load only.
//   // Subsequent loads will happen in the background.
//   if (loading && posts.length === 0) {
//     return <p className="text-center mt-8">Loading feed...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <SearchBarWithFilter />
      
//       {/* Step 3: Pass the handler function as a prop to CreatePostCard */}
//       <CreatePostCard onPostCreated={handlePostCreated} />
      
//       {posts.map((post) => (
//         <PostCard key={post.slug} post={post} />
//       ))}
//     </div>
//   );
// }






import { useState, useEffect, useCallback } from "react";
import SearchBarWithFilter from "./SearchBarWithFilter";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState("");

  const fetchFeedData = useCallback(async () => {
    const authToken = getCookie('token');
    if (!authToken) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      
      // बदला गया: अब सिर्फ 2 API calls होंगी। avatar वाली call हटा दी गई है।
      const [postsRes, profileRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
          headers: { "Authorization": `Bearer ${authToken}` },
        }),
        fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
          headers: { "Authorization": `Bearer ${authToken}` },
        }),
      ]);

      if (!postsRes.ok) throw new Error(`HTTP error! Status: ${postsRes.status}`);
      
      const postsData = await postsRes.json();
      setPosts(postsData);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setCurrentUser(profileData);
        
        // बदला गया: avatar_url को सीधे profileData से सेट करें
        setCurrentUserAvatar(profileData.avatar_url); 
      }
      
      // हटाया गया: avatarRes.ok वाला पूरा ब्लॉक हटा दिया गया है क्योंकि उसकी अब ज़रूरत नहीं।

    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch feed data:", e);
    } finally {
      setLoading(false);
    }
  }, []); // बदला गया: currentUserAvatar की dependency हटा दी गई है

  useEffect(() => {
    fetchFeedData();
    
    // हटाया गया: cleanup function की अब ज़रूरत नहीं है क्योंकि हम createObjectURL का इस्तेमाल नहीं कर रहे।
  }, [fetchFeedData]);

  const handlePostCreated = () => {
    fetchFeedData();
  };

  if (loading && posts.length === 0) {
    return <p className="text-center mt-8">Loading feed...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <SearchBarWithFilter />
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      {posts.map((post) => (
        <PostCard 
          key={post.slug} 
          post={post} 
          currentUser={currentUser}
          currentUserAvatar={currentUserAvatar} // यह अब एक URL string (या null) होगी
        />
      ))}
    </div>
  );
}
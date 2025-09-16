
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

  // const fetchFeedData = useCallback(async () => {
  //   const authToken = getCookie('token');
  //   if (!authToken) {
  //     setError("You are not logged in.");
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     setLoading(true);
      
  //     // बदला गया: अब सिर्फ 2 API calls होंगी। avatar वाली call हटा दी गई है।
  //     const [postsRes, profileRes] = await Promise.all([
  //       fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
  //         headers: { "Authorization": `Bearer ${authToken}` },
  //       }),
  //       fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
  //         headers: { "Authorization": `Bearer ${authToken}` },
  //       }),
  //     ]);

  //     if (!postsRes.ok) throw new Error(`HTTP error! Status: ${postsRes.status}`);
      
  //     let postsData = await postsRes.json();

  //      if (postsData && postsData.length > 0) {
  //       // 1. Collect all post slugs
  //       const postSlugs = postsData.map(post => post.slug);
       

  //       // 2. Fetch the like statuses for all collected slugs in one go
  //       const likeStatusRes = await fetch(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`, {
  //           method: 'POST',
  //           headers: {
  //               'Authorization': `Bearer ${authToken}`,
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ post_slugs: postSlugs }),
  //       });

  //       if (likeStatusRes.ok) {
  //           const likeStatuses = await likeStatusRes.json(); 
  //           // Expected response: { "slug-1": true, "slug-2": false, ... }
            
  //           // 3. Merge the like status into each post object
  //           postsData = postsData.map(post => ({
  //               ...post,
  //               is_liked_by_user: likeStatuses[post.slug] || false, // Add the new property
  //           }));
  //       }
  //     }
  //     setPosts(postsData);

  //     if (profileRes.ok) {
  //       const profileData = await profileRes.json();
  //       setCurrentUser(profileData);
        
  //       // बदला गया: avatar_url को सीधे profileData से सेट करें
  //       setCurrentUserAvatar(profileData.avatar_url); 
  //     }
      
  //     // हटाया गया: avatarRes.ok वाला पूरा ब्लॉक हटा दिया गया है क्योंकि उसकी अब ज़रूरत नहीं।

  //   } catch (e) {
  //     setError(e.message);
  //     console.error("Failed to fetch feed data:", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []); // बदला गया: currentUserAvatar की dependency हटा दी गई है
    const fetchFeedData = useCallback(async () => {
    const authToken = getCookie('token');
    if (!authToken) {
      setError("You are not logged in.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      
      const [postsRes, profileRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
          headers: { "Authorization": `Bearer ${authToken}` },
        }),
        fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
          headers: { "Authorization": `Bearer ${authToken}` },
        }),
      ]);

      if (!postsRes.ok) throw new Error(`HTTP error! Status: ${postsRes.status}`);
      
      let postsData = await postsRes.json();

      if (postsData && postsData.length > 0) {
        // Create a fallback empty object for like statuses.
        let likeStatuses = {}; 

        try {
          const postSlugs = postsData.map(post => post.slug);
          const likeStatusRes = await fetch(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post_slugs: postSlugs }),
          });

          if (likeStatusRes.ok) {
            likeStatuses = await likeStatusRes.json();
          } else {
            console.error("Failed to fetch like statuses:", likeStatusRes.statusText);
          }
        } catch (error) {
          console.error("Error fetching like statuses:", error);
        }
        
        // This mapping logic now runs ALWAYS, ensuring the `is_liked_by_user` key is added.
        postsData = postsData.map(post => ({
          ...post,
          is_liked_by_user: likeStatuses[post.slug] || false,
        }));
      }
      
      setPosts(postsData);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setCurrentUser(profileData);
        setCurrentUserAvatar(profileData.avatar_url); 
      }
      
    } catch (e) {
      setError(e.message);
      console.error("Failed to fetch feed data:", e);
    } finally {
      setLoading(false);
    }
  }, []);
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
      {/* <SearchBarWithFilter /> */}
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      {posts.map((post) => (
        <PostCard 
          key={post.slug} 
          post={post} 
          currentUser={currentUser}
          currentUserAvatar={currentUserAvatar} // यह अब एक URL string (या null) होगी
          onPostUpdated={handlePostCreated}
        />
      ))}
    </div>
  );
}  

// import { useState, useEffect, useCallback } from "react";
// import CreatePostCard from "./CreatePostCard";
// import PostCard from "./PostCard";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Helper function to get a cookie
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// export default function CommunityFeed() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentUserAvatar, setCurrentUserAvatar] = useState("");

//   const fetchFeedData = useCallback(async () => {
//     const authToken = getCookie('token');
//     if (!authToken) {
//       setError("You are not logged in.");
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
      
//       const [postsRes, profileRes] = await Promise.all([
//         fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
//           headers: { "Authorization": `Bearer ${authToken}` },
//         }),
//         fetch(`${API_BASE_URL}/api/users-app/profile/me/`, {
//           headers: { "Authorization": `Bearer ${authToken}` },
//         }),
//       ]);

//       if (!postsRes.ok) throw new Error(`HTTP error! Status: ${postsRes.status}`);
      
//       let postsData = await postsRes.json();

//       if (postsData && postsData.length > 0) {
//         // Create a fallback empty object for like statuses.
//         let likeStatuses = {}; 

//         try {
//           const postSlugs = postsData.map(post => post.slug);
//           const likeStatusRes = await fetch(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`, {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${authToken}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ post_slugs: postSlugs }),
//           });

//           if (likeStatusRes.ok) {
//             likeStatuses = await likeStatusRes.json();
//           } else {
//             console.error("Failed to fetch like statuses:", likeStatusRes.statusText);
//           }
//         } catch (error) {
//           console.error("Error fetching like statuses:", error);
//         }
        
//         // This mapping logic now runs ALWAYS, ensuring the `is_liked_by_user` key is added.
//         postsData = postsData.map(post => ({
//           ...post,
//           is_liked_by_user: likeStatuses[post.slug] || false,
//         }));
//       }
      
//       setPosts(postsData);

//       if (profileRes.ok) {
//         const profileData = await profileRes.json();
//         setCurrentUser(profileData);
//         setCurrentUserAvatar(profileData.avatar_url); 
//       }
      
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch feed data:", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchFeedData();
//   }, [fetchFeedData]);

//   const handlePostCreated = () => {
//     fetchFeedData(); // Re-fetch data when a new post is created
//   };

//   if (loading && posts.length === 0) {
//     return <p className="text-center mt-8">Loading feed...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-8 text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <CreatePostCard onPostCreated={handlePostCreated} currentUser={currentUser} currentUserAvatar={currentUserAvatar} />
      
//       {posts.map((post) => (
//         <PostCard 
//           key={post.slug} 
//           post={post} 
//           currentUser={currentUser}
//           currentUserAvatar={currentUserAvatar}
//         />
//       ))}
//     </div>
//   );
// }
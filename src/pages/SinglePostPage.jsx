import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PostCard from '@/components/communityComponents/PostCard';
import ProfileSidebarCard from '@/components/profileComponent/ProfileSidebarCard';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function SinglePostPage() {
  // Get the 'slug' from the URL, e.g., "hello-world" from "/posts/hello-world"
  const { slug } = useParams();
  const navigate = useNavigate();

  // State for the single post object
  const [post, setPost] = useState(null);
  // State for the currently logged-in user (needed by PostCard)
  const [currentUser, setCurrentUser] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This function fetches all data needed for the page
  const fetchData = useCallback(async () => {
    setLoading(true);
    const authToken = getCookie("token");
    if (!authToken) {
      setError("Please log in to view this post.");
      setLoading(false);
      return;
    }

    try {
      // Use Promise.all to fetch the post and the current user's data at the same time
      const [postRes, meRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/posts-app/posts/${slug}/`, {
          headers: { Authorization: `Bearer ${authToken}` }
        }),
        axios.get(`${API_BASE_URL}/api/users-app/profile/me/`, { 
          headers: { Authorization: `Bearer ${authToken}` } 
        })
      ]);
      
      let postData = postRes.data;

      // Also fetch the like status for this single post
      const likeStatusRes = await axios.post(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`,
          { post_slugs: [postData.slug] },
          { headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } }
      );
      const likeStatuses = likeStatusRes.data || {};

      // Add the like status to the post object
      postData.is_liked_by_user = likeStatuses[postData.slug] || false;
      
      setPost(postData);
      setCurrentUser(meRes.data);
      setError(null);

    } catch (err) {
      setError("Failed to fetch post. It may have been deleted or you may not have permission.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]); // Re-run this function if the slug in the URL changes

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // This function is called if the post is deleted from the PostCard component
  const handlePostDeleted = () => {
    alert("Post was deleted. Returning to the home page.");
    navigate('/home'); // Redirect user after deletion
  };

  return (
    // 1. Changed the main layout to a two-column grid
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">

          {/* 2. Wrapped the PostCard in a <main> tag for the left column */}
          <main className="md:col-span-2">
            {loading && <div className="text-center text-gray-500 py-10">Loading post...</div>}
            {error && <div className="text-center text-red-500 py-10">{error}</div>}
            
            {!loading && post && (
              <PostCard
                post={post}
                currentUser={currentUser}
                currentUserAvatar={currentUser?.avatar_url}
                onPostUpdated={fetchData}
                onPostDeleted={handlePostDeleted}
              />
            )}
          </main>

          {/* 3. The <aside> is now the right column of the grid */}
          <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">
              {/* The sidebar shows the profile of the LOGGED-IN user */}
              <ProfileSidebarCard currentUser={currentUser} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
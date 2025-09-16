import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostCard from '@/components/communityComponents/PostCard';
import { Button } from '@/components/ui/button';
import ProfileSidebarCard from '@/components/profileComponent/ProfileSidebarCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function PublicProfilePage() {
  const { username } = useParams();
  const [postsResponse, setPostsResponse] = useState({ results: [], next: null, previous: null });
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null); 

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     const authToken = getCookie("token");
//     if (!authToken) {
//       setError("Please log in to view profiles.");
//       setLoading(false);
//       return;
//     }

//     try {
//       if (!currentUser) {
//           const meRes = await axios.get(`${API_BASE_URL}/api/users-app/profile/me/`, { headers: { Authorization: `Bearer ${authToken}` } });
//           setCurrentUser(meRes.data);
//       }

//       const profileRes = await axios.get(`${API_BASE_URL}/profile/${username}/`, { headers: { Authorization: `Bearer ${authToken}` } });
//       setProfileData(profileRes.data);

//       const postsRes = await axios.get(`${API_BASE_URL}/api/posts-app/posts/${username}/posts/`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//         params: { page, timestamp: new Date().getTime() }
//       });
      
//       // ✅ ADDED THIS LOGIC FOR LIKE STATUSES
//       let postsData = postsRes.data;
//       if (postsData && postsData.results.length > 0) {
//         const postSlugs = postsData.results.map(post => post.slug);
//         let likeStatuses = {};
//         try {
//           const likeStatusRes = await axios.post(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`,
//             { post_slugs: postSlugs },
//             { headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } }
//           );
//           likeStatuses = likeStatusRes.data;
//         } catch (likeError) {
//           console.error("Could not fetch like statuses.", likeError);
//         }
//         const postsWithLikes = postsData.results.map(post => ({
//           ...post,
//           is_liked_by_user: likeStatuses[post.slug] || false,
//         }));
//         postsData = { ...postsData, results: postsWithLikes };
//       }
//       // ✅ END OF ADDED LOGIC

//       setPostsResponse(postsData);
//       setError(null);

//     } catch (err) {
//       setError(`Failed to fetch profile for ${username}.`);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [username, page, currentUser]);
  const fetchData = useCallback(async () => {
    setLoading(true);
    const authToken = getCookie("token");
    if (!authToken) {
      setError("Please log in to view profiles.");
      setLoading(false);
      return;
    }

    try {
      // Fetch the LOGGED-IN user's data (for the Edit/Delete security check)
      if (!currentUser) {
          const meRes = await axios.get(`${API_BASE_URL}/api/users-app/profile/me/`, { headers: { Authorization: `Bearer ${authToken}` } });
          setCurrentUser(meRes.data);
      }
      
      // Fetch the profile data of the user we are VIEWING
      // THIS IS THE CORRECTED LINE:
      const profileRes = await axios.get(`${API_BASE_URL}/api/users-app/profile/${username}/`, { headers: { Authorization: `Bearer ${authToken}` } });
      setProfileData(profileRes.data);

      // Fetch posts for the user we are VIEWING
      const postsRes = await axios.get(`${API_BASE_URL}/api/posts-app/posts/${username}/posts/`, {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { page, timestamp: new Date().getTime() }
      });
      
      let postsData = postsRes.data;
      if (postsData && postsData.results.length > 0) {
        const postSlugs = postsData.results.map(post => post.slug);
        let likeStatuses = {};
        try {
          const likeStatusRes = await axios.post(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`,
            { post_slugs: postSlugs },
            { headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } }
          );
          likeStatuses = likeStatusRes.data;
        } catch (likeError) {
          console.error("Could not fetch like statuses.", likeError);
        }
        const postsWithLikes = postsData.results.map(post => ({
          ...post,
          is_liked_by_user: likeStatuses[post.slug] || false,
        }));
        postsData = { ...postsData, results: postsWithLikes };
      }

      setPostsResponse(postsData);
      setError(null);

    } catch (err) {
      setError(`Failed to fetch profile for ${username}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
}, [username, page, currentUser]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page])

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <main className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData ? `${profileData.full_name}'s Posts` : 'Loading Posts...'}
              </h1>
            </div>
            
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && !error && (
                <>
                    <div className="space-y-6">
                        {postsResponse.results.length > 0 ? (
                            postsResponse.results.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    currentUser={currentUser}
                                    currentUserAvatar={currentUser?.avatar_url}
                                    onPostUpdated={fetchData} 
                                />
                            ))
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg shadow-md">
                                <p className="text-gray-500">{username} hasn't created any posts yet.</p>
                            </div>
                        )}
                    </div>
                    {/* Pagination buttons go here */}
                    <div className="flex justify-between items-center mt-8">
                        <Button 
                          onClick={() => setPage(page - 1)} 
                          disabled={!postsResponse.previous}
                        >
                          Previous
                        </Button>
                        <span className="font-medium text-gray-600">Page {page}</span>
                        <Button 
                          onClick={() => setPage(page + 1)} 
                          disabled={!postsResponse.next}
                        >
                          Next
                        </Button>
                      </div>
                </>
            )}
          </main>
          {/* <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">
              <ProfileSidebarCard currentUser={profileData} />
            </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}
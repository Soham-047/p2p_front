import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PostCard from '@/components/communityComponents/PostCard';
import { Button } from '@/components/ui/button';
// 1. Import the ProfileSidebarCard component
import ProfileSidebarCard from '@/components/profileComponent/ProfileSidebarCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function TagSearchPage() {
  const { tagName } = useParams();
  const [searchResponse, setSearchResponse] = useState({ results: [], next: null, previous: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = useCallback(async () => {
    // ... (Your existing fetchData logic remains exactly the same)
    setLoading(true);
    const authToken = getCookie("token");
    if (!authToken) { return; }
    try {
      if (!currentUser) {
        const meRes = await axios.get(`${API_BASE_URL}/api/users-app/profile/me/`, { headers: { Authorization: `Bearer ${authToken}` } });
        setCurrentUser(meRes.data);
      }
      const searchRes = await axios.get(`${API_BASE_URL}/api/posts-app/tags/search/`, {
        headers: { Authorization: `Bearer ${authToken}` },
        params: { q: tagName, page: page }
      });
      let postsData = searchRes.data;
      if (postsData && postsData.results.length > 0) {
        const postSlugs = postsData.results.map(post => post.slug);
        const likeStatusRes = await axios.post(`${API_BASE_URL}/api/posts-app/posts/like-statuses/`,
            { post_slugs: postSlugs },
            { headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' } }
        );
        const likeStatuses = likeStatusRes.data || {};
        const postsWithLikes = postsData.results.map(post => ({
            ...post,
            is_liked_by_user: likeStatuses[post.slug] || false,
        }));
        postsData = { ...postsData, results: postsWithLikes };
      }
      setSearchResponse(postsData);
      setError(null);
    } catch (err) {
      setError(`Failed to find posts for tag #${tagName}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [tagName, page, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    // 2. Use the same main container and grid layout as your other pages
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          
          {/* Main Content (Left Column) */}
          <main className="md:col-span-2">
            <div className="mb-6">
              <p className="text-gray-600">Showing posts tagged with</p>
              <h1 className="text-3xl font-bold text-gray-900">#{tagName}</h1>
            </div>
            
            {loading && <p className="text-center text-gray-500 py-10">Searching for posts...</p>}
            {error && <p className="text-center text-red-500 py-10">{error}</p>}
            
            {!loading && !error && (
              <>
                <div className="space-y-6">
                  {searchResponse.results.length > 0 ? (
                    searchResponse.results.map(post => (
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
                      <p className="text-gray-500">No posts found with the tag #{tagName}.</p>
                    </div>
                  )}
                </div>

                {searchResponse.results.length > 0 && (
                  <div className="flex justify-between items-center mt-8">
                    <Button onClick={() => setPage(page - 1)} disabled={!searchResponse.previous}>Previous</Button>
                    <span className="font-medium text-gray-600">Page {page}</span>
                    <Button onClick={() => setPage(page + 1)} disabled={!searchResponse.next}>Next</Button>
                  </div>
                )}
              </>
            )}
          </main>

          {/* 3. Add the Sidebar (Right Column) */}
          <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">
              {/* The sidebar card shows the profile of the LOGGED-IN user */}
              <ProfileSidebarCard currentUser={currentUser} />
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
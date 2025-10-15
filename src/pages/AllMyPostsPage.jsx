import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PostCard from "@/components/communityComponents/PostCard";
import { Button } from "@/components/ui/button";
import ProfileSidebarCard from "@/components/profileComponent/ProfileSidebarCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get auth cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function AllMyPostsPage() {
  const [postsResponse, setPostsResponse] = useState({
    results: [],
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const authToken = getCookie("token");

    if (!authToken) {
      setError("Please log in to view your posts.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Fetch user profile if not already loaded
      if (!currentUser) {
        const profileRes = await axios.get(
          `${API_BASE_URL}/api/users-app/profile/me/`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setCurrentUser(profileRes.data);
      }

      // ✅ Fetch user's posts
      const postsRes = await axios.get(
        `${API_BASE_URL}/api/posts-app/posts/my-posts/`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          params: { page },
        }
      );

      let postsData = postsRes.data;

      // ✅ Normalize response to always have { results, next, previous }
      if (Array.isArray(postsData)) {
        postsData = { results: postsData, next: null, previous: null };
      }

      // ✅ If there are posts, fetch their like statuses
      if (postsData.results && postsData.results.length > 0) {
        const postSlugs = postsData.results.map((post) => post.slug);
        let likeStatuses = {};

        try {
          const likeStatusRes = await axios.post(
            `${API_BASE_URL}/api/posts-app/posts/like-statuses/`,
            { post_slugs: postSlugs },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          likeStatuses = likeStatusRes.data;
        } catch (likeError) {
          console.error("Could not fetch like statuses.", likeError);
        }

        // ✅ Merge like statuses into posts
        const postsWithLikes = postsData.results.map((post) => ({
          ...post,
          is_liked_by_user: likeStatuses[post.slug] || false,
        }));

        postsData = { ...postsData, results: postsWithLikes };
      }

      setPostsResponse(postsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch your posts.");
    } finally {
      setLoading(false);
    }
  }, [page, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          {/* ---------- MAIN CONTENT ---------- */}
          <main className="md:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-purple-600">
                All Your Posts, All in One Place
              </h1>
            </div>

            {loading && (
              <p className="text-center text-gray-500 py-10">
                Loading your posts...
              </p>
            )}
            {error && (
              <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {!loading && !error && (
              <>
                <div className="space-y-6">
                  {postsResponse.results.length > 0 ? (
                    postsResponse.results.map((post) => (
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
                      <p className="text-gray-500">
                        You haven't created any posts yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination (optional future support) */}
                {postsResponse.next || postsResponse.previous ? (
                  <div className="flex justify-center mt-8 space-x-4">
                    <Button
                      disabled={!postsResponse.previous}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={!postsResponse.next}
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </main>

          {/* ---------- SIDEBAR ---------- */}
          <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">
              <ProfileSidebarCard currentUser={currentUser} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

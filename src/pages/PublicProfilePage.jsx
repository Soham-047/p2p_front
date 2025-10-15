import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "@/components/communityComponents/PostCard";
import ProfileSidebarCard from "@/components/profileComponent/ProfileSidebarCard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default function PublicProfilePage() {
  const { username } = useParams();
  const [postsResponse, setPostsResponse] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const authToken = getCookie("token");

    if (!authToken) {
      setError("Please log in to view profiles.");
      setLoading(false);
      return;
    }

    try {
      // ✅ Fetch logged-in user (for ownership and like info)
      if (!currentUser) {
        const meRes = await axios.get(
          `${API_BASE_URL}/api/users-app/profile/me/`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setCurrentUser(meRes.data);
      }

      // ✅ Fetch profile data of the viewed user
      const profileRes = await axios.get(
        `${API_BASE_URL}/api/users-app/profile/${username}/`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setProfileData(profileRes.data);

      // ✅ Fetch user's posts (returns plain array)
      const postsRes = await axios.get(
        `${API_BASE_URL}/api/posts-app/posts/${username}/posts/`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      let postsData = postsRes.data;

      // Normalize in case it’s an array
      if (Array.isArray(postsData)) {
        if (postsData.length > 0) {
          const postSlugs = postsData.map((post) => post.slug);
          let likeStatuses = {};

          // ✅ Fetch like statuses
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

          // ✅ Attach like info
          postsData = postsData.map((post) => ({
            ...post,
            is_liked_by_user: likeStatuses[post.slug] || false,
          }));
        }
      }

      setPostsResponse(postsData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(`Failed to fetch profile for ${username}.`);
    } finally {
      setLoading(false);
    }
  }, [username, currentUser]);

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
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData
                  ? `${profileData.full_name || username}'s Posts`
                  : "Loading Posts..."}
              </h1>
            </div>

            {loading && (
              <p className="text-center text-gray-500 py-10">
                Loading profile and posts...
              </p>
            )}
            {error && (
              <p className="text-center text-red-500 py-10">{error}</p>
            )}

            {!loading && !error && (
              <>
                <div className="space-y-6">
                  {postsResponse.length > 0 ? (
                    postsResponse.map((post) => (
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
                        {username} hasn’t created any posts yet.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </main>

          {/* ---------- SIDEBAR (PROFILE CARD) ---------- */}
          <aside className="hidden md:block">
            <div className="sticky top-8 space-y-6">
              {profileData && <ProfileSidebarCard currentUser={profileData} />}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

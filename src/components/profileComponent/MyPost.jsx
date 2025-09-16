import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Aapka banaya hua PostCard component
import PostCard from '../communityComponents/PostCard'; // Path sahi karein agar zaroorat ho

// VITE_API_BASE_URL .env file se aayega
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Token get karne ke liye helper function
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const MyPost = ({ currentUser, currentUserAvatar }) => {
  // Posts data, loading status, aur error ko store karne ke liye state
  const [postsData, setPostsData] = useState({ count: 0, results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const authToken = getCookie("token");
      if (!authToken) {
        setError("Please log in to see your posts.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/posts-app/posts/my-posts/`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            params: {
              page: 1, // Profile par preview ke liye sirf pehla page fetch karein
            },
          }
        );
        setPostsData(response.data);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []); // [] ka matlab yeh effect component ke mount hone par ek baar chalega

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Top section: Count aur View All button */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Your Posts</h3>
          {loading ? (
             <div className="h-14 w-12 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="text-5xl font-bold text-purple-600">{postsData.count}</p>
          )}
        </div>
        <Link 
          to="/my-all-posts" // Yahan apne sabhi posts ke page ka route daalein
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      
    </div>
  );
};

export default MyPost;
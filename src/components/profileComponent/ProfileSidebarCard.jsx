import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Helper: get initials from full name
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

const ProfileSidebarCard = ({ currentUser }) => {
  // 🌀 Loading / null state
  if (!currentUser) {
    return (
      <div className="bg-white p-6 rounded-xl shadow animate-pulse">
        <div className="h-24 bg-gray-200 rounded-t-xl"></div>
        <div className="h-16 w-16 mx-auto rounded-full bg-gray-300 -mt-8 border-4 border-white"></div>
        <div className="h-6 w-3/4 mx-auto mt-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 mx-auto mt-2 bg-gray-200 rounded"></div>
        <div className="h-10 w-full mt-6 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  // 🧩 Fallbacks for missing images
  const bannerUrl = currentUser.banner_img_url || "https://via.placeholder.com/600x150?text=Profile+Banner";
  const avatarUrl =
    currentUser.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.full_name || "User")}&background=random`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
      {/* Banner Image */}
      <img
        src={bannerUrl}
        alt="Profile background"
        className="w-full h-28 object-cover bg-gray-100"
      />

      {/* Avatar */}
      <div className="relative -mt-12">
        <div className="w-20 h-20 mx-auto rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600">
          {currentUser.avatar_url ? (
            <img
              src={avatarUrl}
              alt={currentUser.full_name || "User avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(currentUser.full_name)
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">
          {currentUser.full_name || "Unnamed User"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {currentUser.headline || "No headline provided"}
        </p>

        {/* View Profile Button */}
        <Link to="/profile" className="mt-6 block">
          <Button className="w-full bg-[#9810FA] text-white hover:bg-[#7b0cc7]">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebarCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Assuming you use ShadCN UI

// Helper to get initials from a name
const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "U";

const ProfileSidebarCard = ({ currentUser }) => {
  // Show a loading state if user data hasn't arrived yet
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

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden text-center">
      {/* Background Image/Thumbnail */}
      <img 
        src={currentUser.banner_img_url}
        alt="Profile background"
        className="w-full h-28 object-cover"
      />
      
      {/* Avatar */}
      <div className="relative -mt-12">
        <img
          src={currentUser.avatar_url}
          alt={currentUser.full_name}
          className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
        />
      </div>

      {/* User Info */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{currentUser.full_name}</h2>
        <p className="text-sm text-gray-500 mt-1">{currentUser.headline}</p>

        {/* View Profile Button that links to /profile */}
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
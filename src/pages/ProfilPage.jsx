import UserProfilePage from "@/components/profileComponent/ProfilePage";
import SocialLinks from "@/components/profileComponent/SocialLinks";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import  MyPost  from "../components/profileComponent/MyPost";
import { useEffect,useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Token get karne ke liye helper function
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


export default function ProfilePage() {

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = getCookie("token");
      if (!authToken) return;

      try {
        // Ab sirf ek hi API call karni hai
        const profileRes = await axios.get(`${API_BASE_URL}/api/users-app/profile/me/`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        // User ka data set karein
        setCurrentUser(profileRes.data);
        
        // Aur avatar ka URL seedhe response se set karein
        // NOTE: Agar backend se field ka naam alag hai (jaise 'avatar'), to yahan change karein
        if (profileRes.data.avatar_url) {
          setCurrentUserAvatar(profileRes.data.avatar_url);
        }

      } catch (error) {
        console.error("User data fetch karne mein error:", error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Content */}
      <div className="flex-1 md:p-6">
        <UserProfilePage />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-96 p-1 pt-9">

        <div className="space-y-6 top-6">
          <MyPost 
            currentUser={currentUser}
            currentUserAvatar={currentUserAvatar} 
          />
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

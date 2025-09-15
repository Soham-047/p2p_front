import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProfileHeader from "./ProfileHeader";
import SummarySection from "./SummarySection";
import WorkExperience from "./WorkExperience";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import AchievementsSection from "./AchievementsSection";


export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.get("/api/users-app/profile/me/");
        
        // Handle API response - it might be response.data or response itself
        let profileData = response.data || response;
        
        console.log("Profile API Response:", response);
        console.log("Profile Data:", profileData);
        
        // Ensure all arrays exist to prevent crashes
        const safeProfile = {
          ...profileData,
          experiences: profileData.experiences || [],
          educations: profileData.educations || [],
          skills: profileData.skills || [],
          projects: profileData.projects || [],
          certificates: profileData.certificates || [],
          social_links: profileData.social_links || [],
          about: profileData.about || ""
        };
        
        setProfile(safeProfile);
        
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError("Failed to load profile. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update profile state from child components
  const handleProfileUpdate = (updatedProfile) => {
    console.log("Profile update received:", updatedProfile);
    setProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-center text-gray-600">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <ProfileHeader profile={profile} onProfileUpdate={handleProfileUpdate} />
      
      <SummarySection about={profile.about} />
      
      <WorkExperience
        experiences={profile.experiences}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
      
      <EducationSection 
  educations={profile.educations} 
  profile={profile}
  onProfileUpdate={handleProfileUpdate}
/>
      <SkillsSection skills={profile.skills} profile={profile} onProfileUpdate={handleProfileUpdate}/>
      <ProjectsSection projects={profile.projects} profile={profile} onProfileUpdate={handleProfileUpdate} />
      <AchievementsSection certificates={profile.certificates} profile={profile} onProfileUpdate={handleProfileUpdate} />
    </div>
  );
}
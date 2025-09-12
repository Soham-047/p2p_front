import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProfileHeader from "./ProfileHeader";
import SummarySection from "./SummarySection";
import WorkExperience from "./WorkExperience";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import AchievementsSection from "./AchievementsSection";
import SocialLinks from "./SocialLinks";

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/api/users-app/profile/me/") // ✅ fixed (no double /api)
      .then(setProfile)
      .catch(console.error);
  }, []);

  // when profile is updated from EditProfileForm
  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (!profile) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <ProfileHeader profile={profile} onProfileUpdate={handleProfileUpdate} />
      <SummarySection about={profile.about} />
      <WorkExperience experiences={profile.experiences} />
      <EducationSection educations={profile.educations} />
      <SkillsSection skills={profile.skills} />
      <ProjectsSection projects={profile.projects} />
      <AchievementsSection certificates={profile.certificates} />
      <SocialLinks links={profile.social_links} />
    </div>
  );
}

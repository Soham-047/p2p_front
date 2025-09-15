import UserProfilePage from "@/components/profileComponent/ProfilePage";
import SocialLinks from "@/components/profileComponent/SocialLinks";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Content */}
      <div className="flex-1 md:p-6">
        <UserProfilePage />
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-96 p-1 pt-9">
        <div className="space-y-6 top-6">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

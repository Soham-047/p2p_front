import ProfileSettings from "../components/profileComponent/ProfileSeeting"
import ProfileSidebar from "../components/profileComponent/ProfileSidebar"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Profile Settings */}
      <div className="flex-1 p-6">
        <ProfileSettings />
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-2 pt-4  bg-white">
        <ProfileSidebar />
      </div>
    </div>
  )
}

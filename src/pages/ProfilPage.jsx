import ProfileSettings from "../components/profileComponent/ProfileSeeting"
import ProfileSidebar from "../components/profileComponent/ProfileSidebar"
import UserProfilePage from "@/components/profileComponent/ProfilePage"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Profile Settings */}
      <div className="flex-1 md:p-6">
        <UserProfilePage/>
      </div>

     
    </div>
  )
}

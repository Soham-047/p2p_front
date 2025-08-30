import { useState } from "react";
import StatsCards from "@/components/dashboardComponent/StatsCards";
import RecentPosts from "@/components/dashboardComponent/RecentPost";
import ProfileCard from "@/components/dashboardComponent/ProfileCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Dashboard() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon for small screens */}
      <div className="absolute right-0 top-0 md:hidden ">
        <button onClick={() => setProfileOpen(true)}>
          <Avatar className="h-10 w-10 border-2 border-purple-500 ">
            <AvatarImage src="/user.jpg" alt="Profile" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </button>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Middle Section */}
        <div className="lg:col-span-3 space-y-6">
          <StatsCards />
          <RecentPosts />
        </div>

        {/* Right Section for large screens */}
        <div className="lg:col-span-1 hidden md:block">
          <ProfileCard />
        </div>
      </div>

      {/* Popup Dialog for small screens */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-sm p-0 overflow-hidden bg-white ">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-lg font-semibold text-center">
              Profile
            </DialogTitle>
          </DialogHeader>
          <ProfileCard />
        </DialogContent>
      </Dialog>
    </div>
  );
}

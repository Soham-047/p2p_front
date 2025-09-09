
import StatsCards from "@/components/dashboardComponent/StatsCards";
import RecentPosts from "@/components/dashboardComponent/RecentPost";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SearchBar from "@/components/dashboardComponent/SearchBar";

export default function Dashboard() {
 

  return (
    <div className="relative  ">
    
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:flex   gap-6">
        {/* Middle Section */}
        <div className="lg:w-4/6 space-y-6">
          <StatsCards />
          <RecentPosts />
        </div>

        {/* Right Section for large screens */}
        <div className="lg:w-2/6 hidden md:block">
          <SearchBar/>
        </div>
      </div>

     
    </div>
  );
}

import CommunityFeed from "@/components/communityComponents/CommunityFeed";
import CommunityRightSidebar from "@/components/communityComponents/RightSidebar";

export default function CommunityPage() {
  return (
    <div className="grid grid-cols-1 md:flex gap-6">
      {/* Middle Section (Feed) */}
      <div className="lg:w-4/6 space-y-6">
        <CommunityFeed />
      </div>

      {/* Right Section (Sidebar) */}
      <div className="lg:w-2/6 hidden md:block">
        <CommunityRightSidebar />
      </div>
    </div>
  );
}

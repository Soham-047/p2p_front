import CommunityFeed from "@/components/communityComponents/CommunityFeed";
import CommunityRightSidebar from "@/components/communityComponents/RightSidebar";

export default function CommunityPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {/* Middle Section (Feed) */}
      <div className="lg:col-span-3">
        <CommunityFeed />
      </div>

      {/* Right Section (Sidebar) */}
      <div className="lg:col-span-1">
        <CommunityRightSidebar />
      </div>
    </div>
  );
}

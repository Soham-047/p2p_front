import StatsCards from "@/components/dashboardComponent/StatsCards";
import RecentPosts from "@/components/dashboardComponent/RecentPost";
import SearchBar from "@/components/dashboardComponent/SearchBar";

export default function Dashboard({ onMessageClick }) {
  // Handle message click from search results
  const handleMessageFromSearch = (userInfo) => {
    // Pass the user info up to the parent component
    if (onMessageClick) {
      onMessageClick(userInfo);
    }
  };

  return (
    <div className="relative">
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:flex gap-6">
        {/* Middle Section */}
        <div className="lg:w-4/6 space-y-6">
          <StatsCards />
          <RecentPosts />
        </div>

        {/* Right Section for large screens */}
        <div className="lg:w-2/6 hidden md:block">
          <SearchBar onMessageClick={handleMessageFromSearch} />
        </div>
      </div>
    </div>
  );
}
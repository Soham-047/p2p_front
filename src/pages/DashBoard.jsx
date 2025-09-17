// import StatsCards from "@/components/dashboardComponent/StatsCards";
// import RecentPosts from "@/components/dashboardComponent/RecentPost";
// import SearchBar from "@/components/dashboardComponent/SearchBar";

// export default function Dashboard({ onMessageClick }) {
//   // Handle message click from search results
//   const handleMessageFromSearch = (userInfo) => {
//     // Pass the user info up to the parent component
//     if (onMessageClick) {
//       onMessageClick(userInfo);
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Grid layout */}
//       <div className="grid grid-cols-1 md:flex gap-6">
//         {/* Middle Section */}
//         <div className="lg:w-4/6 space-y-6">
//           <StatsCards />
//           <RecentPosts />
//         </div>

//         {/* Right Section for large screens */}
//         <div className="lg:w-2/6 hidden md:block">
//           <SearchBar onMessageClick={handleMessageFromSearch} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Search, X } from "lucide-react"; // ✅ import icons
import StatsCards from "@/components/dashboardComponent/StatsCards";
import RecentPosts from "@/components/dashboardComponent/RecentPost";
import SearchBar from "@/components/dashboardComponent/SearchBar";

export default function Dashboard({ onMessageClick }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleMessageFromSearch = (userInfo) => {
    if (onMessageClick) {
      onMessageClick(userInfo);
    }
  };

  return (
    <div className="relative">
      {/* Top bar for small screens */}
      <div className="flex justify-end items-center md:hidden px-4">
        <button
          onClick={() => setShowMobileSearch(true)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Search className="w-6 h-6 text-gray-700" /> {/* ✅ search icon */}
        </button>
      </div>

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

      {/* Mobile Search Popup */}
      {showMobileSearch && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="w-full h-[70vh] bg-white shadow-lg rounded-b-2xl animate-slide-down">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Search</h3>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <X className="w-6 h-6 text-gray-700" /> {/* ✅ close icon */}
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
              <SearchBar onMessageClick={handleMessageFromSearch} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

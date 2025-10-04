import React from "react";

export default function Help() {
  return (
    <div className=" md:p-20 flex flex-col items-center justify-center   p-10">
      {/* Animated icon */}
      <div className="mb-6 animate-bounce">
        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      {/* Text content */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-600 text-center drop-shadow-sm">
        Coming Soon 🚀
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 text-center max-w-xl">
        Our Help Center is being crafted with care to assist you better. Stay
        tuned — it’s on the way!
      </p>

      {/* Email / notify section */}
    

      {/* Footer note */}
      <p className="mt-8 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Help Center — Coming Soon 💙
      </p>
    </div>
  );
}

import React from "react";

export default function Setting() {
  return (
    <div className="flex flex-col items-center justify-center p-10 md:p-20">
      {/* Animated Icon */}
      <div className="mb-8 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-12 h-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317a1.5 1.5 0 012.35 0l.867 1.11a1.5 1.5 0 001.38.56l1.393-.172a1.5 1.5 0 011.638 1.638l-.172 1.393a1.5 1.5 0 00.56 1.38l1.11.867a1.5 1.5 0 010 2.35l-1.11.867a1.5 1.5 0 00-.56 1.38l.172 1.393a1.5 1.5 0 01-1.638 1.638l-1.393-.172a1.5 1.5 0 00-1.38.56l-.867 1.11a1.5 1.5 0 01-2.35 0l-.867-1.11a1.5 1.5 0 00-1.38-.56l-1.393.172a1.5 1.5 0 01-1.638-1.638l.172-1.393a1.5 1.5 0 00-.56-1.38l-1.11-.867a1.5 1.5 0 010-2.35l1.11-.867a1.5 1.5 0 00.56-1.38l-.172-1.393a1.5 1.5 0 011.638-1.638l1.393.172a1.5 1.5 0 001.38-.56l.867-1.11z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-sm">
        Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-lg md:text-xl text-gray-600 text-center max-w-xl">
        Your settings dashboard is getting a major upgrade!  
        Sleeker, faster, and more powerful — launching soon 🚀
      </p>

   

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Settings Page — Coming Soon ✨
      </p>
    </div>
  );
}




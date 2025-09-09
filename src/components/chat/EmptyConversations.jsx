export default function EmptyConversations({ onSearch }) {
    return (
      <div className="flex flex-col items-center justify-center bg-white  text-center m-5 p-6 w-full border-2 border-gray-200  shadow-sm rounded-lg">
        <h2 className="text-5xl font-semibold mb-4">
          Initiate a great conversation just <br /> before asking for referrals
        </h2>
        <img
          src="https://res.cloudinary.com/dlcsttupm/image/upload/v1757238460/Graduation_2_h3qc2a.png" // ✅ replace with your graduation illustration
          alt="Graduation Celebration"
          className="w-[600px] h-[600px] mb-6 "
        />
        <button
          onClick={onSearch}
          className="px-6 py-2 text-black text-xl rounded-full hover:bg-gray-200 transition border-2 border-gray-400"
        >
          Search your Conversations →
        </button>
      </div>
    );
  }
  
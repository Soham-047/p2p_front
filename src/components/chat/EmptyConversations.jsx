export default function EmptyConversations({ onSearch }) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Initiate a great conversation just <br /> before asking for referrals
        </h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3079/3079179.png" // ✅ replace with your graduation illustration
          alt="Graduation Celebration"
          className="w-64 mb-6"
        />
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          Search your Conversations →
        </button>
      </div>
    );
  }
  
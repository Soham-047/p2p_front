import { useState, useEffect, useCallback } from "react";

export default function SearchConversations({ onSelectUser }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Define API call
  const fetchUsers = useCallback(
    async (searchTerm) => {
      try {
        setLoading(true);

        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token =
          parts.length === 2 ? parts.pop().split(";").shift() : null;

        if (!token) return;

        const res = await fetch(
          `${API_BASE_URL}/api/posts-app/users/search?search=${encodeURIComponent(
            searchTerm
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to search users:", res.status);
          setResults([]);
          return;
        }

        const data = await res.json();
        setResults(data || []);
      } catch (err) {
        console.error("Error searching users:", err);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // ✅ Debounce effect: call API only after user stops typing for 300ms
  useEffect(() => {
    if (query.length <= 2) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      fetchUsers(query);
    }, 300);

    return () => clearTimeout(handler); // cleanup if user types again
  }, [query, fetchUsers]);

  return (
    <div className="flex flex-col items-center justify-center bg-white  text-center m-5 p-6 w-full border-2 border-gray-200  shadow-sm rounded-lg">
      <h2 className="text-5xl font-semibold mb-6">Search Conversations</h2>
      <div className="w-full max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or username..."
          className="w-full border border-gray-500 bg-gray-100 rounded-full px-4 py-2 h-12 text-gray-700"
        />

        {loading && (
          <div className="mt-2 text-sm text-gray-500">Searching...</div>
        )}

        {results.length > 0 && (
          <div className="mt-2 bg-gray-100 rounded-lg shadow">
            {results.map((user) => (
              <div
                key={user.username}
                onClick={() =>
                  onSelectUser({
                    username: user.username,
                    fullName: user.full_name,
                  })
                }
                className="p-2 cursor-pointer hover:bg-gray-200 flex flex-col justify-start items-start border-b border-gray-300 last:border-0"
              >
                <span className="font-medium text-gray-700">{user.full_name}</span>
               
              </div>
            ))}
          </div>
        )}

        {!loading && query.length > 2 && results.length === 0 && (
          <div className="mt-2 text-sm text-gray-500">No users found</div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function SearchConversations({ onSelectUser }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      // ✅ Replace with your API later
      setResults([
        `${value} aru`,
        `${value} kaluex`,
        `${value} ritik`,
        `${value} Pinak`,
      ]);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6">Search Conversations</h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-full border rounded-full px-4 py-2"
        />
        {results.length > 0 && (
          <div className="mt-2 bg-gray-100 rounded-lg shadow">
            {results.map((name, idx) => (
              <div
                key={idx}
                onClick={() => onSelectUser(name)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

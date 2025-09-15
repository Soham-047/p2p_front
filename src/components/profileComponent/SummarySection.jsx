import { useState } from "react";

export default function SummarySection({ about }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 200; // character limit before truncating

  if (!about) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="text-gray-700">No summary yet.</p>
      </div>
    );
  }

  const isLong = about.length > limit;
  const displayText = expanded ? about : about.slice(0, limit);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-2">Summary</h3>
      
      <p className="text-gray-700">
        {displayText}
        {isLong && !expanded && "... "}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-500 hover:underline text-sm inline"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
}

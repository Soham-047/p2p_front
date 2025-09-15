// import { useState } from "react";
// import { cn } from "@/lib/utils";

// export default function MessageBubble({ text, sender, time, senderName }) {
//   const [expanded, setExpanded] = useState(false);

//   // Limit before showing "View more"
//   const CHAR_LIMIT = 150; // adjust as needed

//   const isLong = text?.length > CHAR_LIMIT;
//   const displayText =
//     expanded || !isLong ? text : text.slice(0, CHAR_LIMIT) + "…";

//   return (
//     <div
//       className={cn(
//         "flex flex-col pt-4",
//         sender === "me"
//           ? "ml-auto items-end px-3 sm:px-5"
//           : "mr-auto items-start px-3 sm:px-5"
//       )}
//     >
//       {/* Sender label */}
//       {sender === "other" && (
//         <span className="text-sm text-gray-500 mb-1">{senderName}</span>
//       )}
//       {sender === "me" && (
//         <span className="text-sm text-indigo-500 mb-1">Me</span>
//       )}

//       {/* Bubble */}
//       <div
//         className={cn(
//           "px-4 py-2 rounded-2xl text-lg shadow-sm whitespace-pre-wrap break-words",
//           "max-w-[85%] sm:max-w-md", // ✅ fixed width for small + large
//           sender === "me"
//             ? "bg-indigo-100 text-indigo-900"
//             : "bg-gray-100 text-gray-900"
//         )}
//       >
//         {displayText || "⚠️ (empty)"}
//         {isLong && (
//           <button
//             onClick={() => setExpanded((prev) => !prev)}
//             className="ml-2 text-xs text-indigo-600 hover:underline"
//           >
//             {expanded ? "View less" : "View more"}
//           </button>
//         )}
//       </div>

//       {/* Time */}
//       <span className="text-[11px] text-gray-400 mt-1">{time}</span>
//     </div>
//   );
// }

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MessageBubble({ text, sender, time, senderName }) {
  const [expanded, setExpanded] = useState(false);

  const CHAR_LIMIT = 150;
  const isLong = text?.length > CHAR_LIMIT;
  const displayText =
    expanded || !isLong ? text : text.slice(0, CHAR_LIMIT) + "…";

  return (
    <div
      className={cn(
        "flex flex-col pt-4",
        sender === "me"
          ? "ml-auto items-end px-3 sm:px-5"
          : "mr-auto items-start px-3 sm:px-5"
      )}
    >
      {/* Sender label */}
      {sender === "other" && (
        <span className="text-sm text-gray-500 mb-1">{senderName}</span>
      )}
      {sender === "me" && (
        <span className="text-sm text-indigo-500 mb-1">Me</span>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "px-4 py-2 rounded-2xl text-lg shadow-sm whitespace-pre-wrap break-words overflow-hidden",
          "max-w-[85%] sm:max-w-md", // fixed width
          sender === "me"
            ? "bg-indigo-100 text-indigo-900"
            : "bg-gray-100 text-gray-900"
        )}
        style={{
          wordBreak: "break-word", // ensure long words break
        }}
      >
        {displayText || "⚠️ (empty)"}
        {isLong && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="ml-2 text-xs text-indigo-600 hover:underline"
          >
            {expanded ? "View less" : "View more"}
          </button>
        )}
      </div>

      {/* Time */}
      <span className="text-[11px] text-gray-400 mt-1">{time}</span>
    </div>
  );
}

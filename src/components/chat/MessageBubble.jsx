import { cn } from "@/lib/utils";

export default function MessageBubble({ text, sender, time, senderName }) {
  return (
    <div
      className={cn(
        "flex flex-col max-w-xs pt-4",
        sender === "me" ? "ml-auto items-end px-5" : "mr-auto items-start px-5"
      )}
    >
      {/* Show name only for "other" */}
      {sender === "other" && (
        <span className="text-sm text-gray-500 mb-1">{senderName}</span>
      )}
      {sender === "me" && (
        <span className="text-sm text-indigo-500 mb-1">Me</span>
      )}

      <div
        className={cn(
          "px-4 py-2 rounded-2xl text-lg shadow-sm",
          sender === "me"
            ? "bg-indigo-100 text-indigo-900"
            : "bg-gray-100 text-gray-900"
        )}
      >
        {text || "⚠️ (empty)"}
      </div>
      <span className="text-[11px] text-gray-400 mt-1">{time}</span>
    </div>
  );
}

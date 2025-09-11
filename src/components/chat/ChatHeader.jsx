import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ onBack, username, fullName, isOnline }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 border-b border-b-gray-200">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden mr-1"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt={fullName || username} />
          <AvatarFallback>
            {(fullName || username)?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          <h2 className="font-semibold text-gray-900 text-sm md:text-base">
            {fullName || username}
          </h2>
          {/* ✅ Show status */}
          <p className="text-xs text-gray-500 flex items-center gap-1">
  {isOnline && (
    <>
      <span className="w-2 h-2 rounded-full bg-green-600"></span>
      Online
    </>
  )}
</p>

        </div>
      </div>

      <Button size="icon" variant="ghost">
        <MoreVertical className="w-5 h-5 text-gray-600 font-bold" />
      </Button>
    </div>
  );
}

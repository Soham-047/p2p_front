import { ArrowLeft, MoreHorizontal, User, BarChart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ onBack }) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
      {/* Left section: back button + user info */}
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
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="profile" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>

        <div className="leading-tight">
          <h2 className="font-semibold text-gray-900 text-sm md:text-base">
            Soham Raj Chopra
          </h2>
          <p className="text-xs text-gray-500 truncate">
            Software Engineer @Google
          </p>
        </div>
      </div>

      {/* Right section: action buttons */}
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-100">
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-100">
          <User className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full hover:bg-gray-100">
          <BarChart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

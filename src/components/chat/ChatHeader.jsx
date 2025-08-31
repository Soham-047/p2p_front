import { ArrowLeft, MoreHorizontal, User, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatHeader({ onBack }) {
  return (
    <div className="flex items-center justify-between p-5 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        {/* Back button only visible on mobile */}
        {onBack && (
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden mr-2"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}

        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="profile" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Soham Raj Chopra</h2>
          <p className="text-xs text-gray-500">Software Engineer @Google</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" className="rounded-full">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full">
          <User className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full">
          <BarChart className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

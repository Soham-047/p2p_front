import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User, BarChart } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-5  shadow-sm bg-white">
      {/* Left side: user info */}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="profile" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">Soham Raj Chopra</h2>
          <p className="text-xs text-gray-500">Software Engineer @Google</p>
        </div>
      </div>

      {/* Right side: actions */}
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

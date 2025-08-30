import { Card } from "@/components/ui/card";
import { User, MessageSquare, Share2 } from "lucide-react";

export default function ProfileCard() {
  return (
    <Card className="p-4 text-center shadow-none border-none">
      <img
        src="/user.jpg"
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto mb-3"
      />
      <h3 className="font-semibold">Mahendra Seervi</h3>
      <p className="text-sm text-gray-500">
        Computer Science Engineer | Full-Stack Developer
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <User className="h-5 w-5 text-purple-600" />
        <MessageSquare className="h-5 w-5 text-purple-600" />
        <Share2 className="h-5 w-5 text-purple-600" />
      </div>
    </Card>
  );
}

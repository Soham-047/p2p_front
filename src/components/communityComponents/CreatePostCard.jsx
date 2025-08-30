import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip } from "lucide-react";

export default function CreatePostCard() {
  const [postText, setPostText] = useState("");

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow p-4">
      <div className="flex gap-4 items-start">
        {/* LEFT SIDE - Post As */}
        <div className="w-1/3">
          <p className="text-sm font-medium mb-2">Post As</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/mahendra.jpg" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Mahendra Seervi</p>
              <p className="text-sm text-gray-500">kalux@gmail.com</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Textarea + Button */}
        <div className="flex-1">
        <Textarea
  placeholder="Okay, let’s do a video chat today"
  value={postText}
  onChange={(e) => setPostText(e.target.value)}
  className="mb-3
    rounded-lg
    !border-0
    !outline-none
    !ring-0
    focus:!outline-none
    focus:!ring-0
    focus:!border-0
    focus:!shadow-none
    !shadow-none
    px-4 py-3
    !text-lg
    md:!text-xl
    placeholder:text-gray-800 placeholder:text-lg
    bg-gray-50
    h-24
    resize-none
    overflow-y-auto
    whitespace-pre-wrap
    break-all               /* ✅ force break inside long words */
  "
/>



          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 flex gap-2"
            >
              <Paperclip size={16} />
            </Button>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

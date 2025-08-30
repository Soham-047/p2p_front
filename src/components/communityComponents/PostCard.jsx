import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal } from "lucide-react";

export default function PostCard({ post }) {
  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.avatar} />
              <AvatarFallback>{post.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.name}</p>
              <p className="text-sm text-gray-500">
                {post.role} • {post.time}
              </p>
            </div>
          </div>
          <MoreHorizontal className="text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{post.content}</p>
        <Separator className="mb-3" />
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>👍 Like</span>
          <span>💬 {post.comments} Comments</span>
          <span>↗ Share</span>
        </div>
      </CardContent>
    </Card>
  );
}


import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MoreVertical, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function RecentPosts() {
  const posts = [
    {
      name: "Ritik Kumar Sen",
      role: "Alumni",
      time: "3 hours ago",
      content:
        "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
      likes: 356,
      comments: 63,
    },
    {
      name: "Soham Raj Chopra",
      role: "Alumni",
      time: "3 hours ago",
      content:
        "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
      likes: 356,
      comments: 63,
    },
    {
      name: "Mahendra Seervi",
      role: "Alumni",
      time: "3 hours ago",
      content:
        "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it...",
      likes: 356,
      comments: 63,
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <button className="text-sm text-purple-600 hover:underline">View All →</button>
      </div>
      {posts.map((post, i) => (
        <Card key={i} className="mb-4 border border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="flex justify-between">
            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-xs text-gray-500">
                {post.role} • {post.time}
              </p>
            </div>
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-gray-700">{post.content}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" /> {post.comments} Comments
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" /> Share
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

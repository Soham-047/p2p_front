import SearchBarWithFilter from "./SearchBarWithFilter";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";

export default function CommunityFeed() {
  const posts = [
    {
      id: 1,
      name: "Ritik Kumar Sen",
      role: "Alumni",
      time: "3 hours ago",
      content:
        "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it! Happy to share insights with anyone interested in full-stack development.",
      likes: 356,
      comments: 63,
      avatar: "/avatars/ritik.jpg",
    },
    {
      id: 2,
      name: "Ritik Kumar Sen",
      role: "Alumni",
      time: "3 hours ago",
      content:
        "Just finished an amazing project using React and Node.js. The learning curve was steep, but the results were worth it! Happy to share insights with anyone interested in full-stack development.",
      likes: 356,
      comments: 63,
      avatar: "/avatars/ritik.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <SearchBarWithFilter />
      <CreatePostCard />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

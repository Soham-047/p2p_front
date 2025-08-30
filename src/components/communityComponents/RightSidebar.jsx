import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function CommunityRightSidebar() {
  const topics = ["Job", "Experience", "Layoffs"];

  const favorites = [
    { name: "Soham Raj Chopra", desc: "Software Engineer @Google", avatar: "/avatars/soham.jpg" },
    { name: "Roshan Singh", desc: "SDE Intern @Infosys", avatar: "/avatars/roshan.jpg" },
    { name: "Aru Gupta", desc: "Batch of 2026", avatar: "/avatars/aru.jpg" },
    { name: "Anil Meena", desc: "Batch of 2026", avatar: "/avatars/anil.jpg" },
    { name: "Rawat Harsh", desc: "ML Engineer @MuSigma", avatar: "/avatars/rawat.jpg" },
  ];

  return (
    <div className="space-y-4">
      {/* Topics */}
      <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
        <p className="font-medium mb-2">Topics you’ve searched for</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </Card>

      {/* Favorites */}
      <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
        <p className="font-medium mb-4">Catch Up With Your Favorites</p>
        <div className="flex flex-col gap-3">
          {favorites.map((fav, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={fav.avatar} />
                  <AvatarFallback>{fav.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{fav.name}</p>
                  <p className="text-xs text-gray-500">{fav.desc}</p>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                ↗
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import React from "react"
import { Card, CardContent } from "@/components/ui/card"

// Dummy posts
const posts = [
  {
    id: 1,
    title: "Just finished an amazing project using React and Node.js!",
    time: "2 months ago",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 2,
    title: "Just finished an amazing project using React and Node.js!",
    time: "2 months ago",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
]

// Dummy people
const people = [
  { id: 1, name: "Soham Raj Chopra", username: "@soham" },
  { id: 2, name: "Rishan Singh", username: "@rishan" },
  { id: 3, name: "Aru Gupta", username: "@aru" },
]

export default function ProfileSidebar() {
  return (
    <div className="space-y-6 ">
      {/* Your Posts */}
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-4 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Your Posts</h2>
              <p className="text-3xl font-bold text-purple-700">{posts.length}</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 border rounded-full text-sm hover:bg-gray-100">
              View All →
            </button>
          </div>

          {/* Posts list */}
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex gap-3 items-start p-2 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={post.avatar}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-xs text-gray-500">Posted {post.time}</p>
                  <p className="text-sm text-gray-700">{post.title}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connect with new People */}
      <Card className="shadow-md border border-gray-200">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold">Connect with new People</h2>
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{person.name}</p>
                <p className="text-sm text-gray-500">{person.username}</p>
              </div>
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                +
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { Card } from "@/components/ui/card"
import { MessageSquare, FileText, GitMerge } from "lucide-react"
import { useUser } from "@/hooks/useUser"   // 👈 your custom hook

export default function StatsSection() {
  const { user } = useUser()   // 👈 get user from context

  

  return (
    <div className="space-y-6">
      {/* Top Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Hello,{" "}
            <span className="text-purple-700 font-bold">
              {user?.username  } {/* 👈 dynamic username */}
            </span>
          </h1>
          <p className="text-gray-500 text-sm">
            Track your progress, access resources, manage tasks, and get insights
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">🔔</div>
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">📅</div>
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 cursor-pointer">👤</div>
        </div>
      </div>

      {/* Stats Cards
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="p-6 flex flex-col items-start gap-2 border border-gray-200 hover:shadow-md transition-shadow"
          >
            {stat.icon}
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-gray-500 text-sm">{stat.label}</span>
          </Card>
        ))}
      </div> */}
    </div>
  )
}

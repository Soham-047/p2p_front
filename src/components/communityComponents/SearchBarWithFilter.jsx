import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function SearchBarWithFilter() {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search users and their posts"
          className="pl-9 rounded-full bg-gray-200 border-0 ring-0 focus:ring-0 focus:outline-none"
        />
      </div>
      <Button variant="outline" className="flex gap-2 rounded-full">
        <Filter size={16} /> Filters
      </Button>
    </div>
  );
}

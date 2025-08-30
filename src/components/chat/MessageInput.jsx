import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Smile } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="shadow-sm bg-gray-50 p-3 flex flex-col gap-2 rounded-lg">
      {/* Input Box */}
      <Input
  placeholder="Okay Let’s do a video chat today"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSend()}
  className="
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
      !text-lg           /* force bigger text */
    md:!text-xl        /* force even bigger on larger screens */
    placeholder:text-gray-800 placeholder:text-lg
    bg-gray-50 
    h-15
  "
/>




      {/* Bottom row: icons + send button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Mic className="w-5 h-5 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
        </div>

        <Button
          onClick={handleSend}
          className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          Send
        </Button>
      </div>
    </div>
  );
}

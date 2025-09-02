import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    setShowEmoji(false);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative shadow-sm bg-gray-50 p-3 flex flex-col gap-2 rounded-lg">
      {/* Input Box */}
      <Input
        placeholder="Type a message..."
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
          !text-lg
          md:!text-xl
          placeholder:text-gray-800 placeholder:text-lg
          bg-gray-50 
          h-15
        "
      />

      {/* Bottom row: icons + send button */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Mic className="w-5 h-5 text-gray-500" />
          </Button>
          {/* Emoji Button */}
          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => setShowEmoji((prev) => !prev)}
            >
              <Smile className="w-5 h-5 text-gray-500" />
            </Button>
            {showEmoji && (
              <div
                ref={emojiRef}
                className="absolute bottom-12 left-0 z-50 shadow-lg"
              >
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme="light"
                  searchDisabled
                  skinTonesDisabled
                />
              </div>
            )}
          </div>
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

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Smile, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function MessageInput({ onSend }) {
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploads, setUploads] = useState([]); // {file, url, progress}
  const emojiRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (!input.trim() && uploads.length === 0) return;

    let message = input.trim();

    const uploadedUrls = uploads
      .filter((u) => u.progress === 100 && u.url)
      .map((u) => u.url);

    if (uploadedUrls.length > 0) {
      if (message) message += "\n";
      message += uploadedUrls.join(", ");
    }

    if (!message) return;

    onSend(message);
    setInput("");
    setUploads([]);
    setShowEmoji(false);
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newUploads = files.map((file) => ({
      file,
      url: null,
      progress: 0,
    }));
    setUploads((prev) => [...prev, ...newUploads]);

    files.forEach(async (file) => {
      try {
        const url = await uploadToCloudinary(file, (progress) => {
          setUploads((prev) =>
            prev.map((u) =>
              u.file === file ? { ...u, progress } : u
            )
          );
        });

        setUploads((prev) =>
          prev.map((u) =>
            u.file === file ? { ...u, url, progress: 100 } : u
          )
        );
      } catch (error) {
        console.error("Upload failed:", error);
      }
    });

    e.target.value = "";
  };

  const removeFile = (file) => {
    setUploads((prev) => prev.filter((u) => u.file !== file));
  };

  const allUploaded =
    uploads.length === 0 || uploads.every((u) => u.progress === 100);

  return (
    <div className="relative shadow-sm bg-gray-50 p-3 flex flex-col gap-3 rounded-lg">
      {/* Upload Previews FIRST */}
      {uploads.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {uploads.map((u, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center"
            >
              {u.file.type.startsWith("image") ? (
                <img
                  src={u.url || URL.createObjectURL(u.file)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <video
                  src={u.url || URL.createObjectURL(u.file)}
                  className="object-cover w-full h-full"
                />
              )}

              {u.progress < 100 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
                  {u.progress}%
                </div>
              )}

              <button
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full"
                onClick={() => removeFile(u.file)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      <Input
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="
          rounded-lg !border-0 !outline-none !ring-0
          focus:!outline-none focus:!ring-0 focus:!border-0 focus:!shadow-none
          !shadow-none
          px-4 py-3 
          !text-lg md:!text-xl
          placeholder:text-gray-800 placeholder:text-lg
          bg-gray-50 
          h-15
        "
      />

      {/* Bottom row */}
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          {/* File Upload */}
          <div>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => fileInputRef.current.click()}
            >
              <Paperclip className="w-5 h-5 text-gray-500" />
            </Button>
          </div>

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
          disabled={!allUploaded}
          className="rounded-full px-6 bg-gradient-to-r from-indigo-500 to-purple-500"
        >
          {allUploaded ? "Send" : "Uploading..."}
        </Button>
      </div>
    </div>
  );
}

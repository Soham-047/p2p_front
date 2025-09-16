import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Textarea } from "@/components/ui/textarea";

export default function EditProfileForm({ profile, onClose, onProfileUpdate }) {
  const [form, setForm] = useState({
    headline: profile.headline || "",
    avatar_url: profile.avatar_url || "",
    banner_img_url: profile.banner_img_url || "",
    full_name: profile.full_name || "",
    location: profile.location || "",
    about: profile.about || "",
  });

  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        if (file.size > 1024 * 1024) {
          alert("File size must be less than 1MB");
          return;
        }
        const url = await uploadToCloudinary(file);
        setForm((prev) => ({ ...prev, [field]: url }));
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const removeImage = (field) => {
    setForm((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wordCount = form.about.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 200) {
      alert(`About is ${wordCount} words. Maximum is 200.`);
      return;
    }

    setLoading(true);
    try {
      const updated = await api.patch("/api/users-app/profile/me/", form);
      onProfileUpdate(updated);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-[70vh]">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pr-1">
        {/* Banner */}
        <div className="relative w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
          {form.banner_img_url ? (
            <div className="relative w-full h-full">
              <img
                src={form.banner_img_url}
                alt="Banner"
                className="w-full h-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage("banner_img_url")}
                className="absolute top-2 right-2 bg-white rounded-full shadow p-1"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="text-gray-500 cursor-pointer">
              Add banner
              <Input
                type="file"
                accept="image/*"
               className=" hidden border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => handleFileUpload(e, "banner_img_url")}
                
              />
            </label>
          )}
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            {form.avatar_url ? (
              <img
                src={form.avatar_url}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200" />
            )}
            {form.avatar_url && (
              <button
                type="button"
                onClick={() => removeImage("avatar_url")}
                className="absolute -top-2 -right-2 bg-white rounded-full shadow p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="file"
              accept="image/*"
              id="avatarInput"
             className=" hidden border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => handleFileUpload(e, "avatar_url")}
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-4 py-1"
              onClick={() => document.getElementById("avatarInput").click()}
            >
              Change Photo
            </Button>
            <span className="text-xs text-gray-500 mt-1">
              JPG, GIF or PNG. 1MB max.
            </span>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label>Full Name</label>
          <Input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-2">
          <label>Headline</label>
          <Input
            name="headline"
            value={form.headline}
            onChange={handleChange}
            className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <label>Location</label>
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* About */}
        {/* About */}
<div className="flex flex-col gap-2">
  <label>About</label>

  <Textarea
    name="about"
    value={form.about}
    onChange={(e) => {
      const { value } = e.target;
      const words = value.trim().split(/\s+/);
      if (words.length > 200) return; // stop input beyond 200 words
      handleChange(e);
    }}
    rows={5}
    placeholder="Write something about yourself (max 200 words)"
    className="w-full min-h-[96px] max-h-[160px] resize-none p-2 border rounded 
               whitespace-pre-wrap break-words break-all overflow-y-auto border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
  />
  

  <div className="flex justify-between text-xs text-gray-500 mt-1">
    <span>
      {form.about.trim().split(/\s+/).filter(Boolean).length}/200 words
    </span>
    {form.about.trim().split(/\s+/).filter(Boolean).length >= 200 && (
      <span className="text-red-500">Word limit reached</span>
    )}
  </div>
</div>

      </div>

      {/* Sticky Footer */}
      <div className="flex justify-between  pt-4 px-4 bg-white">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleClose}
        >
          Delete
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-purple-600 text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
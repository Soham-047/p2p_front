import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { api } from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function EditProfileForm({ profile, onClose, onProfileUpdate }) {
  const [form, setForm] = useState({
    headline: profile.headline || "",
    avatar_url: profile.avatar_url || "",
    banner_img_url: profile.banner_img_url || "",
    full_name: profile.full_name || "",
    location: profile.location || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // limit 1MB file size
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
              className="hidden"
              onChange={(e) => handleFileUpload(e, "banner_img_url")}
            />
          </label>
        )}
      </div>

      {/* Avatar + Change Photo */}
     {/* Avatar + Change Photo */}
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

  {/* File input ref */}
  <div className="flex flex-col">
    <input
      type="file"
      accept="image/*"
      id="avatarInput"
      className="hidden"
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


     

<div className="flex flex-col gap-2">
        <label>Full Name</label>
        <Input
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
        />
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-2">
        <label>Headline</label>
        <Input
          name="headline"
          value={form.headline}
          onChange={handleChange}
        />
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <label>Location</label>
        <Input
          name="location"
          value={form.location}
          onChange={handleChange}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={onClose}
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

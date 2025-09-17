import { useState } from "react";
import { MapPin } from "react-feather";
import { Button } from "@/components/ui/button";
import { Edit } from "react-feather";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "./EditProfileForm";

export default function ProfileHeader({ profile, onProfileUpdate }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">
      {/* Banner */}
      <div className="relative h-48 sm:h-64">
        {profile.banner_img_url ? (
          <img
            src={profile.banner_img_url}
            alt="Profile Banner"
            className="w-full h-full object-fit"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600" />
        )}

        {/* Avatar */}
        <div className="absolute left-6 -bottom-16 border-4 border-white rounded-full shadow-lg">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {getInitials(profile.full_name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Info + Buttons */}
      <div className="pt-20 px-6 pb-6">
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
    {/* Profile Info + Edit (mobile) */}
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{profile.full_name}</h2>

        {/* Edit button (mobile only) */}
        <div className="sm:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-gray-400 ml-2"
              >
                <Edit size={18} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <EditProfileForm
                profile={profile}
                onClose={() => setOpen(false)}
                onProfileUpdate={onProfileUpdate}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <p className="text-blue-600 font-medium">{profile.headline}</p>
      {profile.location && (
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin size={14} />
          {profile.location}
        </p>
      )}
    </div>

    {/* Buttons (desktop only, right-aligned) */}
    <div className="hidden sm:flex gap-2 mb-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-gray-400"
          >
            <Edit size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <EditProfileForm
            profile={profile}
            onClose={() => setOpen(false)}
            onProfileUpdate={onProfileUpdate}
          />
        </DialogContent>
      </Dialog>
    </div>
  </div>
</div>

    </div>
  );
}

// initials helper
function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
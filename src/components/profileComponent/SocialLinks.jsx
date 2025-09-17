import { useState, useEffect } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Globe,
  Trash2,
  Pencil,
} from "lucide-react";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Platforms
const platforms = [
  { name: "github", label: "Github", icon: Github },
  { name: "linkedin", label: "LinkedIn", icon: Linkedin },
  { name: "leetcode", label: "LeetCode", icon: Globe },
  { name: "codeforces", label: "Codeforces", icon: Globe },
  { name: "portfolio", label: "Portfolio", icon: Globe },
  { name: "instagram", label: "Instagram", icon: Instagram },
  { name: "twitter", label: "Twitter", icon: Twitter },
];

export default function SocialLinks() {
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editLinks, setEditLinks] = useState({});
  const [isloading, setIsLoading] = useState(false);
  // Fetch links from API
  useEffect(() => {
    async function fetchLinks() {
      try {
        
        const res = await api.get(`/api/users-app/profile/me/social-links/`);
        const data = res?.results || [];
        const map = {};
        data.forEach((l) => {
          if (!l?.platform) return;
          const normalized = l.platform.trim().toLowerCase();
          if (!map[normalized]) map[normalized] = [];
          map[normalized].push({ id: l.id, url: l.url });
        });
        setLinks(map);
        
      } catch (err) {
        console.error("Failed to fetch social links:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const openUrl = (url) => {
    if (url) window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
  };

  const handleEditOpen = () => {
    // Prepare editLinks state with first URL for each platform or empty string
    const initialEdit = {};
    platforms.forEach(({ name }) => {
      initialEdit[name] = links[name]?.[0]?.url || "";
    });
    setEditLinks(initialEdit);
    setOpen(true);
  };

  const handleChange = (platform, value) => {
    setEditLinks((prev) => ({ ...prev, [platform]: value }));
  };

  const handleSaveAll = async () => {
    try {
      setIsLoading(true);
      for (const platform of platforms) {
        const url = editLinks[platform.name]?.trim();
        const existing = links[platform.name]?.[0];
        if (!url && existing?.id) {
          // Delete if url is cleared
          await api.delete(`/api/users-app/profile/me/social-links/${existing.id}/`);
          setLinks((prev) => {
            const updated = { ...prev };
            delete updated[platform.name];
            return updated;
          });
        } else if (url) {
          if (existing?.id) {
            const res = await api.patch(
              `/api/users-app/profile/me/social-links/${existing.id}/`,
              { url }
            );
            const updated = res.data || { ...existing, url };
            setLinks((prev) => ({
              ...prev,
              [platform.name]: [{ id: updated.id || existing.id, url: updated.url || url }],
            }));
          } else {
            const res = await api.post(`/api/users-app/profile/me/social-links/`, {
              platform: platform.label,
              url,
            });
            const created = res.data || {};
            setLinks((prev) => ({
              ...prev,
              [platform.name]: [{ id: created.id || Date.now(), url: created.url || url }],
            }));
          }
        }
      }
      setIsLoading(false);
      setOpen(false);
    } catch (err) {
      console.error("Failed to save social links:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">My Social Links</h3>
        {/* Single top-right edit button */}
        <button
          onClick={handleEditOpen}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Pencil className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <ul className="space-y-3">
        {platforms.map(({ name, label, icon: Icon }) => {
          const platformData = links[name] || [];
          const isActive = platformData.length > 0;

          return (
            <li
              key={name}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                isActive
                  ? "bg-purple-50 hover:bg-purple-100 text-gray-900"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-500"
              }`}
              onClick={() => platformData[0] && openUrl(platformData[0].url)}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-purple-600" : "text-gray-400"}`} />
              <span className="font-medium">{label}</span>
            </li>
          );
        })}
      </ul>

      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white max-w-md w-[95%]">
          <DialogHeader>
            <DialogTitle>Edit Social Links</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {platforms.map(({ name, label }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <Input
                  type="url"
                  placeholder={`Enter ${label} URL`}
                  value={editLinks[name] || ""}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex flex-row justify-between mt-4">
  <div>
  <button variant="outline" onClick={() => setOpen(false)}>
    Cancel
  </button>
  </div>

  <div>
  <button onClick={handleSaveAll} disabled={isloading}>
  {isloading ? "Saving..." : "Save"}
  </button>
  </div>
</DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
}
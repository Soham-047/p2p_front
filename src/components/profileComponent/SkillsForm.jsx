import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function SkillDialog({ skill, onSaved, children }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", level: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form whenever dialog opens
  useEffect(() => {
    if (open) {
      setForm({
        name: skill?.name || "",
        level: skill?.level || "",
      });
      setError("");
    }
  }, [open, skill]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.level) {
      setError("Both fields are required");
      return;
    }

    setLoading(true);
    try {
      let res;
      if (skill?.id) {
        // Update existing
        res = await api.patch(
          `/api/users-app/profile/me/skills/${skill.id}/`,
          form
        );
      } else {
        // Create new
        res = await api.post(`/api/users-app/profile/me/skills/`, form);
      }

      const payload = res?.data ?? res;

      if (payload) {
        onSaved(payload); // pass skill back to parent
      }

      setOpen(false);
    } catch (err) {
      console.error("Failed to save skill:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          {/* Skill Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. React.js"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              autoFocus
            />
          </div>

          {/* Level */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="level">Level</Label>
            <Select
              value={form.level}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, level: value }))
              }
              disabled={loading}
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

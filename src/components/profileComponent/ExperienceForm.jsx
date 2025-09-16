import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function ExperienceForm({ exp, onClose, onSave }) {
  const isEdit = !!exp?.id;
  const [form, setForm] = useState({
    title: exp?.title || "",
    company: exp?.company || "",
    location: exp?.location || "",
    start_date: exp?.start_date || "",
    end_date: exp?.end_date || "",
    description: exp?.description || "",
  });
  const [loading, setLoading] = useState(false);

  

  const wordLimit = 200; // ✅ limit 200 words

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      // count words
      const words = value.trim().split(/\s+/);
      if (words.length > wordLimit) return; // stop typing if limit exceeded
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isEdit) {
        response = await api.patch(
          `/api/users-app/profile/me/experiences/${exp.id}/`,
          form
        );
      } else {
        response = await api.post(
          `/api/users-app/profile/me/experiences/`,
          form
        );
      }

      const saved = response.data || response;
      onSave(saved, isEdit);
      onClose();
    } catch (error) {
      console.error("Failed to save experience:", error);
      alert("Failed to save experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role */}
          <div className="flex flex-col gap-2">
            <Label>Role</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
              className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2">
            <Label>Company</Label>
            <Input
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="e.g. Google"
              className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-2">
            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. New York, NY"
              className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                required
                className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>End Date</Label>
              <Input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                placeholder="Leave empty if current"
                className="border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>

            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full min-h-[96px] max-h-[160px] resize-none p-2 border rounded 
                         whitespace-pre-wrap break-words break-all overflow-y-auto border-1  border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{wordCount}/{wordLimit} words</span>
              {wordCount >= wordLimit && (
                <span className="text-red-500">Word limit reached</span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update" : "Add Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";

export default function ProjectsDialog({ open, setOpen, project, onSaved }) {
  const initialForm = { title: "", description: "", link: "" };
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form when editing or opening
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        link: project.link || "",
      });
    } else {
      setForm(initialForm);
    }
    setError("");
  }, [project, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  const handleSave = async () => {
    const trimmedForm = {
      title: form.title.trim(),
      description: form.description.trim(),
      link: form.link.trim(),
    };

    if (!trimmedForm.title || !trimmedForm.description) {
      setError("Title and Description are required");
      return;
    }

    setLoading(true);
    try {
      const res = project?.id
        ? await api.patch(
            `/api/users-app/profile/me/projects/${project.id}/`,
            trimmedForm
          )
        : await api.post(`/api/users-app/profile/me/projects/`, trimmedForm);

      if (res?.data) {
        onSaved(res.data);
        setForm(initialForm);
        setOpen(false);
      }
    } catch (err) {
      console.error("Failed to save project:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setError("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the project..."
              rows={4}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Link</Label>
            <Input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

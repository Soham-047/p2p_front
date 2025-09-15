// src/components/profileComponent/EducationDialog.jsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PenLine} from "lucide-react";
import { api } from "@/lib/api";

export default function EducationDialog({ education, onSaved,}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wordLimit = 200;
  const initialForm = {
    school: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    description: "",
    currently_studying: false,
  };

  const [form, setForm] = useState(initialForm);

  // when dialog opens, populate form with `education` (edit) or reset (add)
  useEffect(() => {
    if (open) {
      setForm(education || initialForm);
    } else {
      // clear form on close to avoid stale values
      setForm(initialForm);
    }
  }, [open, education]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const handleSave = async () => {
    try {
      setLoading(true);
      let res;
      if (education?.id) {
        // edit
        res = await api.patch(`/api/users-app/profile/me/education/${education.id}/`, form);
      } else {
        // create
        res = await api.post(`/api/users-app/profile/me/education/`, form);
      }

      const payload = res?.data ?? res;
      console.debug("Education API response:", payload);

      // Normalize and call onSaved with either:
      // - saved object (education)
      // - an array of educations
      // - or a full profile object that includes educations
      if (Array.isArray(payload)) {
        onSaved(payload);
      } else if (payload?.educations && Array.isArray(payload.educations)) {
        onSaved(payload.educations);
      } else if (payload?.id) {
        onSaved(payload);
      } else if (payload?.education) {
        // sometimes APIs return { education: {...} }
        onSaved(payload.education);
      } else {
        // fallback: pass the payload as-is (parent will have to handle)
        onSaved(payload);
      }

      setOpen(false);
    } catch (err) {
      console.error("Failed to save education", err);
      // optionally show toast or set error state
    } finally {
      setLoading(false);
    }
  };


  const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {education ? (
          <Button type="button" variant="outline" 
          size="icon"
          className="rounded-full border-gray-300 hover:bg-blue-50 text-blue-600"
>
           <PenLine className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" variant="default">
            + Add Education
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>{education ? "Edit Education" : "Add Education"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <Label>Institution Name</Label>
            <Input name="school" value={form.school} onChange={handleChange} placeholder="Ex: IIIT Bhagalpur" />
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex-col gap-2">
              <Label>Course</Label>
              <Input name="degree" value={form.degree} onChange={handleChange} placeholder="Bachelor of Technology" />
            </div>
            <div className="flex-1 flex-col gap-2">
              <Label>Field of Study</Label>
              <Input name="field_of_study" value={form.field_of_study} onChange={handleChange} placeholder="Computer Science" />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 flex-col gap-2">
              <Label>Start Year</Label>
              <Input type="number" name="start_year" value={form.start_year} onChange={handleChange} placeholder="2020" />
            </div>
            <div className="flex-1 flex-col gap-2">
              <Label>End Year</Label>
              <Input type="number" name="end_year" value={form.end_year} onChange={handleChange} disabled={form.currently_studying} placeholder="2024" />
            </div>
          </div>


          <div className="flex flex-col gap-2">
            <Label>Description</Label>

            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full min-h-[96px] max-h-[160px] resize-none p-2 border rounded 
                         whitespace-pre-wrap break-words break-all overflow-y-auto"
            />

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{wordCount}/{wordLimit} words</span>
              {wordCount >= wordLimit && (
                <span className="text-red-500">Word limit reached</span>
              )}
            </div>
          </div>
        </div>


        <div className="flex justify-between pt-4">
        

          <div className="flex justify-between w-full">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

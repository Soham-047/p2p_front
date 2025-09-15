import { useState, useEffect } from "react";
import ProjectsDialog from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { PenLine, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";

export default function ProjectsSection({ projects: initialProjects = [], profile, onProfileUpdate }) {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Keep local state in sync if parent updates
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleSaved = (savedProject) => {
    if (!savedProject) return;

    const updated = projects.some(p => p.id === savedProject.id)
      ? projects.map(p => (p.id === savedProject.id ? savedProject : p))
      : [...projects, savedProject];

    setProjects(updated); // ✅ update UI immediately
    onProfileUpdate({ ...profile, projects: updated });
    setEditing(null);
  };

  const handleDeleted = async (id) => {
    try {
      await api.delete(`/api/users-app/profile/me/projects/${id}/`);
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated); // ✅ update UI immediately
      onProfileUpdate({ ...profile, projects: updated });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => { setEditing(null); setOpen(true); }}
          className="rounded-full"
          title="Add Project"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {projects.length === 0 && <p className="text-gray-500">No projects yet.</p>}

      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="group flex justify-between items-center hover:shadow-sm pb-1 pl-2"
          >
            <div>
              <h4 className="font-bold">{p.title}</h4>
              <p>{p.description}</p>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Project
                </a>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => { setEditing(p); setOpen(true); }}
                className="rounded-full border-gray-300 hover:bg-blue-50 text-blue-600"
                title="Edit"
              >
                <PenLine className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleDeleted(p.id)}
                className="rounded-full border-gray-300 hover:bg-red-50 text-red-600"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <ProjectsDialog
        open={open}
        setOpen={setOpen}
        project={editing}
        onSaved={handleSaved}
      />
    </div>
  );
}

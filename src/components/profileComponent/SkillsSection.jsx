import { useState ,useEffect} from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import SkillDialog from "./SkillsForm"; // popup form for add/edit

export default function SkillsSection({ skills: initialSkills = [], profile, onProfileUpdate }) {
  const [skills, setSkills] = useState(initialSkills);
  const [showAll, setShowAll] = useState(false);

  // Keep local state in sync when parent updates (e.g. on reload/profile fetch)
  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const handleSaved = (saved) => {
    if (!saved) return;

    let updated = [];
    if (Array.isArray(saved)) {
      updated = saved;
    } else if (saved?.skills && Array.isArray(saved.skills)) {
      updated = saved.skills;
    } else {
      const newSkill = saved;
      updated = skills.some((s) => s.id === newSkill.id)
        ? skills.map((s) => (s.id === newSkill.id ? newSkill : s))
        : [...skills, newSkill];
    }

    setSkills(updated); // ✅ update local state immediately
    onProfileUpdate({ ...profile, skills: updated });
  };

  const handleDeleted = async (id) => {
    try {
      await api.delete(`/api/users-app/profile/me/skills/${id}/`);
      const updated = skills.filter((s) => s.id !== id);
      setSkills(updated); // ✅ update local state immediately
      onProfileUpdate({ ...profile, skills: updated });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const visibleSkills = showAll ? skills : skills.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <SkillDialog onSaved={handleSaved}>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </SkillDialog>
      </div>

      {skills.length === 0 && <p className="text-gray-500">No skills added.</p>}

      <ul className="space-y-2">
        {visibleSkills.map((s) => (
          <li
            key={s.id}
            className="group flex justify-between items-center hover:shadow-sm pb-1 pl-2"
          >
            <span className="text-sm text-gray-700">
              {s.name}{" "}
              {s.level && <span className="text-gray-400">({s.level})</span>}
            </span>
            <div className="flex gap-2 ">
              <SkillDialog skill={s} onSaved={handleSaved}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:bg-gray-50 rounded-full"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </SkillDialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleted(s.id)}
                className="text-red-600 hover:bg-red-50 rounded-full"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {skills.length > 3 && (
        <button
          className="mt-3 text-blue-600 font-semibold w-full text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less skills ↑" : `Show all ${skills.length} skills →`}
        </button>
      )}
    </div>
  );
}


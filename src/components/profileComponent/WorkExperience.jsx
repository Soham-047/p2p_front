import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import ExperienceForm from "./ExperienceForm";
import { PenLine, Trash2 } from "lucide-react";

export default function WorkExperience({ experiences = [], profile, onProfileUpdate }) {
  const [list, setList] = useState(experiences);
  const [editing, setEditing] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2); // show 2 by default

  // Sync local state when prop changes
  useEffect(() => {
    setList(experiences);
  }, [experiences]);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;

    try {
      await api.delete(`/api/users-app/profile/me/experiences/${id}/`);

      const newList = list.filter((exp) => exp.id !== id);
      setList(newList);

      const updatedProfile = { ...profile, experiences: newList };
      onProfileUpdate(updatedProfile);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete experience. Please try again.");
    }
  };

  const handleSave = (savedExp, isEdit) => {
    let newList;
    if (isEdit) {
      newList = list.map((e) => (e.id === savedExp.id ? savedExp : e));
    } else {
      newList = [...list, savedExp];
    }

    setList(newList);
    const updatedProfile = { ...profile, experiences: newList };
    onProfileUpdate(updatedProfile);
  };

  const handleClose = () => {
    setEditing(null);
  };

  // Show only up to visibleCount items
 // Show only up to visibleCount items (newest first)
const displayedList = [...list].reverse().slice(0, visibleCount);


  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Experience</h3>
        <Button size="sm" onClick={() => setEditing({})}>
          + Add Experience
        </Button>
      </div>

      {list.length === 0 && (
        <p className="text-gray-500 py-4">No experiences added yet.</p>
      )}

      <div className="space-y-4">
        {displayedList.map((exp) => (
          <div
            key={exp.id}
            className="hover:shadow-md border border-gray-200 p-4 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-bold text-lg">{exp.title}</h4>
                <p className="text-gray-600 font-medium">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {exp.start_date} - {exp.end_date || "Present"}
                </p>
                {exp.description && (
                  <DescriptionWithToggle text={exp.description} wordLimit={40} />
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditing(exp)}
                  className="rounded-full border-gray-300 hover:bg-blue-50 text-blue-600"
                  title="Edit"
                >
                  <PenLine className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => remove(exp.id)}
                  className="rounded-full border-gray-300 hover:bg-red-50 text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More / Less toggle */}
      {list.length > 2 && (
        <div className="mt-4 text-center">
          {visibleCount < list.length ? (
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => setVisibleCount((prev) => prev + 2)} // show 2 more
            >
              View More
            </button>
          ) : (
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => setVisibleCount(2)} // collapse back to 2
            >
              View Less
            </button>
          )}
        </div>
      )}

      {editing !== null && (
        <ExperienceForm exp={editing} onClose={handleClose} onSave={handleSave} />
      )}
    </div>
  );
}

// ✅ Helper component for description toggle
function DescriptionWithToggle({ text, wordLimit = 40 }) {
  const [expanded, setExpanded] = useState(false);
  const words = text.trim().split(/\s+/);
  const isLong = words.length > wordLimit;

  if (!isLong) {
    return <p className="text-gray-700 text-sm leading-relaxed">{text}</p>;
  }

  return (
    <div className="text-gray-700 text-sm leading-relaxed">
      {!expanded ? (
        <>
          {words.slice(0, wordLimit).join(" ")}...{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setExpanded(true)}
          >
            View More
          </button>
        </>
      ) : (
        <>
          {text}{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setExpanded(false)}
          >
            View Less
          </button>
        </>
      )}
    </div>
  );
}
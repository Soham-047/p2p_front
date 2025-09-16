// src/components/profileComponent/EducationSection.jsx
import { useState } from "react";
import { Trash2 } from "react-feather";
import EducationDialog from "./EducationForm";
import { api } from "@/lib/api"; // your API helper
import { Button } from "../ui/button";
export default function EducationSection({ educations = [], profile, onProfileUpdate }) {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [showAll, setShowAll] = useState(false);

  const handleSaved = (saved) => {
    if (!saved) return;

    if (Array.isArray(saved)) {
      onProfileUpdate({ ...profile, educations: saved });
      return;
    }

    if (saved?.educations && Array.isArray(saved.educations)) {
      onProfileUpdate({ ...profile, educations: saved.educations });
      return;
    }

    const newEdu = saved;
    const updated = educations.some((e) => e.id === newEdu.id)
      ? educations.map((e) => (e.id === newEdu.id ? newEdu : e))
      : [...educations, newEdu];

    onProfileUpdate({ ...profile, educations: updated });
  };

  const handleDeleted = async (education) => {
    if (!education?.id) return;

    const confirmed = window.confirm("Are you sure you want to delete this education?");
    if (!confirmed) return;

    try {
      // Call API from lib
      await api.delete(`/api/users-app/profile/me/education/${education.id}/`);

      // Update local state
      const updated = educations.filter((e) => e.id !== education.id);
      onProfileUpdate({ ...profile, educations: updated });
    } catch (error) {
      console.error("Failed to delete education:", error);
      alert("Failed to delete education. Please try again.");
    }
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const visibleEducations = showAll ? educations : educations.slice(0, 2);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Education</h3>
        <EducationDialog onSaved={handleSaved} />
      </div>

      {educations?.length === 0 && <p>No education records.</p>}

      <ul className="space-y-3">
        {visibleEducations.map((edu, idx) => {
          const isExpanded = expandedDescriptions[edu.id];
          const showToggle = edu.description?.length > 150;
          const displayedDescription = isExpanded
            ? edu.description
            : edu.description?.slice(0, 150);

          return (
            <li
              key={edu.id ?? `${idx}-${edu.school}`}
              className="hover:shadow-md border border-gray-200 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1 pr-4">
                <h4 className="font-bold">{edu.degree} in {edu.field_of_study}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">
                  {edu.start_year} - {edu.currently_studying ? "Present" : edu.end_year}
                </p>
                {edu.description && (
                  <p className="mt-1">
                    {displayedDescription}
                    {showToggle && (
                      <span
                        className="text-blue-600 cursor-pointer ml-1"
                        onClick={() => toggleDescription(edu.id)}
                      >
                        {isExpanded ? "View Less" : "...View More"}
                      </span>
                    )}
                  </p>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                <EducationDialog education={edu} onSaved={handleSaved}  />
                <Button
                  onClick={() => handleDeleted(edu)}
                   size="icon"
                  className="rounded-full border border-gray-300 hover:bg-red-50 text-red-600 "
                  title="Delete Education"
                >
                   <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      {educations.length > 2 && (
        <button
          className="mt-3 text-blue-600 font-semibold w-full justify-center"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "View More"}
        </button>
      )}
    </div>
  );
}
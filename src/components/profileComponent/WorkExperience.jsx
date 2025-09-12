"use client";
import { useState } from "react";
import { api } from "@/lib/api";

export default function WorkExperience({ experiences }) {
  const [list, setList] = useState(experiences || []);

  const remove = async (id) => {
    await api.delete(`/api/users-app/profile/me/experiences/${id}/`);
    setList(list.filter((exp) => exp.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Experience</h3>
      {list.length === 0 && <p>No experiences added.</p>}
      <ul className="space-y-4">
        {list.map((exp) => (
          <li key={exp.id} className="border p-3 rounded-lg flex justify-between">
            <div>
              <h4 className="font-bold">{exp.title}</h4>
              <p className="text-gray-600">{exp.company} • {exp.location}</p>
              <p className="text-sm text-gray-500">
                {exp.start_date} - {exp.end_date}
              </p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
            <button
              onClick={() => remove(exp.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

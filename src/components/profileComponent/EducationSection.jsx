export default function EducationSection({ educations }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {educations?.length === 0 && <p>No education records.</p>}
        <ul className="space-y-3">
          {educations?.map((edu) => (
            <li key={edu.id} className="border p-3 rounded-lg">
              <h4 className="font-bold">{edu.degree} in {edu.field_of_study}</h4>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-500">
                {edu.start_year} - {edu.end_year}
              </p>
              <p>{edu.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
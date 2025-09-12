export default function SkillsSection({ skills }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills?.map((s) => (
            <span key={s.id} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {s.name} ({s.level})
            </span>
          ))}
        </div>
      </div>
    );
  }
  
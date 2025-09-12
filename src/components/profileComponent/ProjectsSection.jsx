export default function ProjectsSection({ projects }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        {projects?.length === 0 && <p>No projects yet.</p>}
        <ul className="grid md:grid-cols-2 gap-4">
          {projects?.map((p) => (
            <li key={p.id} className="border rounded-lg p-4">
              <h4 className="font-bold">{p.title}</h4>
              <p>{p.description}</p>
              {p.link && (
                <a href={p.link} target="_blank" className="text-blue-500 hover:underline">
                  View Project
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
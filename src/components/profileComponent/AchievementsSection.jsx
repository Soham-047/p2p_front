export default function AchievementsSection({ certificates }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Certificates</h3>
        {certificates?.length === 0 && <p>No certificates.</p>}
        <ul className="space-y-3">
          {certificates?.map((c) => (
            <li key={c.id} className="border p-3 rounded-lg">
              <h4 className="font-bold">{c.name}</h4>
              <p className="text-gray-600">{c.issuer}</p>
              <p className="text-sm text-gray-500">
                Issued on {c.issue_date} | ID: {c.credential_id}
              </p>
              {c.credential_url && (
                <a href={c.credential_url} className="text-blue-500 hover:underline" target="_blank">
                  Verify
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
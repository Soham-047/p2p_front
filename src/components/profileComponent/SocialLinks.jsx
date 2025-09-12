export default function SocialLinks({ links }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Social Links</h3>
        {links?.length === 0 && <p>No social links added.</p>}
        <ul className="space-y-2">
          {links?.map((link) => (
            <li key={link.id}>
              <a href={link.url} target="_blank" className="text-blue-600 hover:underline">
                {link.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
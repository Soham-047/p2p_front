import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import CertificateDialog from "./CertificateForm";

export default function AchievementsSection({ certificates: initialCertificates = [], profile, onProfileUpdate }) {
  const [certificates, setCertificates] = useState(initialCertificates);

  useEffect(() => {
    setCertificates(initialCertificates);
  }, [initialCertificates]);

  const handleSaved = (saved) => {
    const updated = certificates.some((c) => c.id === saved.id)
      ? certificates.map((c) => (c.id === saved.id ? saved : c))
      : [...certificates, saved];

    setCertificates(updated);
    onProfileUpdate({ ...profile, certificates: updated });
  };

  const handleDeleted = async (id) => {
    try {
      await api.delete(`/api/users-app/profile/me/certificates/${id}/`);
      const updated = certificates.filter((c) => c.id !== id);
      setCertificates(updated);
      onProfileUpdate({ ...profile, certificates: updated });
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Certificates</h3>
        <CertificateDialog onSaved={handleSaved}>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </CertificateDialog>
      </div>

      {certificates?.length === 0 && <p>No certificates.</p>}
      <ul className="space-y-3">
        {certificates?.map((c) => (
          <li
            key={c.id}
            className="hover:shadow-md border border-gray-200 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h4 className="font-bold">{c.name}</h4>
              <p className="text-gray-600">{c.issuer}</p>
              <p className="text-sm text-gray-500">
                Issued on {c.issue_date} | ID: {c.credential_id}
              </p>
              {c.credential_url && (
                <a
                  href={c.credential_url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Verify
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <CertificateDialog certificate={c} onSaved={handleSaved}>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <Pencil className="h-4 w-4" />
                </Button>
              </CertificateDialog>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full text-red-600"
                onClick={() => handleDeleted(c.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
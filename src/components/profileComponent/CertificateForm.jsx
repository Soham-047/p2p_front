import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

export default function CertificateDialog({ children, certificate, onSaved }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    issue_date: "",
    credential_id: "",
    credential_url: "",
  });

  useEffect(() => {
    if (certificate) {
      setForm({
        name: certificate.name || "",
        issuer: certificate.issuer || "",
        issue_date: certificate.issue_date || "",
        credential_id: certificate.credential_id || "",
        credential_url: certificate.credential_url || "",
      });
    } else {
      setForm({
        name: "",
        issuer: "",
        issue_date: "",
        credential_id: "",
        credential_url: "",
      });
    }
  }, [certificate, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (certificate?.id) {
        res = await api.patch(
          `/api/users-app/profile/me/certificates/${certificate.id}/`,
          form
        );
      } else {
        res = await api.post(`/api/users-app/profile/me/certificates/`, form);
      }
      onSaved(res.data);
      setOpen(false);
    } catch (err) {
      console.error("Error saving certificate:", err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white rounded-xl p-6 w-[480px] -translate-x-1/2 -translate-y-1/2 shadow-xl">
          <Dialog.Title className="text-lg font-bold mb-4">
            {certificate ? "Edit Certificate" : "Add Certificate"}
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="name"
              placeholder="Certificate Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="issuer"
              placeholder="Issuer"
              value={form.issuer}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              name="issue_date"
              value={form.issue_date}
              onChange={handleChange}
              required
            />
            <Input
              name="credential_id"
              placeholder="Credential ID"
              value={form.credential_id}
              onChange={handleChange}
            />
            <Input
              name="credential_url"
              placeholder="Credential URL"
              value={form.credential_url}
              onChange={handleChange}
            />

            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}


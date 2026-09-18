import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/dasbor/pengaturan")({
  component: PengaturanPage,
});

function PengaturanPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [prefs, setPrefs] = useState({ email: true, event: true, job: false });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (current.length < 8) return setError("Masukkan kata sandi Anda saat ini.");
    if (next.length < 8) return setError("Kata sandi baru minimal 8 karakter.");
    if (next !== confirm) return setError("Konfirmasi kata sandi tidak cocok.");
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setCurrent("");
      setNext("");
      setConfirm("");
      toast.success("Kata sandi diperbarui");
    }, 700);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Pengaturan Akun</h1>

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ubah kata sandi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Kata sandi saat ini</Label>
              <Input
                id="current"
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new">Kata sandi baru</Label>
                <Input
                  id="new"
                  type="password"
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Ulangi kata sandi baru</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
            {error ? (
              <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Menyimpan..." : "Perbarui kata sandi"}
            </Button>
          </CardContent>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferensi notifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "email" as const, label: "Ringkasan email mingguan" },
            { key: "event" as const, label: "Pengingat event alumni" },
            { key: "job" as const, label: "Lowongan kerja sesuai bidang saya" },
          ].map((p) => (
            <div
              key={p.key}
              className="flex items-center justify-between rounded-md border border-border p-3"
            >
              <Label htmlFor={p.key} className="font-normal">
                {p.label}
              </Label>
              <Switch
                id={p.key}
                checked={prefs[p.key]}
                onCheckedChange={(v) => {
                  setPrefs((prev) => ({ ...prev, [p.key]: v }));
                  toast.success("Preferensi disimpan");
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

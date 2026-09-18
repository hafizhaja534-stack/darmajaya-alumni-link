import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CITIES, INDUSTRIES, PROVINCES, CURRENT_ALUMNI } from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const [saving, setSaving] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [form, setForm] = useState({
    job_title: "Backend Engineer",
    company_name: "Nusantara Tech Labs",
    industry: "Teknologi Informasi",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    linkedin: "https://linkedin.com/in/contoh-raka",
    bio: "Membangun layanan backend berskala nasional dan aktif menjadi mentor coding.",
  });
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.job_title.trim().length < 2) return setError("Posisi pekerjaan wajib diisi.");
    if (form.linkedin && !/^https?:\/\//.test(form.linkedin))
      return setError("Tautan LinkedIn harus diawali http:// atau https://");
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      toast.success("Profil diperbarui", { description: "Perubahan data Anda telah tersimpan." });
    }, 700);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Data akademik</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Nama lengkap</Label>
            <p className="text-sm font-medium text-foreground">{CURRENT_ALUMNI.full_name}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">NIM</Label>
            <p className="text-sm font-medium text-foreground">{CURRENT_ALUMNI.nim}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Program studi</Label>
            <p className="text-sm font-medium text-foreground">{CURRENT_ALUMNI.program}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Tahun lulus</Label>
            <p className="text-sm font-medium text-foreground">{CURRENT_ALUMNI.graduation_year}</p>
          </div>
          <p className="text-xs text-muted-foreground sm:col-span-2">
            Data akademik hanya dapat diubah oleh admin. Hubungi Pusat Karier bila ada kekeliruan.
          </p>
        </CardContent>
      </Card>

      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data pekerjaan &amp; kontak</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job">Posisi / jabatan</Label>
                <Input
                  id="job"
                  value={form.job_title}
                  onChange={(e) => set("job_title")(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Nama perusahaan</Label>
                <Input
                  id="company"
                  value={form.company_name}
                  onChange={(e) => set("company_name")(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Bidang industri</Label>
                <Select value={form.industry} onValueChange={set("industry")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih industri" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={form.linkedin}
                  onChange={(e) => set("linkedin")(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="space-y-2">
                <Label>Provinsi</Label>
                <Select value={form.province} onValueChange={set("province")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih provinsi" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kota</Label>
                <Select value={form.city} onValueChange={set("city")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kota" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Tentang saya</Label>
              <Textarea
                id="bio"
                rows={4}
                value={form.bio}
                onChange={(e) => set("bio")(e.target.value)}
                maxLength={400}
              />
              <p className="text-xs text-muted-foreground">{form.bio.length}/400 karakter</p>
            </div>

            <div className="flex items-center justify-between rounded-md border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Tampilkan di direktori publik</p>
                <p className="text-xs text-muted-foreground">
                  Bila dinonaktifkan, profil Anda hanya terlihat oleh admin.
                </p>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            {error ? (
              <p
                role="alert"
                className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Menyimpan..." : "Simpan perubahan"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

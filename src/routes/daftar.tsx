import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PROGRAMS } from "@/lib/mock-data";

export const Route = createFileRoute("/daftar")({
  head: () => ({
    meta: [
      { title: "Daftar Akun Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Buat akun alumni untuk bergabung di portal resmi alumni IIB Darmajaya.",
      },
      { property: "og:title", content: "Daftar — Darmajaya Alumni Connect" },
      {
        property: "og:description",
        content: "Registrasi alumni IIB Darmajaya.",
      },
    ],
  }),
  component: DaftarPage,
});

const YEARS = Array.from({ length: 30 }, (_, i) => 2026 - i);

function DaftarPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    nim: "",
    program: "",
    year: "",
    password: "",
    confirm: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (form.name.trim().length < 3) return setError("Nama lengkap minimal 3 karakter.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Format email tidak valid.");
    if (!/^\d{8,12}$/.test(form.nim)) return setError("NIM harus berupa 8-12 digit angka.");
    if (!form.program) return setError("Pilih program studi Anda.");
    if (!form.year) return setError("Pilih tahun lulus Anda.");
    if (form.password.length < 8) return setError("Kata sandi minimal 8 karakter.");
    if (form.password !== form.confirm) return setError("Konfirmasi kata sandi tidak cocok.");
    if (!agree) return setError("Anda harus menyetujui ketentuan penggunaan data.");

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Pendaftaran terkirim", {
        description: "Akun Anda menunggu verifikasi admin. Cek email untuk konfirmasi.",
      });
      navigate({ to: "/masuk" });
    }, 800);
  }

  return (
    <AuthLayout
      title="Buat akun baru"
      description="Lengkapi data berikut. Akun alumni akan diverifikasi admin sebelum aktif."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/masuk" className="font-semibold underline underline-offset-4">
            Masuk di sini
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="name">Nama lengkap</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Nama sesuai dokumen resmi"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email aktif</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="nama@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nim">NIM</Label>
          <Input
            id="nim"
            inputMode="numeric"
            value={form.nim}
            onChange={(e) => set("nim")(e.target.value)}
            placeholder="Contoh: 1611010045"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Program studi</Label>
            <Select value={form.program} onValueChange={set("program")}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih prodi" />
              </SelectTrigger>
              <SelectContent>
                {PROGRAMS.map((p) => (
                  <SelectItem key={p.id} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tahun lulus</Label>
            <Select value={form.year} onValueChange={set("year")}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => set("password")(e.target.value)}
              placeholder="Minimal 8 karakter"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Ulangi kata sandi</Label>
            <Input
              id="confirm"
              type="password"
              value={form.confirm}
              onChange={(e) => set("confirm")(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={(v) => setAgree(v === true)}
            className="mt-0.5"
          />
          <Label
            htmlFor="agree"
            className="text-xs leading-relaxed font-normal text-muted-foreground"
          >
            Saya menyatakan data yang diisi benar dan menyetujui penggunaan data untuk keperluan
            layanan alumni IIB Darmajaya.
          </Label>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Mengirim..." : "Daftar sekarang"}
        </Button>
      </form>
    </AuthLayout>
  );
}

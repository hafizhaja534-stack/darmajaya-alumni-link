import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/masuk")({
  head: () => ({
    meta: [
      { title: "Masuk Akun — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Masuk ke akun alumni, perusahaan, atau admin untuk mengakses layanan Darmajaya Alumni Connect.",
      },
      { property: "og:title", content: "Masuk — Darmajaya Alumni Connect" },
      {
        property: "og:description",
        content: "Akses direktori alumni, lowongan kerja, dan kartu alumni digital.",
      },
    ],
  }),
  component: MasukPage,
});

function MasukPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Berhasil masuk", { description: "Selamat datang kembali di portal alumni." });
      navigate({ to: "/dasbor" });
    }, 700);
  }

  return (
    <AuthLayout
      title="Masuk ke akun Anda"
      description="Gunakan email terdaftar untuk mengakses layanan alumni IIB Darmajaya."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/daftar" className="font-semibold underline underline-offset-4">
            Daftar sekarang
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Kata sandi</Label>
            <Link to="/lupa-sandi" className="text-xs font-medium text-primary hover:underline">
              Lupa kata sandi?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
          {loading ? "Memproses..." : "Masuk"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Data contoh: masuk dengan email apa pun untuk melihat dashboard alumni.
        </p>
      </form>
    </AuthLayout>
  );
}

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth-layout";
import { useAdminAuth } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/masuk")({
  head: () => ({
    meta: [
      { title: "Login Admin — Darmajaya Alumni Connect" },
      {
        name: "description",
        content: "Login panel administrator portal alumni IIB Darmajaya.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminMasukPage,
});

function AdminMasukPage() {
  const navigate = useNavigate();
  const { login, user } = useAdminAuth();
  const [email, setEmail] = useState("admin@darmajaya.ac.id");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate({ to: "/admin", replace: true });
    }
  }, [user, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || password.length < 6) {
      setError("Email dan kata sandi wajib diisi (min. 6 karakter).");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      toast.success("Login admin berhasil", {
        description: "Anda akan dialihkan ke Dashboard Admin.",
      });
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Login Administrator"
      description="Gunakan akun admin resmi untuk mengelola konten dan data portal alumni."
      footer={
        <p className="text-primary-foreground/80">
          <ShieldCheck className="mr-1 inline h-4 w-4 align-text-bottom" />
          Hanya administrator yang berwenang mengakses panel ini.
        </p>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email Admin</Label>
          <Input
            id="admin-email"
            type="email"
            autoComplete="username"
            placeholder="admin@darmajaya.ac.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admin-password">Kata Sandi</Label>
          <Input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            placeholder="Minimal 6 karakter"
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
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck className="h-4 w-4" />
          )}
          <span className="ml-2">{loading ? "Memproses..." : "Masuk sebagai Admin"}</span>
        </Button>

        <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Akun demo (ganti di backend):</p>
          <ul className="mt-1 space-y-0.5 list-disc list-inside">
            <li>admin@darmajaya.ac.id / admin123</li>
            <li>superadmin@darmajaya.ac.id / superdarmajaya2026</li>
          </ul>
        </div>
      </form>
    </AuthLayout>
  );
}

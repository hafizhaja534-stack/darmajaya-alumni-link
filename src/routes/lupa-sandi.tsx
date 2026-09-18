import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/lupa-sandi")({
  head: () => ({
    meta: [
      { title: "Lupa Kata Sandi — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Ajukan tautan pengaturan ulang kata sandi akun Darmajaya Alumni Connect melalui email terdaftar.",
      },
      { property: "og:title", content: "Lupa Kata Sandi — Darmajaya Alumni Connect" },
      {
        property: "og:description",
        content: "Kirim tautan pengaturan ulang kata sandi ke email terdaftar Anda.",
      },
    ],
  }),
  component: LupaSandiPage,
});

function LupaSandiPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Tautan dikirim", { description: "Periksa kotak masuk email Anda." });
    }, 700);
  }

  return (
    <AuthLayout
      title="Lupa kata sandi"
      description="Masukkan email terdaftar, kami akan mengirim tautan untuk membuat kata sandi baru."
      footer={
        <>
          Sudah ingat kata sandi?{" "}
          <Link to="/masuk" className="font-semibold underline underline-offset-4">
            Masuk di sini
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="space-y-4 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <p className="text-sm text-muted-foreground">
            Tautan pengaturan ulang telah dikirim ke{" "}
            <span className="font-medium text-foreground">{email}</span>. Tautan berlaku selama 60
            menit.
          </p>
          <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
            Kirim ulang
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email">Email terdaftar</Label>
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
            {loading ? "Mengirim..." : "Kirim tautan"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AlumniCard, EmptyState } from "@/components/entity-cards";
import { PageHeader, PublicLayout } from "@/components/public-layout";
import { Input } from "@/components/ui/input";
import { ALUMNI } from "@/lib/mock-data";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Direktori Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content: "Cari dan temukan alumni IIB Darmajaya berdasarkan nama dan program studi.",
      },
      { property: "og:title", content: "Direktori Alumni IIB Darmajaya" },
      {
        property: "og:description",
        content: "Jelajahi jaringan alumni Darmajaya.",
      },
    ],
  }),
  component: DirektoriAlumni,
});

function DirektoriAlumni() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALUMNI.filter((a) => a.is_public).filter(
      (a) => !q || a.full_name.toLowerCase().includes(q) || a.program.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Direktori"
        title="Direktori Alumni Darmajaya"
        description="Telusuri jejaring alumni dari seluruh program studi dan angkatan. Hanya alumni yang mengaktifkan tampilan publik yang muncul di sini."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama alumni atau program studi..."
              className="pl-9"
              aria-label="Cari alumni"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="Alumni tidak ditemukan"
            description="Coba ubah kata kunci pencarian Anda."
          />
        ) : (
          <div className="grid gap-5">
            {filtered.map((a) => (
              <AlumniCard key={a.id} alumni={a} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

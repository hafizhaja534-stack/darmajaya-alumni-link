import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/entity-cards";
import { PageHeader, PublicLayout } from "@/components/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { NEWS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/berita")({
  head: () => ({
    meta: [
      { title: "Berita Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Kabar prestasi, pengumuman kampus, dan kegiatan terbaru komunitas alumni IIB Darmajaya.",
      },
      { property: "og:title", content: "Berita Alumni IIB Darmajaya" },
      {
        property: "og:description",
        content: "Ikuti kabar terbaru dari komunitas alumni Darmajaya.",
      },
    ],
  }),
  component: BeritaPage,
});

function BeritaPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");

  const categories = useMemo(() => ["Semua", ...new Set(NEWS.map((n) => n.category))], []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS.filter(
      (n) =>
        (!q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)) &&
        (category === "Semua" || n.category === category),
    );
  }, [query, category]);

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Informasi"
        title="Berita Alumni"
        description="Kumpulan kabar, prestasi, dan pengumuman resmi seputar alumni IIB Darmajaya."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative min-w-64 flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berita..."
              className="pl-9"
              aria-label="Cari berita"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={c === category ? "default" : "outline"}
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <EmptyState
            title="Berita tidak ditemukan"
            description="Coba kata kunci lain atau pilih kategori yang berbeda."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((n) => (
              <Card key={n.id} className="card-hover overflow-hidden pt-0">
                <img
                  src={n.image_url}
                  alt={n.title}
                  loading="lazy"
                  width={900}
                  height={500}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="space-y-3">
                  <Badge variant="secondary">{n.category}</Badge>
                  <h2 className="text-lg leading-snug font-semibold text-foreground">{n.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {n.author} &middot; {formatDate(n.published_at)}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="px-0 text-primary hover:bg-transparent">
                        Baca Selengkapnya →
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{n.title}</DialogTitle>
                        <DialogDescription>
                          {n.author} &middot; {formatDate(n.published_at)} &middot; {n.category}
                        </DialogDescription>
                      </DialogHeader>
                      <img
                        src={n.image_url}
                        alt={n.title}
                        loading="lazy"
                        width={900}
                        height={400}
                        className="h-56 w-full rounded-lg object-cover"
                      />
                      <p className="text-sm leading-relaxed text-muted-foreground">{n.excerpt}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Naskah lengkap berita ini akan tampil otomatis ketika data berita sudah
                        terhubung ke basis data portal alumni.
                      </p>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

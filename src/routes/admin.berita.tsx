import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { NEWS, type NewsItem, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/berita")({
  component: AdminBeritaPage,
});

type NewsDraft = Omit<NewsItem, "id"> & { id?: number };

const CATEGORY_OPTIONS = ["Prestasi", "Pengumuman", "Layanan", "Kegiatan", "Umum"];

const EMPTY: NewsDraft = {
  slug: "",
  title: "",
  category: CATEGORY_OPTIONS[0]!,
  excerpt: "",
  image_url:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=70",
  author: "Admin Darmajaya",
  published_at: new Date().toISOString().slice(0, 10),
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function AdminBeritaPage() {
  const [data, setData] = useState<NewsItem[]>(NEWS);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<NewsDraft>({ ...EMPTY });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(
      (n) => !q || n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q),
    );
  }, [data, query]);

  function openAdd() {
    setDraft({ ...EMPTY });
    setOpen(true);
  }

  function openEdit(n: NewsItem) {
    setDraft({ ...n });
    setOpen(true);
  }

  function save() {
    if (!draft.title.trim()) {
      toast.error("Judul berita tidak boleh kosong");
      return;
    }
    const slug = draft.slug || slugify(draft.title);
    if (draft.id) {
      setData((prev) =>
        prev.map((n) => (n.id === draft.id ? ({ ...n, ...draft, slug } as NewsItem) : n)),
      );
      toast.success("Berita berhasil diperbarui");
    } else {
      const nextId = data.reduce((m, n) => Math.max(m, n.id), 0) + 1;
      setData((prev) => [{ id: nextId, ...draft, slug } as NewsItem, ...prev]);
      toast.success("Berita berhasil ditambahkan");
    }
    setOpen(false);
  }

  function remove(id: number) {
    setData((prev) => prev.filter((n) => n.id !== id));
    toast.success("Berita berhasil dihapus");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Berita</h1>
          <p className="text-sm text-muted-foreground">
            Tambah, edit, dan hapus konten berita portal alumni.
          </p>
        </div>
        <Button onClick={openAdd} className="gap-1.5">
          <Plus className="h-4 w-4" /> Tambah Berita
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Daftar Berita ({list.length})</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul / kategori..."
              className="pl-9"
              aria-label="Cari berita"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead className="w-32">Kategori</TableHead>
                <TableHead className="w-40">Author</TableHead>
                <TableHead className="w-40">Dipublikasi</TableHead>
                <TableHead className="w-36 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    Belum ada berita yang cocok.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((n) => (
                  <TableRow key={n.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <img
                          src={n.image_url}
                          alt=""
                          loading="lazy"
                          className="h-12 w-20 shrink-0 rounded-md object-cover"
                          width={80}
                          height={48}
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-medium text-foreground">
                            {n.title}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {n.excerpt}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{n.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{n.author}</TableCell>
                    <TableCell className="text-sm">{formatDate(n.published_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(n)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-destructive">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus berita?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Berita &ldquo;{n.title}&rdquo; akan dihapus permanen dari daftar
                                berita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => remove(n.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Edit Berita" : "Tambah Berita Baru"}</DialogTitle>
            <DialogDescription>
              Lengkapi detail berita berikut. Perubahan akan langsung disimpan ke daftar berita.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="news-title">Judul *</Label>
              <Input
                id="news-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft({ ...draft, title: e.target.value, slug: slugify(e.target.value) })
                }
                placeholder="Judul berita..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="news-category">Kategori</Label>
              <Select
                value={draft.category}
                onValueChange={(v) => setDraft({ ...draft, category: v })}
              >
                <SelectTrigger id="news-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="news-published">Tanggal Publikasi</Label>
              <Input
                id="news-published"
                type="date"
                value={draft.published_at}
                onChange={(e) => setDraft({ ...draft, published_at: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="news-author">Penulis</Label>
              <Input
                id="news-author"
                value={draft.author}
                onChange={(e) => setDraft({ ...draft, author: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="news-slug">Slug URL</Label>
              <Input
                id="news-slug"
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                placeholder="auto-generated"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="news-image">URL Gambar</Label>
              <Input
                id="news-image"
                value={draft.image_url}
                onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                placeholder="https://..."
              />
              {draft.image_url && (
                <img
                  src={draft.image_url}
                  alt=""
                  className="mt-2 h-40 w-full rounded-md object-cover"
                />
              )}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="news-excerpt">Isi / Ringkasan Berita</Label>
              <Textarea
                id="news-excerpt"
                rows={5}
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                placeholder="Isi atau ringkasan berita..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={save}>{draft.id ? "Simpan Perubahan" : "Publikasikan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

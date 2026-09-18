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
import {
  EVENTS,
  EVENT_MODE_LABEL,
  EVENT_TYPE_LABEL,
  type AlumniEvent,
  type EventMode,
  type EventType,
  formatDate,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/event")({
  component: AdminEventPage,
});

type EventDraft = Omit<AlumniEvent, "id"> & { id?: number };

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=70";

const EMPTY: EventDraft = {
  title: "",
  type: "other",
  mode: "offline",
  date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString().slice(0, 10),
  time: "09.00 - 16.00 WIB",
  location: "",
  image_url: DEFAULT_IMG,
  quota: 100,
  registered: 0,
  register_deadline: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString().slice(0, 10),
  excerpt: "",
};

function AdminEventPage() {
  const [data, setData] = useState<AlumniEvent[]>(EVENTS);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<EventDraft>({ ...EMPTY });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(
      (e) =>
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        EVENT_TYPE_LABEL[e.type].toLowerCase().includes(q),
    );
  }, [data, query]);

  function openAdd() {
    setDraft({ ...EMPTY });
    setOpen(true);
  }

  function openEdit(e: AlumniEvent) {
    setDraft({ ...e });
    setOpen(true);
  }

  function save() {
    if (!draft.title.trim()) {
      toast.error("Nama event tidak boleh kosong");
      return;
    }
    if (!draft.location.trim()) {
      toast.error("Lokasi event harus diisi");
      return;
    }
    if (draft.id) {
      setData((prev) =>
        prev.map((x) => (x.id === draft.id ? ({ ...x, ...draft } as AlumniEvent) : x)),
      );
      toast.success("Event berhasil diperbarui");
    } else {
      const nextId = data.reduce((m, e) => Math.max(m, e.id), 0) + 1;
      setData((prev) => [{ id: nextId, ...draft } as AlumniEvent, ...prev]);
      toast.success("Event berhasil ditambahkan");
    }
    setOpen(false);
  }

  function remove(id: number) {
    setData((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event berhasil dihapus");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Event</h1>
          <p className="text-sm text-muted-foreground">
            Atur reuni, seminar, workshop, dan event lainnya untuk alumni.
          </p>
        </div>
        <Button onClick={openAdd} className="gap-1.5">
          <Plus className="h-4 w-4" /> Tambah Event
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Daftar Event ({list.length})</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama / lokasi event..."
              className="pl-9"
              aria-label="Cari event"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead className="w-28">Jenis</TableHead>
                <TableHead className="w-32">Pelaksanaan</TableHead>
                <TableHead className="w-40">Tanggal</TableHead>
                <TableHead className="w-36">Peserta</TableHead>
                <TableHead className="w-36 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    Belum ada event yang cocok.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <img
                          src={e.image_url}
                          alt=""
                          loading="lazy"
                          className="h-12 w-20 shrink-0 rounded-md object-cover"
                          width={80}
                          height={48}
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-medium text-foreground">
                            {e.title}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                            {e.location}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{EVENT_TYPE_LABEL[e.type]}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{EVENT_MODE_LABEL[e.mode]}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{formatDate(e.date)}</TableCell>
                    <TableCell>
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">{e.registered}</span>
                        <span className="text-muted-foreground"> / {e.quota}</span>
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(e)}>
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
                              <AlertDialogTitle>Hapus event?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Event &ldquo;{e.title}&rdquo; akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => remove(e.id)}
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
            <DialogTitle>{draft.id ? "Edit Event" : "Tambah Event Baru"}</DialogTitle>
            <DialogDescription>
              Isi detail event berikut untuk dipublikasikan ke halaman event alumni.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ev-title">Nama Event *</Label>
              <Input
                id="ev-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Nama event..."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-type">Jenis Event</Label>
              <Select
                value={draft.type}
                onValueChange={(v) => setDraft({ ...draft, type: v as EventType })}
              >
                <SelectTrigger id="ev-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EVENT_TYPE_LABEL) as EventType[]).map((t) => (
                    <SelectItem key={t} value={t}>
                      {EVENT_TYPE_LABEL[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-mode">Mode Pelaksanaan</Label>
              <Select
                value={draft.mode}
                onValueChange={(v) => setDraft({ ...draft, mode: v as EventMode })}
              >
                <SelectTrigger id="ev-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EVENT_MODE_LABEL) as EventMode[]).map((m) => (
                    <SelectItem key={m} value={m}>
                      {EVENT_MODE_LABEL[m]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-date">Tanggal</Label>
              <Input
                id="ev-date"
                type="date"
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-time">Waktu</Label>
              <Input
                id="ev-time"
                value={draft.time}
                onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                placeholder="09.00 - 16.00 WIB"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-quota">Kuota Peserta</Label>
              <Input
                id="ev-quota"
                type="number"
                value={draft.quota}
                onChange={(e) => setDraft({ ...draft, quota: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-registered">Sudah Mendaftar</Label>
              <Input
                id="ev-registered"
                type="number"
                value={draft.registered}
                onChange={(e) => setDraft({ ...draft, registered: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ev-location">Lokasi *</Label>
              <Input
                id="ev-location"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                placeholder="Aula Rektorat / Zoom / dll"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-deadline">Tutup Pendaftaran</Label>
              <Input
                id="ev-deadline"
                type="date"
                value={draft.register_deadline}
                onChange={(e) => setDraft({ ...draft, register_deadline: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ev-image">URL Banner</Label>
              <Input
                id="ev-image"
                value={draft.image_url}
                onChange={(e) => setDraft({ ...draft, image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            {draft.image_url && (
              <div className="sm:col-span-2">
                <img src={draft.image_url} alt="" className="h-40 w-full rounded-md object-cover" />
              </div>
            )}
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="ev-excerpt">Deskripsi Singkat</Label>
              <Textarea
                id="ev-excerpt"
                rows={3}
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
                placeholder="Ringkasan acara..."
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

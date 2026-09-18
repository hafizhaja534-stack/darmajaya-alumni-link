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
  EMPLOYMENT_TYPE_LABEL,
  INDUSTRIES,
  JOBS,
  WORKPLACE_LABEL,
  type EmploymentType,
  type JobVacancy,
  type Workplace,
  formatDate,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/lowongan")({
  component: AdminLowonganPage,
});

type JobDraft = Omit<JobVacancy, "id"> & { id?: number };

const EMPTY: JobDraft = {
  title: "",
  company_name: "",
  company_logo: "DJ",
  industry: INDUSTRIES[0],
  city: "Bandar Lampung",
  province: "Lampung",
  salary_range: "",
  employment_type: "full_time",
  workplace: "onsite",
  deadline: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10),
  posted_at: new Date().toISOString().slice(0, 10),
  description: "",
};

function AdminLowonganPage() {
  const [data, setData] = useState<JobVacancy[]>(JOBS);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<JobDraft>({ ...EMPTY });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(
      (j) =>
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q) ||
        j.industry.toLowerCase().includes(q),
    );
  }, [data, query]);

  function openAdd() {
    setDraft({ ...EMPTY });
    setOpen(true);
  }

  function openEdit(j: JobVacancy) {
    setDraft({ ...j });
    setOpen(true);
  }

  function save() {
    if (!draft.title.trim() || !draft.company_name.trim()) {
      toast.error("Posisi dan perusahaan wajib diisi");
      return;
    }
    if (draft.id) {
      setData((prev) =>
        prev.map((j) => (j.id === draft.id ? ({ ...j, ...draft } as JobVacancy) : j)),
      );
      toast.success("Lowongan berhasil diperbarui");
    } else {
      const nextId = data.reduce((m, j) => Math.max(m, j.id), 0) + 1;
      setData((prev) => [{ id: nextId, ...draft } as JobVacancy, ...prev]);
      toast.success("Lowongan berhasil ditambahkan");
    }
    setOpen(false);
  }

  function remove(id: number) {
    setData((prev) => prev.filter((j) => j.id !== id));
    toast.success("Lowongan berhasil dihapus");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Lowongan Kerja</h1>
          <p className="text-sm text-muted-foreground">
            Atur lowongan kerja dari mitra perusahaan & alumni.
          </p>
        </div>
        <Button onClick={openAdd} className="gap-1.5">
          <Plus className="h-4 w-4" /> Tambah Lowongan
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Daftar Lowongan ({list.length})</CardTitle>
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari posisi / perusahaan..."
              className="pl-9"
              aria-label="Cari lowongan"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posisi & Perusahaan</TableHead>
                <TableHead className="w-36">Industri</TableHead>
                <TableHead className="w-32">Jenis</TableHead>
                <TableHead className="w-40">Deadline</TableHead>
                <TableHead className="w-40">Lokasi</TableHead>
                <TableHead className="w-36 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    Belum ada lowongan yang cocok.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-xs font-bold text-primary">
                          {j.company_logo}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{j.title}</p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {j.company_name} &middot; {j.salary_range}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{j.industry}</Badge>
                    </TableCell>
                    <TableCell className="space-y-1">
                      <Badge variant="outline">{EMPLOYMENT_TYPE_LABEL[j.employment_type]}</Badge>
                      <div className="text-[11px] text-muted-foreground">
                        {WORKPLACE_LABEL[j.workplace]}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{formatDate(j.deadline)}</p>
                      <p className="text-[11px] text-muted-foreground">
                        Posting: {formatDate(j.posted_at)}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {j.city}, {j.province}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(j)}>
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
                              <AlertDialogTitle>Hapus lowongan?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Lowongan &ldquo;{j.title}&rdquo; di {j.company_name} akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => remove(j.id)}
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
            <DialogTitle>{draft.id ? "Edit Lowongan" : "Tambah Lowongan Baru"}</DialogTitle>
            <DialogDescription>
              Isi detail lowongan kerja untuk dipublikasikan ke halaman lowongan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="job-title">Nama Posisi *</Label>
              <Input
                id="job-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-company">Perusahaan *</Label>
              <Input
                id="job-company"
                value={draft.company_name}
                onChange={(e) => setDraft({ ...draft, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-logo">Logo (Inisial)</Label>
              <Input
                id="job-logo"
                maxLength={3}
                value={draft.company_logo}
                onChange={(e) => setDraft({ ...draft, company_logo: e.target.value })}
                placeholder="Misal: NT"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-industry">Industri</Label>
              <Select
                value={draft.industry}
                onValueChange={(v) => setDraft({ ...draft, industry: v })}
              >
                <SelectTrigger id="job-industry">
                  <SelectValue />
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
            <div className="space-y-1.5">
              <Label htmlFor="job-salary">Rentang Gaji</Label>
              <Input
                id="job-salary"
                value={draft.salary_range}
                onChange={(e) => setDraft({ ...draft, salary_range: e.target.value })}
                placeholder="Rp 7jt - Rp 10jt"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-employment">Tipe Pekerjaan</Label>
              <Select
                value={draft.employment_type}
                onValueChange={(v) => setDraft({ ...draft, employment_type: v as EmploymentType })}
              >
                <SelectTrigger id="job-employment">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(EMPLOYMENT_TYPE_LABEL) as EmploymentType[]).map((t) => (
                    <SelectItem key={t} value={t}>
                      {EMPLOYMENT_TYPE_LABEL[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-workplace">Lokasi Kerja</Label>
              <Select
                value={draft.workplace}
                onValueChange={(v) => setDraft({ ...draft, workplace: v as Workplace })}
              >
                <SelectTrigger id="job-workplace">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(WORKPLACE_LABEL) as Workplace[]).map((w) => (
                    <SelectItem key={w} value={w}>
                      {WORKPLACE_LABEL[w]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-city">Kota</Label>
              <Input
                id="job-city"
                value={draft.city}
                onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-province">Provinsi</Label>
              <Input
                id="job-province"
                value={draft.province}
                onChange={(e) => setDraft({ ...draft, province: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-posted">Tanggal Posting</Label>
              <Input
                id="job-posted"
                type="date"
                value={draft.posted_at}
                onChange={(e) => setDraft({ ...draft, posted_at: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="job-deadline">Deadline Lamaran</Label>
              <Input
                id="job-deadline"
                type="date"
                value={draft.deadline}
                onChange={(e) => setDraft({ ...draft, deadline: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="job-desc">Deskripsi Pekerjaan</Label>
              <Textarea
                id="job-desc"
                rows={4}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
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

import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Pencil, Search, Trash2, XCircle } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ALUMNI,
  INDUSTRIES,
  PROGRAMS,
  PROVINCES,
  VERIFICATION_LABEL,
  type AlumniProfile,
  type VerificationStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/alumni")({
  component: AdminAlumniPage,
});

type AlumniDraft = Omit<AlumniProfile, "id"> & { id?: number };

const EMPTY: AlumniDraft = {
  full_name: "",
  nim: "",
  program: PROGRAMS[0].name,
  entry_year: new Date().getFullYear() - 4,
  graduation_year: new Date().getFullYear(),
  job_title: "",
  company_name: "",
  industry: INDUSTRIES[0],
  province: PROVINCES[0],
  city: "Bandar Lampung",
  linkedin: "",
  bio: "",
  photo_url: `https://i.pravatar.cc/300?u=${Date.now()}`,
  verification_status: "approved",
  is_public: true,
};

function AdminAlumniPage() {
  const [data, setData] = useState<AlumniProfile[]>(ALUMNI);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("semua");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<AlumniDraft>({ ...EMPTY });

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((a) => {
      const matchQ =
        !q ||
        a.full_name.toLowerCase().includes(q) ||
        a.nim.toLowerCase().includes(q) ||
        a.program.toLowerCase().includes(q) ||
        a.company_name.toLowerCase().includes(q);
      const matchS = statusFilter === "semua" || a.verification_status === statusFilter;
      return matchQ && matchS;
    });
  }, [data, query, statusFilter]);

  const stats = useMemo(
    () => ({
      total: data.length,
      approved: data.filter((a) => a.verification_status === "approved").length,
      pending: data.filter((a) => a.verification_status === "pending").length,
      rejected: data.filter((a) => a.verification_status === "rejected").length,
    }),
    [data],
  );

  function openAdd() {
    setDraft({ ...EMPTY, photo_url: `https://i.pravatar.cc/300?u=${Date.now()}` });
    setOpen(true);
  }

  function openEdit(a: AlumniProfile) {
    setDraft({ ...a });
    setOpen(true);
  }

  function save() {
    if (!draft.full_name.trim()) {
      toast.error("Nama lengkap tidak boleh kosong");
      return;
    }
    if (!draft.nim.trim()) {
      toast.error("NIM wajib diisi");
      return;
    }
    if (draft.id) {
      setData((prev) =>
        prev.map((a) => (a.id === draft.id ? ({ ...a, ...draft } as AlumniProfile) : a)),
      );
      toast.success("Data alumni berhasil diperbarui");
    } else {
      const nextId = data.reduce((m, a) => Math.max(m, a.id), 0) + 1;
      setData((prev) => [...prev, { id: nextId, ...draft } as AlumniProfile]);
      toast.success("Alumni baru berhasil ditambahkan");
    }
    setOpen(false);
  }

  function setStatus(id: number, status: VerificationStatus) {
    setData((prev) => prev.map((a) => (a.id === id ? { ...a, verification_status: status } : a)));
    toast.success(`Status diubah menjadi ${VERIFICATION_LABEL[status]}`);
  }

  function remove(id: number, name: string) {
    setData((prev) => prev.filter((a) => a.id !== id));
    toast.success(`Data alumni ${name} dihapus`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Data Alumni</h1>
          <p className="text-sm text-muted-foreground">
            Verifikasi, edit, dan hapus data alumni yang telah mendaftar.
          </p>
        </div>
        <Button onClick={openAdd} className="gap-1.5">
          <Pencil className="h-4 w-4" /> Tambah Alumni
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          { label: "Total Alumni", value: stats.total, tone: "text-foreground" },
          { label: "Terverifikasi", value: stats.approved, tone: "text-emerald-600" },
          { label: "Menunggu", value: stats.pending, tone: "text-amber-600" },
          { label: "Ditolak", value: stats.rejected, tone: "text-destructive" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.tone}`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Daftar Alumni ({list.length})</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="approved">Terverifikasi</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                  <SelectItem value="needs_revision">Perlu Revisi</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari nama / NIM / prodi..."
                  className="pl-9"
                  aria-label="Cari alumni"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumni</TableHead>
                <TableHead className="w-40">Program Studi</TableHead>
                <TableHead className="w-40">Pekerjaan</TableHead>
                <TableHead className="w-32">Verifikasi</TableHead>
                <TableHead className="w-28">Publik</TableHead>
                <TableHead className="w-52 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    Tidak ada data alumni yang cocok.
                  </TableCell>
                </TableRow>
              ) : (
                list.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={a.photo_url}
                          alt=""
                          className="h-10 w-10 rounded-full object-cover"
                          width={40}
                          height={40}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">
                            {a.full_name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            NIM {a.nim} &middot; {a.city}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{a.program}</p>
                      <p className="text-[11px] text-muted-foreground">Lulus {a.graduation_year}</p>
                    </TableCell>
                    <TableCell>
                      <p className="truncate text-sm">{a.job_title || "-"}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.company_name || "-"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          a.verification_status === "approved"
                            ? "secondary"
                            : a.verification_status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                        className={
                          a.verification_status === "approved" ? "bg-primary-soft text-primary" : ""
                        }
                      >
                        {VERIFICATION_LABEL[a.verification_status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={a.is_public ? "secondary" : "outline"}>
                        {a.is_public ? "Ya" : "Tidak"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        {a.verification_status !== "approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-emerald-600 border-emerald-200"
                            onClick={() => setStatus(a.id, "approved")}
                            title="Verifikasi"
                          >
                            <BadgeCheck className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        {a.verification_status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 gap-1 text-destructive"
                            onClick={() => setStatus(a.id, "rejected")}
                            title="Tolak"
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => openEdit(a)}>
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
                              <AlertDialogTitle>Hapus data alumni?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Data milik &ldquo;{a.full_name}&rdquo; akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => remove(a.id, a.full_name)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Edit Data Alumni" : "Tambah Data Alumni"}</DialogTitle>
            <DialogDescription>
              Periksa kembali NIM dan identitas sebelum menyimpan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="al-photo">URL Foto</Label>
              <Input
                id="al-photo"
                value={draft.photo_url}
                onChange={(e) => setDraft({ ...draft, photo_url: e.target.value })}
              />
              {draft.photo_url && (
                <img
                  src={draft.photo_url}
                  alt=""
                  className="mt-2 h-20 w-20 rounded-full object-cover"
                />
              )}
            </div>
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="al-status">Status Verifikasi</Label>
              <Select
                value={draft.verification_status}
                onValueChange={(v) =>
                  setDraft({ ...draft, verification_status: v as VerificationStatus })
                }
              >
                <SelectTrigger id="al-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(VERIFICATION_LABEL) as VerificationStatus[]).map((v) => (
                    <SelectItem key={v} value={v}>
                      {VERIFICATION_LABEL[v]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-3 flex items-center justify-between rounded-md border border-border p-3">
                <Label htmlFor="al-public" className="text-sm cursor-pointer">
                  Tampilkan di Direktori
                </Label>
                <Switch
                  id="al-public"
                  checked={draft.is_public}
                  onCheckedChange={(c) => setDraft({ ...draft, is_public: c })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-name">Nama Lengkap *</Label>
              <Input
                id="al-name"
                value={draft.full_name}
                onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-nim">NIM *</Label>
              <Input
                id="al-nim"
                value={draft.nim}
                onChange={(e) => setDraft({ ...draft, nim: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-program">Program Studi</Label>
              <Select
                value={draft.program}
                onValueChange={(v) => setDraft({ ...draft, program: v })}
              >
                <SelectTrigger id="al-program">
                  <SelectValue />
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
            <div className="space-y-1.5">
              <Label htmlFor="al-industry">Industri</Label>
              <Select
                value={draft.industry}
                onValueChange={(v) => setDraft({ ...draft, industry: v })}
              >
                <SelectTrigger id="al-industry">
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
              <Label htmlFor="al-entry">Tahun Masuk</Label>
              <Input
                id="al-entry"
                type="number"
                value={draft.entry_year}
                onChange={(e) => setDraft({ ...draft, entry_year: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-grad">Tahun Lulus</Label>
              <Input
                id="al-grad"
                type="number"
                value={draft.graduation_year}
                onChange={(e) => setDraft({ ...draft, graduation_year: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-job">Jabatan</Label>
              <Input
                id="al-job"
                value={draft.job_title}
                onChange={(e) => setDraft({ ...draft, job_title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-company">Perusahaan</Label>
              <Input
                id="al-company"
                value={draft.company_name}
                onChange={(e) => setDraft({ ...draft, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="al-province">Provinsi</Label>
              <Select
                value={draft.province}
                onValueChange={(v) => setDraft({ ...draft, province: v })}
              >
                <SelectTrigger id="al-province">
                  <SelectValue />
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
            <div className="space-y-1.5">
              <Label htmlFor="al-city">Kota</Label>
              <Input
                id="al-city"
                value={draft.city}
                onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="al-linkedin">LinkedIn / Profil Online</Label>
              <Input
                id="al-linkedin"
                value={draft.linkedin}
                onChange={(e) => setDraft({ ...draft, linkedin: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="al-bio">Bio / Deskripsi Singkat</Label>
              <Input
                id="al-bio"
                value={draft.bio}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={save}>{draft.id ? "Simpan Perubahan" : "Simpan Data"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

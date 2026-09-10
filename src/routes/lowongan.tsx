import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Building2, Clock, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/entity-cards";
import { PageHeader, PublicLayout } from "@/components/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  EMPLOYMENT_TYPE_LABEL,
  INDUSTRIES,
  JOBS,
  WORKPLACE_LABEL,
  formatDate,
  type JobVacancy,
} from "@/lib/mock-data";

export const Route = createFileRoute("/lowongan")({
  head: () => ({
    meta: [
      { title: "Lowongan Kerja Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Papan lowongan kerja khusus alumni IIB Darmajaya dari perusahaan mitra: penuh waktu, kontrak, magang, hingga kerja jarak jauh.",
      },
      { property: "og:title", content: "Lowongan Kerja Alumni Darmajaya" },
      {
        property: "og:description",
        content: "Temukan peluang karier terbaru dari perusahaan mitra kampus.",
      },
    ],
  }),
  component: LowonganPage,
});

const ALL = "semua";

function LowonganPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState(ALL);
  const [workplace, setWorkplace] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);
  const [selected, setSelected] = useState<JobVacancy | undefined>(JOBS[0]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter(
      (j) =>
        (!q || j.title.toLowerCase().includes(q) || j.company_name.toLowerCase().includes(q)) &&
        (type === ALL || j.employment_type === type) &&
        (workplace === ALL || j.workplace === workplace) &&
        (industry === ALL || j.industry === industry),
    );
  }, [query, type, workplace, industry]);

  const active = list.find((j) => j.id === selected?.id) ?? list[0];

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Karier"
        title="Papan Lowongan Kerja"
        description="Peluang kerja dari perusahaan mitra IIB Darmajaya. Lamaran Anda dapat dipantau melalui menu Lamaran Saya."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Card className="mb-8">
          <CardContent className="grid gap-4 lg:grid-cols-4">
            <div className="space-y-1.5 lg:col-span-1">
              <Label className="text-xs text-muted-foreground">Kata Kunci</Label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Posisi atau perusahaan"
                  className="pl-9"
                  aria-label="Cari lowongan"
                />
              </div>
            </div>
            <Filter
              label="Tipe Pekerjaan"
              value={type}
              onChange={setType}
              options={Object.entries(EMPLOYMENT_TYPE_LABEL)}
            />
            <Filter
              label="Workplace"
              value={workplace}
              onChange={setWorkplace}
              options={Object.entries(WORKPLACE_LABEL)}
            />
            <Filter
              label="Industri"
              value={industry}
              onChange={setIndustry}
              options={INDUSTRIES.map((i) => [i, i] as [string, string])}
            />
          </CardContent>
        </Card>

        {list.length === 0 || !active ? (
          <EmptyState
            title="Lowongan tidak ditemukan"
            description="Belum ada lowongan yang cocok dengan filter Anda. Coba ubah kata kunci."
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              {list.map((job) => (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setSelected(job)}
                  className={`w-full rounded-xl border bg-card p-5 text-left transition-all hover:shadow-card ${
                    active.id === job.id ? "border-primary shadow-card" : "border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-sm font-bold text-primary">
                      {job.company_logo}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-foreground">{job.title}</h3>
                      <p className="truncate text-sm text-muted-foreground">{job.company_name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {EMPLOYMENT_TYPE_LABEL[job.employment_type]}
                        </Badge>
                        <Badge variant="outline">{WORKPLACE_LABEL[job.workplace]}</Badge>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Card className="h-fit lg:sticky lg:top-24">
              <CardContent className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{active.title}</h2>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" /> {active.company_name} &middot;{" "}
                    {active.industry}
                  </p>
                </div>
                <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> {active.city}, {active.province}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" /> {active.salary_range}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Ditutup{" "}
                    {formatDate(active.deadline)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Diposting{" "}
                    {formatDate(active.posted_at)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Deskripsi Pekerjaan</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {active.description}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() =>
                    toast.success("Lamaran terkirim", {
                      description: `Status lamaran ${active.title} kini "Terkirim". Pantau di menu Lamaran Saya.`,
                    })
                  }
                >
                  Lamar Sekarang
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Hanya alumni terverifikasi yang dapat mengirim lamaran.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Semua</SelectItem>
          {options.map(([val, text]) => (
            <SelectItem key={val} value={val}>
              {text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

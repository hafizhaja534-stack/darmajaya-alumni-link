import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { AlumniCard, EmptyState } from "@/components/entity-cards";
import { PageHeader, PublicLayout } from "@/components/public-layout";
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
import { ALUMNI, CITIES, INDUSTRIES, PROGRAMS, PROVINCES } from "@/lib/mock-data";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Direktori Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Cari dan temukan alumni IIB Darmajaya berdasarkan nama, program studi, tahun lulus, kota, industri, dan perusahaan.",
      },
      { property: "og:title", content: "Direktori Alumni IIB Darmajaya" },
      {
        property: "og:description",
        content: "Jelajahi jaringan alumni Darmajaya di berbagai kota dan industri.",
      },
    ],
  }),
  component: DirektoriAlumni,
});

const ALL = "semua";
const PER_PAGE = 8;

function DirektoriAlumni() {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState(ALL);
  const [year, setYear] = useState(ALL);
  const [province, setProvince] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);
  const [page, setPage] = useState(1);

  const years = useMemo(
    () => [...new Set(ALUMNI.map((a) => a.graduation_year))].sort((a, b) => b - a),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALUMNI.filter((a) => a.is_public).filter((a) => {
      const matchQuery =
        !q || a.full_name.toLowerCase().includes(q) || a.company_name.toLowerCase().includes(q);
      return (
        matchQuery &&
        (program === ALL || a.program === program) &&
        (year === ALL || String(a.graduation_year) === year) &&
        (province === ALL || a.province === province) &&
        (city === ALL || a.city === city) &&
        (industry === ALL || a.industry === industry)
      );
    });
  }, [query, program, year, province, city, industry]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = () => {
    setQuery("");
    setProgram(ALL);
    setYear(ALL);
    setProvince(ALL);
    setCity(ALL);
    setIndustry(ALL);
    setPage(1);
  };

  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Direktori"
        title="Direktori Alumni Darmajaya"
        description="Telusuri jejaring alumni dari seluruh program studi dan angkatan. Hanya alumni yang mengaktifkan tampilan publik yang muncul di sini."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Card className="mb-8">
          <CardContent className="space-y-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" /> Filter Pencarian
            </div>

            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama alumni atau perusahaan..."
                className="pl-9"
                aria-label="Cari alumni"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <FilterSelect
                label="Program Studi"
                value={program}
                onChange={(v) => {
                  setProgram(v);
                  setPage(1);
                }}
                options={PROGRAMS.map((p) => p.name)}
              />
              <FilterSelect
                label="Tahun Lulus"
                value={year}
                onChange={(v) => {
                  setYear(v);
                  setPage(1);
                }}
                options={years.map(String)}
              />
              <FilterSelect
                label="Provinsi"
                value={province}
                onChange={(v) => {
                  setProvince(v);
                  setPage(1);
                }}
                options={PROVINCES}
              />
              <FilterSelect
                label="Kota"
                value={city}
                onChange={(v) => {
                  setCity(v);
                  setPage(1);
                }}
                options={CITIES}
              />
              <FilterSelect
                label="Industri"
                value={industry}
                onChange={(v) => {
                  setIndustry(v);
                  setPage(1);
                }}
                options={INDUSTRIES}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Menampilkan <strong className="text-foreground">{filtered.length}</strong> alumni
              </p>
              <Button variant="ghost" size="sm" onClick={reset}>
                Atur Ulang Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {pageItems.length === 0 ? (
          <EmptyState
            title="Alumni tidak ditemukan"
            description="Coba ubah kata kunci atau atur ulang filter pencarian Anda."
          />
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pageItems.map((a) => (
                <AlumniCard key={a.id} alumni={a} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
              >
                Sebelumnya
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === current ? "default" : "outline"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={current === totalPages}
                onClick={() => setPage(current + 1)}
              >
                Berikutnya
              </Button>
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
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
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

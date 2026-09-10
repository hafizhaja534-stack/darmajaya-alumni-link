import { createFileRoute } from "@tanstack/react-router";
import { Building2, HeartHandshake, ShieldCheck, Target } from "lucide-react";

import { PageHeader, PublicLayout } from "@/components/public-layout";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/tentang")({
  head: () => ({
    meta: [
      { title: "Tentang Portal — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Mengenal Darmajaya Alumni Connect, portal resmi alumni IIB Darmajaya beserta tujuan, layanan, dan tata kelola datanya.",
      },
      { property: "og:title", content: "Tentang Darmajaya Alumni Connect" },
      {
        property: "og:description",
        content: "Tujuan, layanan, dan tata kelola portal alumni IIB Darmajaya.",
      },
    ],
  }),
  component: TentangPage,
});

const VALUES = [
  {
    icon: Target,
    title: "Tujuan",
    desc: "Menjadi kanal resmi yang menghubungkan alumni dengan kampus dan sesama alumni di seluruh Indonesia.",
  },
  {
    icon: HeartHandshake,
    title: "Kontribusi",
    desc: "Membuka ruang berbagi peluang kerja, mentoring, dan kolaborasi antar angkatan.",
  },
  {
    icon: ShieldCheck,
    title: "Data Terverifikasi",
    desc: "Setiap data alumni diverifikasi melalui NIM, nomor ijazah, dan dokumen pendukung.",
  },
  {
    icon: Building2,
    title: "Mitra Perusahaan",
    desc: "Perusahaan mitra terverifikasi dapat memasang lowongan dan merekrut talenta Darmajaya.",
  },
];

function TentangPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Tentang"
        title="Tentang Darmajaya Alumni Connect"
        description="Portal resmi alumni Institut Informatika dan Bisnis Darmajaya sebagai pusat data, layanan, dan komunitas alumni."
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              Darmajaya Alumni Connect dibangun sebagai platform terpusat bagi alumni IIB Darmajaya.
              Melalui portal ini, kampus dapat memutakhirkan data lulusan, menjalankan tracer study,
              menyebarkan informasi kegiatan, serta menyalurkan peluang karier dari perusahaan
              mitra.
            </p>
            <p>
              Alumni memperoleh satu akun untuk mengelola profil, mengikuti event, melamar
              pekerjaan, mengisi tracer study, dan memiliki kartu alumni digital yang dapat
              divalidasi melalui QR Code.
            </p>
            <p>
              Portal ini dirancang dengan pembagian peran yang jelas: administrator kampus mengelola
              data dan verifikasi, alumni mengakses layanan keanggotaan, dan perusahaan mitra
              mengelola lowongan serta pelamar.
            </p>
          </div>

          <div className="grid gap-4">
            {VALUES.map((v) => (
              <Card key={v.title} className="card-hover">
                <CardContent className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">{v.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

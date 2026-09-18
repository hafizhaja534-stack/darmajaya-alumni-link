import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Search,
} from "lucide-react";

import heroImage from "@/assets/hero-alumni.jpg";
import { PublicLayout } from "@/components/public-layout";
import { AlumniCard, EventCard, JobCard, NewsCard } from "@/components/entity-cards";
import { Button } from "@/components/ui/button";
import { ALUMNI, EVENTS, JOBS, NEWS, STATS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IKA IIB DARMAJAYA — Ikatan Keluarga Alumni IIB Darmajaya" },
      {
        name: "description",
        content:
          "Platform resmi alumni IIB Darmajaya: direktori alumni, lowongan kerja, event, berita, tracer study, dan kartu alumni digital.",
      },
      { property: "og:title", content: "Darmajaya Alumni Connect" },
      {
        property: "og:description",
        content: "Terhubung, berkembang, dan berkontribusi bersama jaringan alumni IIB Darmajaya.",
      },
    ],
  }),
  component: Beranda,
});

function Beranda() {
  const stats = [
    { label: "Total Alumni", value: STATS.total_alumni.toLocaleString("id-ID") },
    { label: "Alumni Terverifikasi", value: STATS.verified_alumni.toLocaleString("id-ID") },
    { label: "Program Studi", value: STATS.programs },
    { label: "Event", value: STATS.events },
    { label: "Lowongan Kerja", value: STATS.jobs },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-hero-gradient">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/90">
              <BadgeCheck className="h-3.5 w-3.5" /> Portal Resmi IIB Darmajaya
            </span>
            <h1 className="mt-5 text-3xl leading-tight font-bold text-primary-foreground md:text-5xl">
              Terhubung, Berkembang, dan Berkontribusi Bersama Alumni Darmajaya
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
              Platform resmi alumni IIB Darmajaya untuk membangun koneksi, berbagi peluang,
              mengembangkan karier, dan tetap terhubung dengan almamater.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/alumni">
                  <Search className="h-4 w-4" /> Cari Alumni
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link to="/daftar">
                  Gabung Sekarang <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Alumni IIB Darmajaya berjejaring di kampus"
              width={1600}
              height={1100}
              className="rounded-2xl object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl font-bold text-primary md:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni terbaru */}
      <Section
        eyebrow="Alumni Terbaru"
        title="Kenali alumni yang baru bergabung"
        action={{ to: "/alumni", label: "Lihat direktori" }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ALUMNI.slice(0, 4).map((a) => (
            <AlumniCard key={a.id} alumni={a} />
          ))}
        </div>
      </Section>

      {/* Event */}
      <Section
        eyebrow="Event Terdekat"
        title="Agenda alumni yang akan datang"
        action={{ to: "/event", label: "Semua event" }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.slice(0, 3).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </Section>

      {/* Lowongan */}
      <Section
        eyebrow="Lowongan Terbaru"
        title="Peluang karier dari perusahaan mitra"
        action={{ to: "/lowongan", label: "Semua lowongan" }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {JOBS.slice(0, 3).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </Section>

      {/* Berita */}
      <Section
        eyebrow="Berita Terbaru"
        title="Kabar dari komunitas alumni"
        action={{ to: "/berita", label: "Semua berita" }}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl bg-card-gradient px-6 py-12 text-center md:px-12">
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Sudah lulus dari Darmajaya? Daftarkan diri Anda
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
            Verifikasi data alumni Anda untuk mendapatkan kartu alumni digital, akses lowongan, dan
            undangan event resmi kampus.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/daftar">Daftar Sekarang</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/tentang">Pelajari Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function Section({
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { to: "/alumni" | "/event" | "/lowongan" | "/berita"; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-18">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Button asChild variant="ghost" className="text-primary">
            <Link to={action.to}>
              {action.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarRange,
  Newspaper,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ALUMNI, EVENTS, JOBS, NEWS, STATS, VERIFICATION_LABEL, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const pendingAlumni = ALUMNI.filter((a) => a.verification_status === "pending").length;
  const upcomingEvents = EVENTS.filter((e) => new Date(e.date) >= new Date("2026-09-01")).length;

  const statCards = [
    {
      label: "Total Berita",
      value: NEWS.length,
      hint: `${STATS.jobs} lowongan aktif`,
      to: "/admin/berita",
      icon: Newspaper,
      tone: "from-primary-soft to-primary/10",
    },
    {
      label: "Total Event",
      value: EVENTS.length,
      hint: `${upcomingEvents} event mendatang`,
      to: "/admin/event",
      icon: CalendarRange,
      tone: "from-accent to-accent/40",
    },
    {
      label: "Lowongan Kerja",
      value: JOBS.length,
      hint: `${JOBS.filter((j) => new Date(j.deadline) >= new Date("2026-09-01")).length} aktif`,
      to: "/admin/lowongan",
      icon: BriefcaseBusiness,
      tone: "from-green-100 to-green-50",
    },
    {
      label: "Data Alumni",
      value: ALUMNI.length,
      hint: `${pendingAlumni} menunggu verifikasi`,
      to: "/admin/alumni",
      icon: UsersRound,
      tone: "from-amber-100 to-amber-50",
    },
  ];

  const latestNews = NEWS.slice(0, 3);
  const latestEvents = EVENTS.slice(0, 3);
  const latestAlumniPending = ALUMNI.filter((a) => a.verification_status === "pending").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-sm text-muted-foreground">
            Pantau dan kelola seluruh konten serta data portal alumni Darmajaya.
          </p>
        </div>
        <Button asChild className="gap-1.5">
          <Link to="/admin/berita">
            Tambah Berita <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
                </div>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.tone} text-primary`}
                >
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <Button asChild variant="ghost" size="sm" className="mt-3 w-full px-2">
                <Link to={s.to}>
                  Kelola <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Berita Terbaru</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/berita">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestNews.map((n) => (
              <div
                key={n.id}
                className="flex items-start justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {n.author} &middot; {formatDate(n.published_at)}
                  </p>
                </div>
                <Badge variant="secondary">{n.category}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Event Terdekat</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/event">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {latestEvents.map((e) => (
              <div
                key={e.id}
                className="flex items-start justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{e.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {formatDate(e.date)} &middot; {e.registered}/{e.quota} peserta
                  </p>
                </div>
                <Badge variant="outline">{e.mode.toUpperCase()}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Verifikasi Alumni Menunggu</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/alumni">Kelola verifikasi</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {latestAlumniPending.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Tidak ada data alumni yang menunggu verifikasi.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {latestAlumniPending.map((a) => (
                <div key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={a.photo_url}
                      alt={a.full_name}
                      className="h-10 w-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{a.full_name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.program} &middot; {a.nim}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{VERIFICATION_LABEL[a.verification_status]}</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

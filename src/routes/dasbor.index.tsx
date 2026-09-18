import { Link, createFileRoute } from "@tanstack/react-router";
import { Briefcase, CalendarDays, CheckCircle2, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  APPLICATION_STATUS_LABEL,
  CURRENT_ALUMNI,
  EVENTS,
  MY_APPLICATIONS,
  NOTIFICATIONS,
  formatDate,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/")({
  component: RingkasanPage,
});

function RingkasanPage() {
  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const stats = [
    { label: "Lamaran aktif", value: MY_APPLICATIONS.length, icon: Briefcase },
    { label: "Event diikuti", value: 2, icon: CalendarDays },
    { label: "Notifikasi baru", value: unread, icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Selamat datang kembali,</p>
            <h1 className="text-2xl font-bold text-foreground">{CURRENT_ALUMNI.full_name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {CURRENT_ALUMNI.program} &middot; Lulus {CURRENT_ALUMNI.graduation_year}
            </p>
          </div>
          <Badge className="w-fit gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Alumni Terverifikasi
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kelengkapan profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={CURRENT_ALUMNI.profile_completion} />
          <p className="text-sm text-muted-foreground">
            Profil Anda terisi {CURRENT_ALUMNI.profile_completion}%. Lengkapi data pekerjaan dan
            domisili agar mudah ditemukan rekan alumni.
          </p>
          <Button asChild size="sm" variant="outline">
            <Link to="/dasbor/profil">Lengkapi profil</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Lamaran terakhir</CardTitle>
            <Button asChild size="sm" variant="ghost">
              <Link to="/dasbor/lamaran">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {MY_APPLICATIONS.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{a.job}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.company}</p>
                </div>
                <Badge variant="secondary">{APPLICATION_STATUS_LABEL[a.status]}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Event terdekat</CardTitle>
            <Button asChild size="sm" variant="ghost">
              <Link to="/event">Lihat semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {EVENTS.slice(0, 3).map((e) => (
              <div key={e.id} className="rounded-md border border-border p-3">
                <p className="text-sm font-medium text-foreground">{e.title}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(e.date)} &middot; {e.location}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

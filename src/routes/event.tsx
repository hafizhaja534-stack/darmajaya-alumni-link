import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState } from "@/components/entity-cards";
import { PageHeader, PublicLayout } from "@/components/public-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays, Clock, MapPin, Ticket, Users } from "lucide-react";

import {
  EVENTS,
  EVENT_MODE_LABEL,
  EVENT_TYPE_LABEL,
  formatDate,
  type AlumniEvent,
} from "@/lib/mock-data";

export const Route = createFileRoute("/event")({
  head: () => ({
    meta: [
      { title: "Event Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Agenda reuni, seminar, workshop, webinar, dan career expo alumni IIB Darmajaya beserta pendaftaran daring.",
      },
      { property: "og:title", content: "Event Alumni IIB Darmajaya" },
      {
        property: "og:description",
        content: "Daftar event alumni yang akan datang dan cara mendaftarnya.",
      },
    ],
  }),
  component: EventPage,
});

function EventPage() {
  return (
    <PublicLayout>
      <PageHeader
        eyebrow="Agenda"
        title="Event Alumni"
        description="Ikuti kegiatan alumni Darmajaya: reuni, seminar, workshop, webinar, hingga career expo."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {EVENTS.length === 0 ? (
          <EmptyState
            title="Belum ada event"
            description="Saat ini belum ada event terjadwal. Silakan kembali lagi nanti."
          />
        ) : (
          <div className="grid gap-6">
            {EVENTS.map((e) => (
              <EventDetailCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}

function EventDetailCard({ event }: { event: AlumniEvent }) {
  const [open, setOpen] = useState(false);

  const daftar = () => {
    setOpen(false);
    toast.success("Pendaftaran event berhasil", {
      description: `Kode tiket Anda: DJ-EVT-${String(event.id).padStart(4, "0")}`,
    });
  };

  return (
    <Card className="card-hover overflow-hidden pt-0">
      <img
        src={event.image_url}
        alt={event.title}
        loading="lazy"
        width={900}
        height={400}
        className="h-52 w-full object-cover"
      />
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary-soft text-primary hover:bg-primary-soft">
            {EVENT_TYPE_LABEL[event.type]}
          </Badge>
          <Badge variant="outline">{EVENT_MODE_LABEL[event.mode]}</Badge>
        </div>
        <h2 className="text-lg font-semibold text-foreground">{event.title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{event.excerpt}</p>
        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" /> {formatDate(event.date)}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> {event.location}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> {event.registered}/{event.quota} peserta
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Pendaftaran ditutup {formatDate(event.register_deadline)}
        </p>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Ticket className="h-4 w-4" /> Lihat Detail &amp; Daftar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{event.title}</DialogTitle>
              <DialogDescription>
                {formatDate(event.date)} &middot; {event.time} &middot; {event.location}
              </DialogDescription>
            </DialogHeader>
            <p className="text-sm leading-relaxed text-muted-foreground">{event.excerpt}</p>
            <p className="text-sm text-muted-foreground">
              Sisa kuota: {event.quota - event.registered} peserta. Setelah mendaftar Anda akan
              menerima kode tiket dan status kehadiran pada dashboard alumni.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button onClick={daftar}>Daftar Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

import { Link, createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EVENTS, EVENT_MODE_LABEL, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/event")({
  component: EventSayaPage,
});

function EventSayaPage() {
  const [registered, setRegistered] = useState<number[]>([1, 2]);
  const rows = EVENTS.filter((e) => registered.includes(e.id));

  function cancel(id: number, title: string) {
    setRegistered((prev) => prev.filter((x) => x !== id));
    toast.success("Pendaftaran dibatalkan", { description: title });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-foreground">Event Saya</h1>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <CalendarDays className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Anda belum terdaftar di event mana pun.</p>
            <Button asChild size="sm">
              <Link to="/event">Jelajahi event</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((e) => (
            <Card key={e.id} className="overflow-hidden">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                <img
                  src={e.image_url}
                  alt={e.title}
                  loading="lazy"
                  className="h-24 w-full rounded-md object-cover sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {EVENT_MODE_LABEL[e.mode]}
                  </Badge>
                  <p className="font-semibold text-foreground">{e.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {formatDate(e.date)} &middot; {e.time}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {e.location}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => cancel(e.id, e.title)}>
                  Batalkan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

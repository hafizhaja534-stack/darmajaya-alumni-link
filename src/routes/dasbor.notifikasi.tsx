import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NOTIFICATIONS, formatDate } from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/notifikasi")({
  component: NotifikasiPage,
});

function NotifikasiPage() {
  const [items, setItems] = useState(NOTIFICATIONS);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-foreground">
          Notifikasi {unread > 0 ? <Badge className="ml-2">{unread} baru</Badge> : null}
        </h1>
        <Button
          size="sm"
          variant="outline"
          disabled={unread === 0}
          onClick={() => {
            setItems((prev) => prev.map((n) => ({ ...n, read: true })));
            toast.success("Semua notifikasi ditandai terbaca");
          }}
        >
          Tandai semua terbaca
        </Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <Bell className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Belum ada notifikasi.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <Card key={n.id} className={n.read ? "" : "border-primary/40 bg-primary-soft/40"}>
              <CardContent className="flex items-start gap-3 p-4">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Bell className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{n.title}</p>
                    <Badge variant="secondary" className="capitalize">
                      {n.category}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(n.created_at)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

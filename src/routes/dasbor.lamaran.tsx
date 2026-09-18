import { Link, createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPLICATION_STATUS_LABEL,
  MY_APPLICATIONS,
  formatDate,
  type ApplicationStatus,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/lamaran")({
  component: LamaranPage,
});

const VARIANT: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  submitted: "outline",
  reviewing: "secondary",
  shortlisted: "default",
  rejected: "destructive",
  accepted: "default",
};

function LamaranPage() {
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");
  const rows = MY_APPLICATIONS.filter((a) => filter === "all" || a.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-foreground">Lamaran Saya</h1>
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Semua status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua status</SelectItem>
            {(Object.keys(APPLICATION_STATUS_LABEL) as ApplicationStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {APPLICATION_STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {rows.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <Briefcase className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Belum ada lamaran dengan status tersebut.
            </p>
            <Button asChild size="sm">
              <Link to="/lowongan">Cari lowongan</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{a.job}</p>
                  <p className="text-sm text-muted-foreground">{a.company}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Dilamar {formatDate(a.applied_at)}
                  </p>
                </div>
                <Badge variant={VARIANT[a.status]} className="w-fit">
                  {APPLICATION_STATUS_LABEL[a.status]}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

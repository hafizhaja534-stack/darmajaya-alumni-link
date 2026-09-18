import { createFileRoute } from "@tanstack/react-router";
import { Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CURRENT_ALUMNI } from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor/kartu")({
  component: KartuPage,
});

const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
  `https://darmajaya-alumni.id/verifikasi/${CURRENT_ALUMNI.card_number}`,
)}`;

function KartuPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-foreground">Kartu Alumni Digital</h1>

      <Card className="overflow-hidden border-0 bg-hero-gradient text-primary-foreground">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase opacity-80">IIB Darmajaya</p>
              <p className="text-lg font-bold">Kartu Alumni Digital</p>
            </div>
            <img
              src={CURRENT_ALUMNI.photo_url}
              alt={`Foto ${CURRENT_ALUMNI.full_name}`}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/40"
            />
            <div className="space-y-0.5 text-sm">
              <p className="text-base font-semibold">{CURRENT_ALUMNI.full_name}</p>
              <p className="opacity-85">NIM {CURRENT_ALUMNI.nim}</p>
              <p className="opacity-85">
                {CURRENT_ALUMNI.program} &middot; {CURRENT_ALUMNI.graduation_year}
              </p>
              <p className="pt-2 font-mono text-xs opacity-90">{CURRENT_ALUMNI.card_number}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-3">
            <img src={QR_SRC} alt="QR verifikasi kartu alumni" width={150} height={150} />
            <p className="text-[10px] text-slate-600">Pindai untuk verifikasi</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Badge className="gap-1">
          <ShieldCheck className="h-3.5 w-3.5" /> Status kartu: Aktif
        </Badge>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            toast.success("Kartu disiapkan", { description: "Berkas kartu akan diunduh." })
          }
        >
          <Download className="h-4 w-4" /> Unduh kartu
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-2 p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Manfaat kartu alumni</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Akses perpustakaan dan fasilitas kampus.</li>
            <li>Potongan harga di merchant mitra alumni.</li>
            <li>Prioritas pendaftaran event dan career expo.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dasbor/tracer")({
  component: TracerPage,
});

const STATUS = [
  { value: "bekerja", label: "Bekerja" },
  { value: "wirausaha", label: "Wirausaha" },
  { value: "studi", label: "Melanjutkan studi" },
  { value: "mencari", label: "Sedang mencari kerja" },
];

const WAIT = [
  { value: "<3", label: "Kurang dari 3 bulan" },
  { value: "3-6", label: "3 - 6 bulan" },
  { value: "6-12", label: "6 - 12 bulan" },
  { value: ">12", label: "Lebih dari 12 bulan" },
];

const RELEVANCE = [
  { value: "sangat", label: "Sangat relevan" },
  { value: "cukup", label: "Cukup relevan" },
  { value: "kurang", label: "Kurang relevan" },
  { value: "tidak", label: "Tidak relevan" },
];

function TracerPage() {
  const [status, setStatus] = useState("");
  const [wait, setWait] = useState("");
  const [relevance, setRelevance] = useState("");
  const [income, setIncome] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!status) return setError("Pilih status Anda saat ini.");
    if (!wait) return setError("Pilih masa tunggu mendapatkan pekerjaan pertama.");
    if (!relevance) return setError("Pilih tingkat relevansi pekerjaan dengan program studi.");
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setDone(true);
      toast.success("Tracer study terkirim", { description: "Terima kasih atas partisipasi Anda." });
    }, 800);
  }

  if (done) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <CheckCircle2 className="h-14 w-14 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Kuesioner sudah terkirim</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Jawaban Anda menjadi masukan bagi pengembangan kurikulum dan layanan karier IIB
            Darmajaya. Anda dapat memperbarui jawaban kapan saja.
          </p>
          <Button variant="outline" onClick={() => setDone(false)}>
            Perbarui jawaban
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kuesioner Tracer Study 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">Status Anda saat ini</legend>
            <RadioGroup value={status} onValueChange={setStatus} className="gap-2">
              {STATUS.map((o) => (
                <div key={o.value} className="flex items-center gap-2">
                  <RadioGroupItem value={o.value} id={`s-${o.value}`} />
                  <Label htmlFor={`s-${o.value}`} className="font-normal">
                    {o.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Masa tunggu pekerjaan pertama
            </legend>
            <RadioGroup value={wait} onValueChange={setWait} className="gap-2">
              {WAIT.map((o) => (
                <div key={o.value} className="flex items-center gap-2">
                  <RadioGroupItem value={o.value} id={`w-${o.value}`} />
                  <Label htmlFor={`w-${o.value}`} className="font-normal">
                    {o.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">
              Relevansi pekerjaan dengan program studi
            </legend>
            <RadioGroup value={relevance} onValueChange={setRelevance} className="gap-2">
              {RELEVANCE.map((o) => (
                <div key={o.value} className="flex items-center gap-2">
                  <RadioGroupItem value={o.value} id={`r-${o.value}`} />
                  <Label htmlFor={`r-${o.value}`} className="font-normal">
                    {o.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="income">Kisaran penghasilan per bulan (opsional)</Label>
            <Input
              id="income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Contoh: Rp 8.000.000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Masukan untuk kampus (opsional)</Label>
            <Textarea
              id="feedback"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={500}
            />
          </div>

          {error ? (
            <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Mengirim..." : "Kirim kuesioner"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

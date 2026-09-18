import { Link, Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  ClipboardList,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { CURRENT_ALUMNI } from "@/lib/mock-data";

export const Route = createFileRoute("/dasbor")({
  head: () => ({
    meta: [
      { title: "Dashboard Alumni — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Kelola profil, tracer study, lamaran kerja, event, dan kartu alumni digital IIB Darmajaya.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DasborLayout,
});

export const DASBOR_MENU = [
  { to: "/dasbor", label: "Ringkasan", icon: LayoutDashboard, exact: true },
  { to: "/dasbor/profil", label: "Profil Saya", icon: UserRound },
  { to: "/dasbor/tracer", label: "Tracer Study", icon: ClipboardList },
  { to: "/dasbor/lamaran", label: "Lamaran Saya", icon: Briefcase },
  { to: "/dasbor/event", label: "Event Saya", icon: CalendarCheck },
  { to: "/dasbor/kartu", label: "Kartu Alumni", icon: CreditCard },
  { to: "/dasbor/notifikasi", label: "Notifikasi", icon: Bell },
  { to: "/dasbor/pengaturan", label: "Pengaturan", icon: Settings },
] as const;

function DasborLayout() {
  const navigate = useNavigate();

  function signOut() {
    toast.success("Anda telah keluar");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">{CURRENT_ALUMNI.full_name}</p>
              <p className="text-xs text-muted-foreground">{CURRENT_ALUMNI.nim}</p>
            </div>
            <img
              src={CURRENT_ALUMNI.photo_url}
              alt={`Foto ${CURRENT_ALUMNI.full_name}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-soft"
            />
            <Button variant="ghost" size="icon" aria-label="Keluar" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <aside className="lg:w-60 lg:shrink-0">
          <nav className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-background p-2 lg:flex-col lg:overflow-visible">
            {DASBOR_MENU.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "bg-primary-soft text-primary" }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

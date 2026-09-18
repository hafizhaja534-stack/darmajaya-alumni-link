import { Link, Outlet, createFileRoute, useNavigate, useLocation } from "@tanstack/react-router";
import {
  BellRing,
  BriefcaseBusiness,
  CalendarRange,
  LayoutDashboard,
  LogOut,
  Newspaper,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { BrandLogo } from "@/components/brand-logo";
import { useAdminAuth } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel Admin — Darmajaya Alumni Connect" },
      {
        name: "description",
        content:
          "Panel administrator untuk mengelola berita, event, lowongan kerja, dan data alumni IIB Darmajaya.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

export const ADMIN_MENU = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/berita", label: "Kelola Berita", icon: Newspaper },
  { to: "/admin/event", label: "Kelola Event", icon: CalendarRange },
  { to: "/admin/lowongan", label: "Kelola Lowongan", icon: BriefcaseBusiness },
  { to: "/admin/alumni", label: "Kelola Alumni", icon: UsersRound },
] as const;

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  useEffect(() => {
    if (user) return;
    if (location.pathname === "/admin/masuk") return;
    navigate({ to: "/admin/masuk", replace: true });
  }, [user, location.pathname, navigate]);

  function signOut() {
    logout();
    toast.success("Admin telah keluar");
    navigate({ to: "/admin/masuk", replace: true });
  }

  const initials = user
    ? user.name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  if (!user && location.pathname === "/admin/masuk") {
    return <Outlet />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40">
        <p className="text-sm text-muted-foreground">Mengalihkan ke halaman login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span className="hidden items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5" /> Panel Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Notifikasi">
              <BellRing className="h-4 w-4" />
            </Button>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
              {initials}
            </span>
            <Button variant="ghost" size="icon" aria-label="Keluar" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <nav className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-background p-2 lg:flex-col lg:overflow-visible">
            {ADMIN_MENU.map((item) => (
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

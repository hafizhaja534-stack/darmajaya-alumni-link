import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Portal resmi alumni Institut Informatika dan Bisnis Darmajaya. Wadah untuk menjaga
            koneksi antar alumni, berbagi peluang karier, dan berkontribusi bagi almamater.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Navigasi</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/alumni", label: "Direktori Alumni" },
              { to: "/event", label: "Event Alumni" },
              { to: "/lowongan", label: "Lowongan Kerja" },
              { to: "/berita", label: "Berita" },
              { to: "/tentang", label: "Tentang Kami" },
            ].map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Jl. Z.A. Pagar Alam No.93, Bandar Lampung, Indonesia
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              (0721) 787214
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              alumni@darmajaya.ac.id
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
          &copy; {new Date().getFullYear()} Darmajaya Alumni Connect — IIB Darmajaya. Seluruh hak
          cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}

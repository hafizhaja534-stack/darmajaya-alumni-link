import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
}) {
  return (
    <section className="border-b border-border bg-hero-gradient">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.18em] text-primary-foreground/70 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold text-primary-foreground md:text-4xl">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { Card, CardContent } from "@/components/ui/card";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-hero-gradient">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <BrandLogo />
        <Link
          to="/"
          className="text-sm font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground"
        >
          Kembali ke beranda
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md">
          <Card className="border-border/60 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <div className="mt-6">{children}</div>
            </CardContent>
          </Card>
          {footer ? (
            <div className="mt-5 text-center text-sm text-primary-foreground/80">{footer}</div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-darmajaya.png";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Link to="/" className={cn("flex items-center gap-3", className)}>
      <img
        src={logo}
        alt="Logo IIB Darmajaya"
        width={512}
        height={512}
        className="h-10 w-10 shrink-0 object-contain"
      />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-base font-bold",
            tone === "light" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          Darmajaya Alumni Connect
        </span>
        <span
          className={cn(
            "block text-xs",
            tone === "light" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          Portal Resmi Alumni IIB Darmajaya
        </span>
      </span>
    </Link>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="EstatePro home"
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold tracking-tight",
          light ? "bg-gold text-navy" : "bg-navy text-gold",
        )}
      >
        EP
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            light ? "text-white" : "text-navy",
          )}
        >
          EstatePro
        </span>
        <span
          className={cn(
            "mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em]",
            light ? "text-white/60" : "text-muted",
          )}
        >
          Real Estate
        </span>
      </span>
    </Link>
  );
}

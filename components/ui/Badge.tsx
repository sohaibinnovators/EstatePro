import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "gold",
  className,
}: {
  children: React.ReactNode;
  variant?: "gold" | "navy" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        variant === "gold" && "bg-gold text-navy",
        variant === "navy" && "bg-navy text-white",
        variant === "light" && "bg-white/90 text-navy backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

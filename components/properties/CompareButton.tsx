"use client";

import { useCompare } from "@/components/compare/CompareProvider";
import { useToast } from "@/components/ui/ToastProvider";
import { cn } from "@/lib/utils";

export function CompareButton({
  propertyId,
  className,
  size = "sm",
  label,
}: {
  propertyId: string;
  className?: string;
  size?: "sm" | "md";
  label?: boolean;
}) {
  const { isCompared, toggle, ready, max } = useCompare();
  const { toast } = useToast();
  const active = ready && isCompared(propertyId);

  return (
    <button
      type="button"
      disabled={!ready}
      aria-pressed={active}
      aria-label={active ? "Remove from comparison" : "Add to comparison"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const result = toggle(propertyId);
        if (result.rejected === "full") {
          toast(`You can compare up to ${max} properties.`, "error");
          return;
        }
        toast(
          result.added ? "Added to comparison." : "Removed from comparison.",
          "success",
        );
      }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full border bg-white/95 font-medium text-navy shadow-[var(--shadow-sm)] transition hover:border-gold disabled:opacity-60",
        active ? "border-gold text-gold" : "border-border",
        size === "sm" ? "h-8 px-2.5 text-xs" : "h-10 px-3 text-sm",
        !label && (size === "sm" ? "w-8 px-0" : "w-10 px-0"),
        className,
      )}
    >
      <svg
        className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path d="M4 6h6M4 12h10M4 18h14M16 6l4 4-4 4" />
      </svg>
      {label ? (active ? "Comparing" : "Compare") : null}
    </button>
  );
}

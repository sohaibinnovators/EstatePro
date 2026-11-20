"use client";

import { usePathname } from "next/navigation";
import { useCompare } from "./CompareProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { Button } from "@/components/ui/Button";

export function CompareBar() {
  const pathname = usePathname();
  const { ids, count, clear, remove, ready } = useCompare();
  const { catalog } = useCatalog();

  if (!ready || count === 0 || pathname.startsWith("/compare")) return null;

  const props = ids
    .map((id) => catalog.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-white/95 shadow-[var(--shadow)] backdrop-blur-md">
      <div className="container-ep flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">
            Comparing {count} of 3
          </p>
          <p className="mt-0.5 truncate text-xs text-muted">
            {props.length
              ? props.map((p) => p!.title).join(" · ")
              : "Selected properties may have been removed."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {ids.map((id) => {
            const p = catalog.find((x) => x.id === id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => remove(id)}
                className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-navy hover:border-gold"
                title={p?.title || "Remove"}
              >
                {(p?.title || "Unavailable").slice(0, 22)}
                {(p?.title || "").length > 22 ? "…" : ""} ×
              </button>
            );
          })}
          <Button href="/compare" variant="gold" size="sm">
            Compare
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={clear}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

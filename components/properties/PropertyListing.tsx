"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Property, PropertyFilters, PropertyStatus, ViewMode } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { PropertyFiltersPanel } from "./PropertyFiltersPanel";
import { Button } from "@/components/ui/Button";
import { IconClose, IconGrid, IconList } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  PAGE_SIZE,
  countActiveFilters,
  createDefaultFilters,
  filterProperties,
  filtersToSearchParams,
  getActiveFilterChips,
  parseFiltersFromSearchParams,
} from "@/lib/property-search";

export function PropertyListing({
  properties,
  lockedStatus = "all",
  showStatusFilter = true,
  title,
  description,
}: {
  properties: Property[];
  lockedStatus?: PropertyStatus | "all";
  showStatusFilter?: boolean;
  title: string;
  description: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const queryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams, lockedStatus),
    [searchParams, lockedStatus],
  );

  const [view, setView] = useState<ViewMode>("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftQuery, setDraftQuery] = useState(filters.query);

  useEffect(() => {
    const id = window.setTimeout(() => setDraftQuery(filters.query), 0);
    return () => window.clearTimeout(id);
  }, [filters.query]);

  const filtered = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, filters.page), totalPages);
  const start = (page - 1) * PAGE_SIZE;
  const shown = filtered.slice(start, start + PAGE_SIZE);
  const activeChips = getActiveFilterChips(filters, lockedStatus);
  const activeCount = countActiveFilters(filters, lockedStatus);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    if (!drawerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  function syncFilters(next: PropertyFilters) {
    const params = filtersToSearchParams(next, lockedStatus);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  function patchFilters(patch: Partial<PropertyFilters>) {
    const next: PropertyFilters = {
      ...filters,
      ...patch,
      page: patch.page ?? 1,
    };
    if (lockedStatus !== "all") {
      next.status = lockedStatus;
    }
    syncFilters(next);
  }

  function updateFilter<K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) {
    if (key === "query") {
      const q = String(value);
      setDraftQuery(q);
      if (queryTimer.current) clearTimeout(queryTimer.current);
      queryTimer.current = setTimeout(() => {
        patchFilters({ query: q, page: 1 });
      }, 350);
      return;
    }
    if (key === "city") {
      patchFilters({ city: value as string, area: "", page: 1 });
      return;
    }
    patchFilters({ [key]: value, page: 1 } as Partial<PropertyFilters>);
  }

  function clearAll() {
    if (queryTimer.current) clearTimeout(queryTimer.current);
    setDraftQuery("");
    syncFilters(createDefaultFilters(lockedStatus));
    setDrawerOpen(false);
  }

  const panelFilters = { ...filters, query: draftQuery };

  return (
    <div>
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Listings
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/70 md:text-lg">
            {description}
          </p>
        </div>
      </div>

      <div className="container-ep py-8 md:py-10">
        <div className="hidden rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)] md:block md:p-5">
          <PropertyFiltersPanel
            filters={panelFilters}
            showStatusFilter={showStatusFilter}
            onChange={updateFilter}
            onClear={clearAll}
          />
        </div>

        <div className="md:hidden">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => setDrawerOpen(true)}
          >
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Button>
        </div>

        {activeChips.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.label}`}
                type="button"
                onClick={() => patchFilters(chip.clear)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-gold"
              >
                {chip.label}
                <IconClose className="h-3.5 w-3.5 text-muted" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-gold hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {filtered.length === 0 ? (
              <>No matching properties</>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-navy">
                  {start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-navy">{filtered.length}</span>{" "}
                properties
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex rounded-md border border-border bg-white p-0.5">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded",
                  view === "grid" ? "bg-navy text-white" : "text-muted",
                )}
              >
                <IconGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded",
                  view === "list" ? "bg-navy text-white" : "text-muted",
                )}
              >
                <IconList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-semibold text-navy">
              No properties match
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted">
              Try adjusting your filters or search terms. Sample Pakistan
              listings span DHA, Bahria Town, Gulberg, Clifton, and F-7.
            </p>
            <Button
              type="button"
              variant="gold"
              className="mt-6"
              onClick={clearAll}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div
              className={cn(
                "mt-6",
                view === "grid"
                  ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-5",
              )}
            >
              {shown.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  view={view}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => patchFilters({ page: page - 1 })}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => patchFilters({ page: p })}
                      className={cn(
                        "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium",
                        p === page
                          ? "bg-navy text-white"
                          : "border border-border bg-white text-navy hover:border-gold",
                      )}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ),
                )}
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => patchFilters({ page: page + 1 })}
                >
                  Next
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>

      {drawerOpen ? (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Property filters"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/50"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-[var(--shadow)]">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <h2 className="font-display text-xl font-semibold text-navy">
                Filters
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <PropertyFiltersPanel
                filters={panelFilters}
                showStatusFilter={showStatusFilter}
                onChange={updateFilter}
                onClear={clearAll}
                compact
              />
            </div>
            <div className="border-t border-border p-4">
              <Button
                type="button"
                variant="gold"
                className="w-full"
                onClick={() => setDrawerOpen(false)}
              >
                Show {filtered.length} result{filtered.length === 1 ? "" : "s"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

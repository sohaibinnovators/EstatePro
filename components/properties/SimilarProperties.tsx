"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { getSimilarByRules } from "@/lib/recommendations";

export function SimilarProperties({
  property,
  limit = 3,
}: {
  property: Property;
  limit?: number;
}) {
  const { catalog, ready } = useCatalog();

  const similar = useMemo(() => {
    if (!ready) return [];
    return getSimilarByRules(catalog, property, limit);
  }, [catalog, ready, property, limit]);

  if (!ready) {
    return (
      <section className="border-t border-border bg-white py-14">
        <div className="container-ep">
          <p className="text-sm text-muted">Loading similar properties…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-border bg-white py-14">
      <div className="container-ep">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              You may also like
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy">
              Similar Properties
            </h2>
            <p className="mt-1 text-sm text-muted">
              Matched by city, area, type, and price range.
            </p>
          </div>
          <Link
            href={`/properties?city=${encodeURIComponent(property.city)}&type=${property.type}`}
            className="text-sm font-medium text-navy underline-offset-4 hover:underline"
          >
            View more
          </Link>
        </div>
        {similar.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <p className="font-medium text-navy">No close matches found</p>
            <p className="mt-1 text-sm text-muted">
              Try browsing more listings in {property.city}.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

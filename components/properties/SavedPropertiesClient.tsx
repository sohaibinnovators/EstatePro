"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { Button } from "@/components/ui/Button";
import type { Property } from "@/lib/types";
import { setFavoriteIds } from "@/lib/favorites";

export function SavedPropertiesClient() {
  const { ids, ready: favReady, remove, clear } = useFavorites();
  const { catalog, ready: catalogReady } = useCatalog();

  const saved = useMemo(() => {
    const map = new Map(catalog.map((p) => [p.id, p]));
    return ids
      .map((id) => map.get(id))
      .filter((p): p is Property => Boolean(p));
  }, [catalog, ids]);

  const validIds = useMemo(() => saved.map((p) => p.id), [saved]);
  const ready = favReady && catalogReady;
  const staleCount = ready ? ids.length - validIds.length : 0;

  useEffect(() => {
    if (!ready || staleCount === 0) return;
    setFavoriteIds(validIds);
  }, [ready, staleCount, validIds]);

  if (!ready) {
    return (
      <div className="container-ep py-16 text-center text-muted">
        Loading saved properties…
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="container-ep py-12 md:py-16">
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-navy">
            No saved properties yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Tap the heart on any listing to save it here. Favorites are stored
            in this browser only — no account required.
          </p>
          <Button href="/properties" variant="gold" className="mt-6">
            Browse Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-ep py-10 md:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          <span className="font-semibold text-navy">{saved.length}</span> saved
          propert{saved.length === 1 ? "y" : "ies"}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={clear}>
            Clear all
          </Button>
          <Button href="/properties" variant="secondary" size="sm">
            Browse more
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {saved.map((property) => (
          <div key={property.id}>
            <PropertyCard property={property} />
            <button
              type="button"
              onClick={() => remove(property.id)}
              className="mt-3 w-full rounded-md border border-border bg-white px-3 py-2 text-sm font-medium text-navy transition hover:border-gold"
            >
              Remove from saved
            </button>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Prefer browsing?{" "}
        <Link
          href="/buy"
          className="font-medium text-navy underline-offset-4 hover:underline"
        >
          Buy
        </Link>{" "}
        or{" "}
        <Link
          href="/rent"
          className="font-medium text-navy underline-offset-4 hover:underline"
        >
          Rent
        </Link>
      </p>
    </div>
  );
}

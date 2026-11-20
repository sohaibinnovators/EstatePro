"use client";

import { useMemo } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { useFavorites } from "@/components/favorites/FavoritesProvider";
import { getRecentViews } from "@/lib/recently-viewed";
import { getRecommendedProperties } from "@/lib/recommendations";
import { IconArrowRight } from "@/components/icons";
import { useEffect, useState } from "react";
import { RECENT_VIEWS_EVENT } from "@/lib/recently-viewed";

export function RecommendedProperties() {
  const { catalog, ready } = useCatalog();
  const { ids: favoriteIds, ready: favReady } = useFavorites();
  const [viewIds, setViewIds] = useState<string[]>([]);

  useEffect(() => {
    function refresh() {
      setViewIds(getRecentViews().map((v) => v.id));
    }
    refresh();
    window.addEventListener(RECENT_VIEWS_EVENT, refresh);
    window.addEventListener("estatepro:demo-reset", refresh);
    return () => {
      window.removeEventListener(RECENT_VIEWS_EVENT, refresh);
      window.removeEventListener("estatepro:demo-reset", refresh);
    };
  }, []);

  const recommended = useMemo(() => {
    if (!ready || !favReady) return [];
    const seeds = [...viewIds, ...favoriteIds];
    return getRecommendedProperties(catalog, seeds, [], 6);
  }, [catalog, ready, favReady, viewIds, favoriteIds]);

  if (!ready || !favReady) {
    return (
      <section className="py-16 md:py-24">
        <div className="container-ep">
          <p className="text-sm text-muted">Loading recommendations…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-ep">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="For you"
            title="Recommended based on your activity"
            description="Matched from recently viewed and saved listings by city, area, type, and price band."
          />
          <Button
            href="/properties"
            variant="secondary"
            className="shrink-0 self-start"
          >
            Browse all
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {recommended.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
            <p className="font-medium text-navy">No recommendations yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              View or save a few properties to unlock personalized matches from
              the catalog.
            </p>
            <Button href="/properties" variant="gold" className="mt-5">
              Explore listings
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

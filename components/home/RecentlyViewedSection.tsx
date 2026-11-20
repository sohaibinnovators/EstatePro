"use client";

import { useEffect, useMemo, useState } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import {
  RECENT_VIEWS_EVENT,
  getRecentViews,
  type RecentView,
} from "@/lib/recently-viewed";
import { IconArrowRight } from "@/components/icons";
import { relativeTime } from "@/lib/storage";

export function RecentlyViewedSection() {
  const { catalog, ready } = useCatalog();
  const [views, setViews] = useState<RecentView[]>([]);

  useEffect(() => {
    function refresh() {
      setViews(getRecentViews());
    }
    refresh();
    window.addEventListener(RECENT_VIEWS_EVENT, refresh);
    window.addEventListener("estatepro:demo-reset", refresh);
    return () => {
      window.removeEventListener(RECENT_VIEWS_EVENT, refresh);
      window.removeEventListener("estatepro:demo-reset", refresh);
    };
  }, []);

  const properties = useMemo(() => {
    if (!ready) return [];
    return views
      .map((v) => {
        const property = catalog.find((p) => p.id === v.id);
        return property ? { property, viewedAt: v.viewedAt } : null;
      })
      .filter(Boolean)
      .slice(0, 4) as { property: (typeof catalog)[number]; viewedAt: string }[];
  }, [views, catalog, ready]);

  if (!ready) return null;
  if (properties.length === 0) return null;

  return (
    <section className="border-t border-border bg-white py-16 md:py-24">
      <div className="container-ep">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Continue browsing"
            title="Recently viewed"
            description="Pick up where you left off — history stays on this device."
          />
          <Button
            href="/dashboard"
            variant="secondary"
            className="shrink-0 self-start"
          >
            Dashboard
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {properties.map(({ property, viewedAt }) => (
            <div key={property.id}>
              <PropertyCard property={property} />
              <p className="mt-2 text-xs text-muted">
                Viewed {relativeTime(viewedAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { IconArrowRight } from "@/components/icons";

export function RecentProperties() {
  const { catalog, ready } = useCatalog();
  const recent = useMemo(
    () =>
      [...catalog]
        .sort(
          (a, b) =>
            new Date(b.listedDate).getTime() -
            new Date(a.listedDate).getTime(),
        )
        .slice(0, 4),
    [catalog],
  );

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-ep">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Recently added"
            title="Fresh listings just on the market"
            description="Sorted by actual listing dates from the live catalog in this browser."
          />
          <Button
            href="/properties?sort=newest"
            variant="secondary"
            className="shrink-0 self-start"
          >
            See Newest
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {!ready ? (
          <p className="mt-10 text-sm text-muted">Loading recent listings…</p>
        ) : recent.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
            <p className="font-medium text-navy">No recent listings</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {recent.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

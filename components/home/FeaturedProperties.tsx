"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { IconArrowRight } from "@/components/icons";

export function FeaturedProperties() {
  const { catalog, ready } = useCatalog();
  const featured = useMemo(
    () => catalog.filter((p) => p.featured).slice(0, 6),
    [catalog],
  );

  return (
    <section className="py-16 md:py-24">
      <div className="container-ep">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Featured"
            title="Handpicked properties worth a closer look"
            description="A selection of standout homes and rentals across our most requested markets."
          />
          <Button
            href="/properties"
            variant="secondary"
            className="shrink-0 self-start md:self-auto"
          >
            View All
            <IconArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {!ready ? (
          <p className="mt-10 text-sm text-muted">Loading featured listings…</p>
        ) : featured.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
            <p className="font-medium text-navy">No featured listings right now</p>
            <p className="mt-2 text-sm text-muted">
              Browse the full catalog or check back after new listings go live.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
        <p className="mt-8 text-center text-sm text-muted md:hidden">
          <Link
            href="/properties"
            className="font-medium text-navy underline-offset-4 hover:underline"
          >
            Browse all properties
          </Link>
        </p>
      </div>
    </section>
  );
}

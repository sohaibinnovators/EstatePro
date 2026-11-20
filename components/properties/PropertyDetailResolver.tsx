"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Property } from "@/lib/types";
import { getUserPropertyBySlug } from "@/lib/user-properties";
import { Button } from "@/components/ui/Button";
import { PropertyDetailView } from "./PropertyDetailView";

/** Resolves user-submitted listings from localStorage when not in the demo catalog. */
export function PropertyDetailResolver({ slug }: { slug: string }) {
  const [property, setProperty] = useState<Property | null | undefined>(
    undefined,
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      setProperty(getUserPropertyBySlug(slug) ?? null);
    }, 0);
    return () => window.clearTimeout(id);
  }, [slug]);

  if (property === undefined) {
    return (
      <div className="container-ep py-24 text-center text-muted">
        Loading property…
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container-ep flex flex-col items-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-navy">
          Property not found
        </h1>
        <p className="mt-3 max-w-md text-muted">
          This listing is not in the sample catalog or your local demo
          submissions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="gold">
            Back Home
          </Button>
          <Button href="/properties" variant="secondary">
            Browse Properties
          </Button>
          <Link
            href="/dashboard/properties"
            className="text-sm font-medium text-navy underline-offset-4 hover:underline"
          >
            My Properties
          </Link>
        </div>
      </div>
    );
  }

  return <PropertyDetailView property={property} />;
}

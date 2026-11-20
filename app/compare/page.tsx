"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCompare } from "@/components/compare/CompareProvider";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { Button } from "@/components/ui/Button";
import { PropertyImage } from "@/components/properties/PropertyImage";
import {
  formatArea,
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/utils";
import type { Property } from "@/lib/types";

export default function ComparePage() {
  const { ids, ready, remove, clear, max } = useCompare();
  const { catalog, ready: catalogReady } = useCatalog();

  const properties = useMemo(() => {
    return ids
      .map((id) => catalog.find((p) => p.id === id) || null)
      .filter((p): p is Property => Boolean(p));
  }, [ids, catalog]);

  const missing = ids.length - properties.length;

  if (!ready || !catalogReady) {
    return (
      <div className="container-ep py-16">
        <p className="text-muted">Loading comparison…</p>
      </div>
    );
  }

  return (
    <div className="container-ep py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Compare
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
            Property comparison
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Compare up to {max} listings side by side. Selection is saved in
            this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href="/properties" variant="secondary">
            Browse properties
          </Button>
          {ids.length > 0 ? (
            <Button type="button" variant="ghost" onClick={clear}>
              Clear all
            </Button>
          ) : null}
        </div>
      </div>

      {missing > 0 ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {missing} selected listing
          {missing === 1 ? " is" : "s are"} no longer available and{" "}
          {missing === 1 ? "was" : "were"} skipped.
        </p>
      ) : null}

      {properties.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-white px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-navy">
            No properties to compare
          </h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Use the Compare action on property cards or detail pages to add up
            to {max} listings.
          </p>
          <Button href="/properties" variant="gold" className="mt-6">
            Find properties
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4 md:hidden">
            {properties.map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-border bg-white p-4 shadow-[var(--shadow-sm)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <PropertyImage
                    src={p.images[0]}
                    alt={p.title}
                    sizes="100vw"
                  />
                </div>
                <Link
                  href={`/properties/${p.slug}`}
                  className="mt-3 block font-display text-xl font-semibold text-navy hover:underline"
                >
                  {p.title}
                </Link>
                <dl className="mt-3 space-y-2 text-sm">
                  <MobileRow
                    label="Price"
                    value={formatPrice(p.price, p.status)}
                  />
                  <MobileRow label="Location" value={p.location} />
                  <MobileRow
                    label="Type"
                    value={propertyTypeLabel(p.type)}
                  />
                  <MobileRow
                    label="Listing"
                    value={statusLabel(p.status)}
                  />
                  <MobileRow label="Beds" value={String(p.bedrooms)} />
                  <MobileRow label="Baths" value={String(p.bathrooms)} />
                  <MobileRow
                    label="Area"
                    value={formatArea(p.area, p.areaUnit)}
                  />
                  <MobileRow
                    label="Amenities"
                    value={
                      p.amenities.length ? p.amenities.join(", ") : "—"
                    }
                  />
                </dl>
                <button
                  type="button"
                  className="mt-3 text-sm font-medium text-muted underline-offset-2 hover:underline"
                  aria-label={`Remove ${p.title} from comparison`}
                  onClick={() => remove(p.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>

          <div className="mt-8 hidden overflow-x-auto md:block">
            <p className="mb-2 text-xs text-muted">
              Scroll horizontally on smaller desktop widths if needed.
            </p>
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 w-36 bg-bg px-3 py-3 text-left font-semibold text-navy">
                    Detail
                  </th>
                  {properties.map((p) => (
                    <th
                      key={p.id}
                      className="min-w-[200px] border-l border-border px-3 py-3 text-left align-top"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <PropertyImage
                          src={p.images[0]}
                          alt={p.title}
                          sizes="240px"
                        />
                      </div>
                      <Link
                        href={`/properties/${p.slug}`}
                        className="mt-3 block font-display text-lg font-semibold text-navy hover:underline"
                      >
                        {p.title}
                      </Link>
                      <button
                        type="button"
                        className="mt-2 text-xs font-medium text-muted underline-offset-2 hover:underline"
                        aria-label={`Remove ${p.title} from comparison`}
                        onClick={() => remove(p.id)}
                      >
                        Remove
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow
                  label="Price"
                  values={properties.map((p) =>
                    formatPrice(p.price, p.status),
                  )}
                  highlightDiff
                />
                <CompareRow
                  label="Location"
                  values={properties.map((p) => p.location)}
                  highlightDiff
                />
                <CompareRow
                  label="Property type"
                  values={properties.map((p) => propertyTypeLabel(p.type))}
                  highlightDiff
                />
                <CompareRow
                  label="Listing type"
                  values={properties.map((p) => statusLabel(p.status))}
                  highlightDiff
                />
                <CompareRow
                  label="Bedrooms"
                  values={properties.map((p) => String(p.bedrooms))}
                  highlightDiff
                />
                <CompareRow
                  label="Bathrooms"
                  values={properties.map((p) => String(p.bathrooms))}
                  highlightDiff
                />
                <CompareRow
                  label="Area"
                  values={properties.map((p) =>
                    formatArea(p.area, p.areaUnit),
                  )}
                  highlightDiff
                />
                <CompareRow
                  label="Amenities"
                  values={properties.map((p) =>
                    p.amenities.length ? p.amenities.join(", ") : "—",
                  )}
                />
                <CompareRow
                  label="Features"
                  values={properties.map((p) =>
                    p.features.length ? p.features.join(", ") : "—",
                  )}
                />
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function MobileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border py-1.5">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}

function CompareRow({
  label,
  values,
  highlightDiff,
}: {
  label: string;
  values: string[];
  highlightDiff?: boolean;
}) {
  const differ =
    highlightDiff && values.length > 1 && new Set(values).size > 1;

  return (
    <tr className="border-t border-border">
      <th className="sticky left-0 z-10 bg-bg px-3 py-3 text-left font-medium text-muted">
        {label}
      </th>
      {values.map((value, i) => (
        <td
          key={`${label}-${i}`}
          className={`border-l border-border px-3 py-3 align-top text-navy ${
            differ ? "bg-gold/10 font-medium" : ""
          }`}
        >
          {value}
        </td>
      ))}
    </tr>
  );
}

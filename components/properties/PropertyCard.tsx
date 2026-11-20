import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { FavoriteButton } from "./FavoriteButton";
import { CompareButton } from "./CompareButton";
import { PropertyImage } from "./PropertyImage";
import { IconArea, IconBath, IconBed, IconMapPin } from "@/components/icons";
import {
  cn,
  formatArea,
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/utils";

export function PropertyCard({
  property,
  view = "grid",
}: {
  property: Property;
  view?: "grid" | "list";
}) {
  const href = `/properties/${property.slug}`;
  const showBedsBaths = property.type !== "plot" && property.type !== "commercial"
    ? true
    : property.bedrooms > 0 || property.bathrooms > 0;

  if (view === "list") {
    return (
      <article className="group overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow)]">
        <div className="flex flex-col sm:flex-row">
          <Link
            href={href}
            className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[220px] sm:w-72 md:w-80"
          >
            <PropertyImage
              src={property.images[0]}
              alt={property.title}
              className="transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {property.featured ? <Badge>Featured</Badge> : null}
              <Badge variant="light">{statusLabel(property.status)}</Badge>
            </div>
          </Link>
          <div className="relative flex flex-1 flex-col justify-between p-5 md:p-6">
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
              <CompareButton propertyId={property.id} size="sm" />
              <FavoriteButton propertyId={property.id} size="sm" />
            </div>
            <Link href={href} className="pr-12">
              <p className="text-xl font-semibold text-navy md:text-2xl">
                {formatPrice(property.price, property.status)}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-navy group-hover:text-navy-soft">
                {property.title}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                <IconMapPin className="h-4 w-4 shrink-0" />
                {property.location}
              </p>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                {property.description}
              </p>
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted">
              {showBedsBaths ? (
                <>
                  <Spec
                    icon={<IconBed className="h-4 w-4" />}
                    label={`${property.bedrooms} Beds`}
                  />
                  <Spec
                    icon={<IconBath className="h-4 w-4" />}
                    label={`${property.bathrooms} Baths`}
                  />
                </>
              ) : null}
              <Spec
                icon={<IconArea className="h-4 w-4" />}
                label={formatArea(property.area, property.areaUnit)}
              />
              <span className="ml-auto text-xs font-semibold uppercase tracking-wide text-gold">
                {propertyTypeLabel(property.type)}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow)]",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={href} className="absolute inset-0 block">
          <PropertyImage
            src={property.images[0]}
            alt={property.title}
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          {property.featured ? <Badge>Featured</Badge> : null}
          <Badge variant="light">{statusLabel(property.status)}</Badge>
        </div>
        <div className="absolute right-3 top-3 z-10 flex items-center gap-2">
          <CompareButton propertyId={property.id} size="sm" />
          <FavoriteButton propertyId={property.id} size="sm" />
        </div>
      </div>
      <Link href={href} className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-lg font-semibold text-navy">
            {formatPrice(property.price, property.status)}
          </p>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-gold">
            {propertyTypeLabel(property.type)}
          </span>
        </div>
        <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-navy">
          {property.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <IconMapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>
        <div className="mt-auto flex flex-wrap gap-4 border-t border-border pt-4 text-sm text-muted">
          {showBedsBaths ? (
            <>
              <Spec
                icon={<IconBed className="h-4 w-4" />}
                label={`${property.bedrooms} Beds`}
              />
              <Spec
                icon={<IconBath className="h-4 w-4" />}
                label={`${property.bathrooms} Baths`}
              />
            </>
          ) : null}
          <Spec
            icon={<IconArea className="h-4 w-4" />}
            label={formatArea(property.area, property.areaUnit)}
          />
        </div>
      </Link>
    </article>
  );
}

function Spec({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
  );
}

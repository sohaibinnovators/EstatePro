import Image from "next/image";
import type { Property } from "@/lib/types";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { ContactAgentForm } from "@/components/properties/ContactAgentForm";
import { SimilarProperties } from "@/components/properties/SimilarProperties";
import { FavoriteButton } from "@/components/properties/FavoriteButton";
import { CompareButton } from "@/components/properties/CompareButton";
import { SharePropertyButton } from "@/components/properties/SharePropertyButton";
import { TrackPropertyView } from "@/components/properties/TrackPropertyView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  IconArea,
  IconBath,
  IconBed,
  IconCheck,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/icons";
import { getPropertyAgent } from "@/lib/data/properties";
import {
  formatArea,
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "@/lib/utils";

export function PropertyDetailView({ property }: { property: Property }) {
  const agent = getPropertyAgent(property);
  const propertyRef = `EP-${property.id.toUpperCase()}`;
  const listHref = property.status === "sale" ? "/buy" : "/rent";
  const isUser = property.id.startsWith("user_");

  return (
    <div>
      <TrackPropertyView propertyId={property.id} />
      <div className="border-b border-border bg-white">
        <div className="container-ep py-8 md:py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Properties", href: "/properties" },
              {
                label: property.status === "sale" ? "Buy" : "Rent",
                href: listHref,
              },
              { label: property.title },
            ]}
          />

          {isUser ? (
            <p className="mb-4 rounded-md border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-navy">
              Demo user listing stored in this browser — not a live published
              submission.
            </p>
          ) : null}

          <PropertyGallery images={property.images} title={property.title} />

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {property.featured ? <Badge>Featured</Badge> : null}
                <Badge variant="navy">{statusLabel(property.status)}</Badge>
                <span className="text-sm font-medium text-gold">
                  {propertyTypeLabel(property.type)}
                </span>
                <span className="text-xs text-muted">Ref {propertyRef}</span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-semibold text-navy md:text-5xl">
                {property.title}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-muted">
                <IconMapPin className="h-4 w-4 shrink-0" />
                {property.address}, {property.areaName}, {property.city}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
              <p className="text-2xl font-semibold text-navy md:text-3xl">
                {formatPrice(property.price, property.status)}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <FavoriteButton propertyId={property.id} />
                <CompareButton propertyId={property.id} size="md" label />
                <SharePropertyButton
                  slug={property.slug}
                  title={property.title}
                />
                {agent ? (
                  <Button href="#inquire" variant="gold" size="sm">
                    Contact Agent
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-ep grid gap-10 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
        <div className="space-y-10">
          <section className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-2xl font-semibold text-navy">
              Property Specifications
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Spec
                icon={<IconBed className="h-5 w-5" />}
                label="Bedrooms"
                value={String(property.bedrooms)}
              />
              <Spec
                icon={<IconBath className="h-5 w-5" />}
                label="Bathrooms"
                value={String(property.bathrooms)}
              />
              <Spec
                icon={<IconArea className="h-5 w-5" />}
                label="Area"
                value={formatArea(property.area, property.areaUnit)}
              />
              <Spec
                icon={<IconCheck className="h-5 w-5" />}
                label="Parking"
                value={String(property.parking)}
              />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Description
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {property.description}
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Features & Amenities
            </h2>
            <div className="mt-5 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Features
                </h3>
                <ul className="mt-3 space-y-2">
                  {property.features.length === 0 ? (
                    <li className="text-sm text-muted">No features listed.</li>
                  ) : (
                    property.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {f}
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                  Amenities
                </h3>
                <ul className="mt-3 space-y-2">
                  {property.amenities.length === 0 ? (
                    <li className="text-sm text-muted">No amenities listed.</li>
                  ) : (
                    property.amenities.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {a}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-white p-6 shadow-[var(--shadow-sm)]">
            <h2 className="font-display text-2xl font-semibold text-navy">
              Property Information
            </h2>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <Info label="Reference" value={propertyRef} />
              <Info label="Status" value={statusLabel(property.status)} />
              <Info label="Type" value={propertyTypeLabel(property.type)} />
              <Info
                label="Year Built"
                value={property.yearBuilt ? String(property.yearBuilt) : "N/A"}
              />
              <Info label="Listed" value={property.listedDate} />
              <Info label="City" value={property.city} />
              <Info label="Area" value={property.areaName} />
              <Info
                label="Size"
                value={formatArea(property.area, property.areaUnit)}
              />
            </dl>
          </section>

          <section className="overflow-hidden rounded-xl border border-border bg-white shadow-[var(--shadow-sm)]">
            <div className="border-b border-border px-6 py-5">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Location
              </h2>
              <p className="mt-1 text-sm text-muted">
                {property.address}, {property.areaName}, {property.city}
              </p>
            </div>
            <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-navy-soft to-navy">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative rounded-lg border border-white/15 bg-white/10 px-6 py-5 text-center backdrop-blur-sm">
                <IconMapPin className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-2 font-medium text-white">{property.location}</p>
                {property.coordinates.lat !== 0 ||
                property.coordinates.lng !== 0 ? (
                  <p className="mt-1 text-xs text-white/60">
                    Map preview · {property.coordinates.lat.toFixed(4)},{" "}
                    {property.coordinates.lng.toFixed(4)}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-white/60">
                    Approximate area map preview (demo listing)
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {agent ? (
            <div
              id="inquire"
              className="scroll-mt-28 rounded-xl border border-border bg-white p-5 shadow-[var(--shadow-sm)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Listed by
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-muted">{agent.position}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted">
                <p className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4 text-navy" />
                  {agent.phone}
                </p>
                <p className="flex items-center gap-2">
                  <IconMail className="h-4 w-4 text-navy" />
                  {agent.email}
                </p>
              </div>
              <Button
                href={`/agents/${agent.slug}`}
                variant="secondary"
                className="mt-4 w-full"
              >
                View Agent Profile
              </Button>
              <div className="mt-6 border-t border-border pt-5">
                <h4 className="mb-3 text-sm font-semibold text-navy">
                  Property Inquiry
                </h4>
                <ContactAgentForm
                  agentId={agent.id}
                  agentName={agent.name}
                  propertyId={property.id}
                  propertySlug={property.slug}
                  propertyTitle={property.title}
                  propertyRef={propertyRef}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-white p-5 text-sm text-muted shadow-[var(--shadow-sm)]">
              No agent assigned to this demo listing.
            </div>
          )}
        </aside>
      </div>

      <SimilarProperties property={property} />
    </div>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-bg px-4 py-3">
      <div className="text-navy">{icon}</div>
      <p className="mt-2 text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 font-semibold text-navy">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2 text-sm">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-navy">{value}</dd>
    </div>
  );
}

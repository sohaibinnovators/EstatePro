import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { AgentContactForm } from "@/components/agents/AgentContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { IconMail, IconMapPin, IconPhone } from "@/components/icons";
import { agents, getAgentBySlug } from "@/lib/data/agents";
import { getPropertiesByAgent } from "@/lib/data/properties";

export async function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: agent.name,
    description: agent.bio.slice(0, 155),
    alternates: { canonical: `/agents/${agent.slug}` },
    openGraph: {
      title: agent.name,
      description: agent.bio.slice(0, 155),
      images: [{ url: agent.image, alt: agent.name }],
    },
  };
}

async function AgentDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const listings = getPropertiesByAgent(agent.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: agent.name,
    description: agent.bio,
    image: agent.image,
    email: agent.email,
    telephone: agent.phone,
    areaServed: agent.serviceAreas,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="border-b border-border bg-navy">
        <div className="container-ep py-8 md:py-10">
          <Breadcrumbs
            light
            items={[
              { label: "Home", href: "/" },
              { label: "Agents", href: "/agents" },
              { label: agent.name },
            ]}
          />
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="112px"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {agent.position}
              </p>
              <h1 className="mt-2 font-display text-4xl font-semibold text-white md:text-5xl">
                {agent.name}
              </h1>
              <p className="mt-2 text-white/70">
                {agent.experience} experience
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-white/70">
                <IconMapPin className="h-4 w-4 shrink-0" />
                {agent.serviceAreas.join(", ")}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
                <a
                  href={`tel:${agent.phone}`}
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <IconPhone className="h-4 w-4" />
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <IconMail className="h-4 w-4" />
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-ep grid gap-10 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              About
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {agent.bio}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Specialties
                </p>
                <p className="mt-2 text-sm text-navy">
                  {agent.specialties.join(" · ")}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Languages
                </p>
                <p className="mt-2 text-sm text-navy">
                  {agent.languages.join(" · ")}
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Listings ({listings.length})
              </h2>
              <Button href="/properties" variant="ghost" size="sm">
                Browse all
              </Button>
            </div>
            {listings.length === 0 ? (
              <p className="mt-6 text-sm text-muted">
                No demonstration listings assigned to this agent.
              </p>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {listings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AgentContactForm
            agentId={agent.id}
            agentName={agent.name}
            properties={listings}
          />
        </aside>
      </div>
    </div>
  );
}

export default function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading agent…
        </div>
      }
    >
      <AgentDetail params={params} />
    </Suspense>
  );
}

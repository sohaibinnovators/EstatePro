import { Suspense } from "react";
import type { Metadata } from "next";
import { PropertyDetailView } from "@/components/properties/PropertyDetailView";
import { PropertyDetailResolver } from "@/components/properties/PropertyDetailResolver";
import {
  getPropertyBySlug,
  properties,
} from "@/lib/data/properties";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) {
    const humanized = slug
      .split("-")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: humanized || "Property",
      description:
        "EstatePro property details. User-submitted demo listings load in the browser.",
      robots: { index: false, follow: true },
    };
  }

  const description = `${property.title} in ${property.location}. ${formatPrice(property.price, property.status)}. ${property.description.slice(0, 120)}`;

  return {
    title: property.title,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/properties/${property.slug}`,
    },
    openGraph: {
      title: property.title,
      description: description.slice(0, 160),
      type: "article",
      images: property.images[0]
        ? [{ url: property.images[0], alt: property.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: description.slice(0, 160),
      images: property.images[0] ? [property.images[0]] : undefined,
    },
  };
}

async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (property) {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: property.title,
      description: property.description,
      url: `/properties/${property.slug}`,
      image: property.images,
      datePosted: property.listedDate,
      address: {
        "@type": "PostalAddress",
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: property.areaName,
        addressCountry: "PK",
      },
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "PKR",
        availability: "https://schema.org/InStock",
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PropertyDetailView property={property} />
      </>
    );
  }

  return <PropertyDetailResolver slug={slug} />;
}

export default function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="container-ep py-24 text-center text-muted">
          Loading property…
        </div>
      }
    >
      <PropertyDetail params={params} />
    </Suspense>
  );
}

import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredLocations } from "@/lib/data/properties";

export function FeaturedLocations() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-ep">
        <SectionHeading
          eyebrow="Featured locations"
          title="Pakistan markets EstatePro covers"
          description="Browse curated demonstration listings across DHA, Bahria Town, Gulberg, Clifton, and F-7."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLocations.map((loc) => (
            <Link
              key={loc.area}
              href={`/properties?city=${encodeURIComponent(loc.city)}&area=${encodeURIComponent(loc.area)}`}
              className="group relative min-h-[220px] overflow-hidden rounded-xl md:min-h-[240px]"
            >
              <Image
                src={loc.image}
                alt={loc.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-navy/45 transition-colors group-hover:bg-navy/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                  {loc.label}
                </h3>
                <p className="mt-1 text-sm tracking-wide text-white/80">
                  {loc.city} · {loc.count} listing{loc.count === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

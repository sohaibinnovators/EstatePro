import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { propertyTypes, properties } from "@/lib/data/properties";

export function PropertyTypes() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-ep">
        <SectionHeading
          eyebrow="Browse by type"
          title="Explore homes that match your lifestyle"
          description="Houses, apartments, plots, and commercial spaces across Lahore, Karachi, and Islamabad."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {propertyTypes.map((item) => {
            const count = properties.filter((p) => p.type === item.type).length;
            return (
              <Link
                key={item.type}
                href={`/properties?type=${item.type}`}
                className="group relative aspect-[5/3] overflow-hidden rounded-xl lg:aspect-[4/5]"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm text-white/75">
                    {count} listing{count === 1 ? "" : "s"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

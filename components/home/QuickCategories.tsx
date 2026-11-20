import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  { label: "Houses for sale", href: "/buy?type=house" },
  { label: "Apartments for rent", href: "/rent?type=apartment" },
  { label: "Plots in Lahore", href: "/buy?type=plot&city=Lahore" },
  { label: "Karachi rentals", href: "/rent?city=Karachi" },
  { label: "Islamabad homes", href: "/buy?city=Islamabad&type=house" },
  { label: "Commercial spaces", href: "/properties?type=commercial" },
];

export function QuickCategories() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-ep">
        <SectionHeading
          align="left"
          eyebrow="Quick browse"
          title="Jump into popular categories"
          description="Shortcut filters into the Pakistan listing catalog."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-md border border-border bg-white px-4 py-2.5 text-sm font-medium text-navy shadow-[var(--shadow-sm)] transition hover:border-gold hover:text-navy-soft"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

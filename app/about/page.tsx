import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EstatePro — a premium real estate platform helping people find homes and build their future.",
};

const values = [
  {
    title: "Clarity",
    body: "Listings, filters, and agent guidance designed to reduce noise and highlight what matters.",
  },
  {
    title: "Craft",
    body: "Premium presentation for every property — photography, details, and a refined browsing experience.",
  },
  {
    title: "Trust",
    body: "Local specialists who understand markets, neighborhoods, and the realities of buying or renting.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="relative isolate overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&h=900&fit=crop"
          alt="Modern architectural home"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="container-ep relative py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            About EstatePro
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold text-white md:text-6xl">
            Find Your Place. Build Your Future.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            EstatePro is a modern real estate platform built for people who
            expect more than a generic listing board — clarity, craft, and
            trusted local expertise.
          </p>
        </div>
      </div>

      <section className="container-ep py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="A professional home for every next chapter"
              description="Whether you are buying your first residence, relocating for work, or listing a landmark property, EstatePro brings premium inventory and thoughtful guidance into one polished experience."
            />
            <p className="mt-5 text-muted leading-relaxed">
              Phase 1 focuses on a complete, production-ready interface —
              search, discovery, agent profiles, and listing journeys — so the
              brand feels established from day one.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop"
              alt="Bright living space with large windows"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-ep">
          <SectionHeading
            eyebrow="What we stand for"
            title="Principles that shape every experience"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-border bg-bg p-6"
              >
                <h3 className="font-display text-2xl font-semibold text-navy">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-ep py-16 text-center md:py-20">
        <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
          Ready to explore?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Browse curated listings or connect with an EstatePro advisor today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/properties" variant="gold" size="lg">
            Browse Properties
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
